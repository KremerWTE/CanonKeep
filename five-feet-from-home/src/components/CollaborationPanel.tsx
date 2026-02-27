'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

interface User {
  id: string;
  email: string;
  name: string | null;
}

interface Comment {
  id: string;
  content: string;
  isResolved: boolean;
  createdAt: string;
  user: User;
  isOwn: boolean;
  replies: {
    id: string;
    content: string;
    createdAt: string;
    user: User;
    isOwn: boolean;
  }[];
}

interface PresenceUser {
  userId: string;
  email: string;
  name: string | null;
  action: string;
  lastSeen: string;
}

interface CollaborationPanelProps {
  entityType: string;
  entityId: string;
  entityName: string;
  onEditLockChange?: (locked: boolean, byOther: boolean) => void;
}

export default function CollaborationPanel({
  entityType,
  entityId,
  entityName,
  onEditLockChange
}: CollaborationPanelProps) {
  const { data: session } = useSession();
  const [presence, setPresence] = useState<PresenceUser[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [lockOwner, setLockOwner] = useState<User | null>(null);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(true);
  const [loading, setLoading] = useState(false);

  // Fetch presence
  const fetchPresence = useCallback(async () => {
    try {
      const res = await fetch(`/api/collaboration/presence?entityType=${entityType}&entityId=${entityId}`);
      const data = await res.json();
      setPresence(data.users || []);
    } catch {
      // Silently fail
    }
  }, [entityType, entityId]);

  // Send presence heartbeat
  const sendHeartbeat = useCallback(async () => {
    try {
      await fetch('/api/collaboration/presence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityType, entityId, entityName, action: 'viewing' })
      });
    } catch {
      // Silently fail
    }
  }, [entityType, entityId, entityName]);

  // Check lock status
  const checkLock = useCallback(async () => {
    try {
      const res = await fetch(`/api/collaboration/lock?entityType=${entityType}&entityId=${entityId}`);
      const data = await res.json();
      setIsLocked(data.locked);
      setLockOwner(data.locked && !data.isOwnLock ? data.lockedBy : null);
      onEditLockChange?.(data.locked, data.locked && !data.isOwnLock);
    } catch {
      // Silently fail
    }
  }, [entityType, entityId, onEditLockChange]);

  // Fetch comments
  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/collaboration/comments?entityType=${entityType}&entityId=${entityId}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch {
      // Silently fail
    }
  }, [entityType, entityId]);

  // Initial load and intervals
  useEffect(() => {
    if (!session?.user) return;

    fetchPresence();
    fetchComments();
    checkLock();
    sendHeartbeat();

    // Heartbeat every 30 seconds
    const heartbeatInterval = setInterval(sendHeartbeat, 30000);
    // Refresh presence every 15 seconds
    const presenceInterval = setInterval(fetchPresence, 15000);
    // Check lock every 30 seconds
    const lockInterval = setInterval(checkLock, 30000);

    return () => {
      clearInterval(heartbeatInterval);
      clearInterval(presenceInterval);
      clearInterval(lockInterval);
      // Clear presence on unmount
      fetch(`/api/collaboration/presence?entityType=${entityType}&entityId=${entityId}`, {
        method: 'DELETE'
      }).catch(() => {});
    };
  }, [session, entityType, entityId, fetchPresence, fetchComments, checkLock, sendHeartbeat]);

  // Add comment
  const addComment = async () => {
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/collaboration/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entityType,
          entityId,
          content: newComment,
          parentId: replyTo
        })
      });

      if (res.ok) {
        setNewComment('');
        setReplyTo(null);
        fetchComments();
      }
    } catch {
      // Silently fail
    }
    setLoading(false);
  };

  // Resolve comment
  const resolveComment = async (commentId: string) => {
    try {
      await fetch('/api/collaboration/comments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: commentId, isResolved: true })
      });
      fetchComments();
    } catch {
      // Silently fail
    }
  };

  // Delete comment
  const deleteComment = async (commentId: string) => {
    if (!confirm('Delete this comment?')) return;

    try {
      await fetch(`/api/collaboration/comments?id=${commentId}`, { method: 'DELETE' });
      fetchComments();
    } catch {
      // Silently fail
    }
  };

  if (!session?.user) return null;

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-700">Collaboration</h3>
        {isLocked && lockOwner && (
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
            Locked by {lockOwner.name || lockOwner.email}
          </span>
        )}
      </div>

      {/* Active Users */}
      {presence.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Also viewing:</span>
          <div className="flex -space-x-2">
            {presence.slice(0, 5).map(user => (
              <div
                key={user.userId}
                className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center border-2 border-white"
                title={user.name || user.email}
              >
                {(user.name || user.email)[0].toUpperCase()}
              </div>
            ))}
            {presence.length > 5 && (
              <div className="w-6 h-6 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center border-2 border-white">
                +{presence.length - 5}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
        >
          <span>{showComments ? '▼' : '▶'}</span>
          <span>Comments ({comments.length})</span>
        </button>

        {showComments && (
          <div className="mt-3 space-y-3">
            {/* Comment List */}
            {comments.map(comment => (
              <div
                key={comment.id}
                className={`p-3 rounded-lg ${comment.isResolved ? 'bg-gray-50 opacity-60' : 'bg-blue-50'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-medium text-gray-700">
                    {comment.user.name || comment.user.email}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{comment.content}</p>

                {/* Actions */}
                <div className="flex gap-2 text-xs">
                  {!comment.isResolved && (
                    <>
                      <button
                        onClick={() => setReplyTo(comment.id)}
                        className="text-blue-600 hover:underline"
                      >
                        Reply
                      </button>
                      <button
                        onClick={() => resolveComment(comment.id)}
                        className="text-green-600 hover:underline"
                      >
                        Resolve
                      </button>
                    </>
                  )}
                  {comment.isOwn && (
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </div>

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-2 pl-3 border-l-2 border-blue-200 space-y-2">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="text-sm">
                        <span className="font-medium text-gray-700">
                          {reply.user.name || reply.user.email}:
                        </span>{' '}
                        <span className="text-gray-600">{reply.content}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {comments.length === 0 && (
              <p className="text-sm text-gray-400 italic">No comments yet</p>
            )}

            {/* New Comment Form */}
            <div className="pt-2">
              {replyTo && (
                <div className="text-xs text-gray-500 mb-1 flex justify-between">
                  <span>Replying to comment...</span>
                  <button onClick={() => setReplyTo(null)} className="text-red-500">Cancel</button>
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addComment()}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-1.5 text-sm border rounded focus:ring-1 focus:ring-blue-200"
                />
                <button
                  onClick={addComment}
                  disabled={loading || !newComment.trim()}
                  className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
