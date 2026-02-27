'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

interface Node {
  id: string;
  name: string;
  archetype: string | null;
  group: string;
  connections: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

interface Link {
  source: string;
  target: string;
  type: string;
  description: string | null;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
  stats: {
    totalNodes: number;
    totalLinks: number;
    relationshipTypes: string[];
  };
}

const COLORS: Record<string, string> = {
  'BSS': '#3b82f6',
  'Wives Circle': '#ec4899',
  'Other': '#6b7280'
};

const LINK_COLORS: Record<string, string> = {
  'spouse': '#ef4444',
  'parent': '#22c55e',
  'sibling': '#f59e0b',
  'sister figure': '#ec4899',
  'brother figure': '#8b5cf6',
  'godparent': '#06b6d4',
  'mentor': '#6366f1',
  'protector': '#14b8a6',
  'colleague': '#64748b',
  'friend': '#a855f7',
  'romantic partner': '#f43f5e'
};

export default function RelationshipsPage() {
  const [data, setData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    fetch('/api/relationships/graph')
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!data || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize positions
    const nodes = data.nodes.map(n => ({
      ...n,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: 0,
      vy: 0
    }));

    const nodeMap = new Map(nodes.map(n => [n.id, n]));

    // Simple force simulation
    function simulate() {
      // Repulsion between nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x! - nodes[i].x!;
          const dy = nodes[j].y! - nodes[i].y!;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = 500 / (dist * dist);
          nodes[i].vx! -= (dx / dist) * force;
          nodes[i].vy! -= (dy / dist) * force;
          nodes[j].vx! += (dx / dist) * force;
          nodes[j].vy! += (dy / dist) * force;
        }
      }

      // Attraction along links
      for (const link of data.links) {
        if (filterType !== 'all' && link.type !== filterType) continue;
        const source = nodeMap.get(link.source);
        const target = nodeMap.get(link.target);
        if (!source || !target) continue;

        const dx = target.x! - source.x!;
        const dy = target.y! - source.y!;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = (dist - 100) * 0.01;
        source.vx! += (dx / dist) * force;
        source.vy! += (dy / dist) * force;
        target.vx! -= (dx / dist) * force;
        target.vy! -= (dy / dist) * force;
      }

      // Center gravity
      for (const node of nodes) {
        node.vx! += (dimensions.width / 2 - node.x!) * 0.001;
        node.vy! += (dimensions.height / 2 - node.y!) * 0.001;
      }

      // Apply velocities with damping
      for (const node of nodes) {
        node.vx! *= 0.9;
        node.vy! *= 0.9;
        node.x! += node.vx!;
        node.y! += node.vy!;
        // Bounds
        node.x = Math.max(50, Math.min(dimensions.width - 50, node.x!));
        node.y = Math.max(50, Math.min(dimensions.height - 50, node.y!));
      }
    }

    function draw() {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Draw links
      for (const link of data.links) {
        if (filterType !== 'all' && link.type !== filterType) continue;
        const source = nodeMap.get(link.source);
        const target = nodeMap.get(link.target);
        if (!source || !target) continue;

        ctx.beginPath();
        ctx.strokeStyle = LINK_COLORS[link.type] || '#cbd5e1';
        ctx.lineWidth = selectedNode && (selectedNode.id === source.id || selectedNode.id === target.id) ? 3 : 1;
        ctx.globalAlpha = selectedNode && (selectedNode.id !== source.id && selectedNode.id !== target.id) ? 0.2 : 0.6;
        ctx.moveTo(source.x!, source.y!);
        ctx.lineTo(target.x!, target.y!);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Draw nodes
      for (const node of nodes) {
        const radius = 5 + Math.min(node.connections * 2, 15);
        const isSelected = selectedNode?.id === node.id;

        ctx.beginPath();
        ctx.fillStyle = COLORS[node.group] || COLORS['Other'];
        ctx.globalAlpha = selectedNode && !isSelected ? 0.3 : 1;
        ctx.arc(node.x!, node.y!, radius, 0, Math.PI * 2);
        ctx.fill();

        if (isSelected) {
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Draw label
        ctx.fillStyle = '#1f2937';
        ctx.font = isSelected ? 'bold 12px sans-serif' : '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x!, node.y! + radius + 12);
        ctx.globalAlpha = 1;
      }
    }

    // Animation loop
    let animationId: number;
    let frame = 0;

    function animate() {
      if (frame < 200) {
        simulate();
      }
      draw();
      frame++;
      animationId = requestAnimationFrame(animate);
    }

    animate();

    // Click handler
    function handleClick(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (const node of nodes) {
        const dx = node.x! - x;
        const dy = node.y! - y;
        if (dx * dx + dy * dy < 400) {
          setSelectedNode(node);
          return;
        }
      }
      setSelectedNode(null);
    }

    canvas.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('click', handleClick);
    };
  }, [data, dimensions, filterType, selectedNode]);

  if (loading) return <div className="p-8">Loading relationship graph...</div>;
  if (!data) return <div className="p-8 text-red-600">Failed to load data</div>;

  // Get relationships for selected node
  const selectedLinks = selectedNode
    ? data.links.filter(l => l.source === selectedNode.id || l.target === selectedNode.id)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Character Relationship Graph</h1>
            <p className="text-gray-600">{data.stats.totalNodes} characters, {data.stats.totalLinks} relationships</p>
          </div>
          <Link href="/characters" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Back to Characters
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {/* Graph */}
          <div className="col-span-3 bg-white rounded-lg shadow p-4">
            <div className="flex gap-2 mb-4 flex-wrap">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded text-sm ${filterType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                All
              </button>
              {data.stats.relationshipTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded text-sm ${filterType === type ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                  style={{ borderLeft: `4px solid ${LINK_COLORS[type] || '#cbd5e1'}` }}
                >
                  {type}
                </button>
              ))}
            </div>
            <canvas
              ref={canvasRef}
              width={dimensions.width}
              height={dimensions.height}
              className="border rounded cursor-pointer"
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Legend */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-2">Node Colors</h3>
              {Object.entries(COLORS).map(([group, color]) => (
                <div key={group} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                  <span>{group}</span>
                </div>
              ))}
            </div>

            {/* Selected Node */}
            {selectedNode && (
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold mb-2">{selectedNode.name}</h3>
                {selectedNode.archetype && (
                  <p className="text-sm text-gray-600 mb-2">{selectedNode.archetype}</p>
                )}
                <p className="text-sm text-gray-500 mb-3">{selectedNode.connections} connections</p>
                <Link
                  href={`/characters/${selectedNode.id}`}
                  className="text-blue-600 text-sm hover:underline"
                >
                  View Profile
                </Link>

                <h4 className="font-medium mt-4 mb-2 text-sm">Relationships:</h4>
                <div className="space-y-1 max-h-60 overflow-y-auto">
                  {selectedLinks.map((link, i) => {
                    const isFrom = link.source === selectedNode.id;
                    const otherId = isFrom ? link.target : link.source;
                    const other = data.nodes.find(n => n.id === otherId);
                    return (
                      <div key={i} className="text-sm p-2 bg-gray-50 rounded">
                        <span className="font-medium">{other?.name}</span>
                        <span className="text-gray-500 ml-1">({link.type})</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
