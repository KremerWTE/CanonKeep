'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Upload,
  Users,
  MapPin,
  Calendar,
  AlertTriangle,
  MessageSquare,
  Sparkles,
  BookOpen,
  Settings,
  Network,
} from 'lucide-react';

interface SidebarProps {
  projectId: string;
  projectName?: string;
}

export function Sidebar({ projectId, projectName }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Overview', href: `/projects/${projectId}`, icon: Home },
    { name: 'Uploads', href: `/projects/${projectId}/uploads`, icon: Upload },
    { name: 'Characters', href: `/projects/${projectId}/canon/entities?type=character`, icon: Users },
    { name: 'Locations', href: `/projects/${projectId}/canon/entities?type=location`, icon: MapPin },
    { name: 'Relationships', href: `/projects/${projectId}/canon/relationships`, icon: Network },
    { name: 'Timeline', href: `/projects/${projectId}/canon/timeline`, icon: Calendar },
    { name: 'Chapters', href: `/projects/${projectId}/chapters`, icon: BookOpen },
    { name: 'Writing Coach', href: `/projects/${projectId}/coach`, icon: Sparkles },
    { name: 'Alerts', href: `/projects/${projectId}/canon/alerts`, icon: AlertTriangle },
  ];

  const isActive = (href: string) => {
    if (href === `/projects/${projectId}`) {
      return pathname === href;
    }
    return pathname.startsWith(href.split('?')[0]);
  };

  return (
    <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-screen sticky top-0">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-white">Canon Keep</span>
        </Link>
        {projectName && (
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 truncate">
            {projectName}
          </p>
        )}
      </div>

      <nav className="p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${active
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                  : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-700">
        <Link
          href={`/projects/${projectId}/settings`}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700"
        >
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
