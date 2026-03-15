import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { 
  Sun, 
  Moon, 
  BookOpen, 
  Calendar as CalendarIcon, 
  CheckSquare, 
  FileText,
  Briefcase, 
  User, 
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { useTheme } from '../theme';

export function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const [uniExpanded, setUniExpanded] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-3 py-2 rounded-lg text-[15px] transition-all duration-200 ${
      isActive 
        ? 'bg-[var(--accent)] text-white' 
        : 'text-[var(--foreground-secondary)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]'
    }`;

  const subNavLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex flex-col px-3 py-2 rounded-lg transition-all duration-200 ml-7 text-[13px] ${
      isActive 
        ? 'bg-[var(--accent)] text-white' 
        : 'text-[var(--foreground-secondary)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]'
    }`;

  return (
    <div className={`${isCollapsed ? 'w-[60px]' : 'w-[260px]'} flex-shrink-0 h-full border-r border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] flex flex-col overflow-hidden transition-all duration-300`}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--sidebar-border)]">
        {!isCollapsed && <h1 className="text-[17px] font-semibold text-[var(--foreground)]">My Journal</h1>}
        <div className="flex items-center gap-1">
          {!isCollapsed && (
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-lg hover:bg-[var(--hover)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="p-2 rounded-lg hover:bg-[var(--hover)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-all duration-200"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <NavLink to="/" end className={navLinkClass} title="Journal">
          <BookOpen className="w-[18px] h-[18px]" strokeWidth={2} />
          {!isCollapsed && <span>Journal</span>}
        </NavLink>
        <NavLink to="/calendar" className={navLinkClass} title="Calendar">
          <CalendarIcon className="w-[18px] h-[18px]" strokeWidth={2} />
          {!isCollapsed && <span>Calendar</span>}
        </NavLink>

        {!isCollapsed && (
          <div className="pt-6 pb-2 px-3">
            <div className="text-[11px] font-semibold text-[var(--foreground-tertiary)] tracking-wider uppercase">
              Folders
            </div>
          </div>
        )}

        <NavLink to="/tasks" className={navLinkClass} title="Tasks">
          <CheckSquare className="w-[18px] h-[18px]" strokeWidth={2} />
          {!isCollapsed && <span>Tasks</span>}
        </NavLink>
        
        {!isCollapsed ? (
          <div className="space-y-1">
            <button 
              className="flex items-center gap-3 px-3 py-2 flex-1 w-full rounded-lg text-[15px] text-[var(--foreground-secondary)] hover:bg-[var(--hover)] hover:text-[var(--foreground)] transition-all duration-200"
              onClick={() => setUniExpanded(!uniExpanded)}
            >
              <FileText className="w-[18px] h-[18px]" strokeWidth={2} />
              <span>Uni</span>
              <ChevronRight className={`w-4 h-4 ml-auto transition-transform duration-200 ${uniExpanded ? 'rotate-90' : ''}`} />
            </button>
            
            {uniExpanded && (
              <div className="space-y-1 mt-1">
                <NavLink to="/uni/synthetic-bio" className={subNavLinkClass}>
                  <span className="font-medium">synthetic bio</span>
                  <span className="text-[11px] opacity-60 truncate mt-0.5">chapter 1 i am testing the app...</span>
                </NavLink>
                <NavLink to="/uni/untitled" className={subNavLinkClass}>
                  <span className="font-medium">Untitled</span>
                  <span className="text-[11px] opacity-60 truncate mt-0.5">/...</span>
                </NavLink>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/uni/synthetic-bio" className={navLinkClass} title="Uni">
            <FileText className="w-[18px] h-[18px]" strokeWidth={2} />
          </NavLink>
        )}

        <NavLink to="/work" className={navLinkClass} title="Work">
          <Briefcase className="w-[18px] h-[18px]" strokeWidth={2} />
          {!isCollapsed && <span>Work</span>}
        </NavLink>

        <NavLink to="/personal" className={navLinkClass} title="Personal">
          <User className="w-[18px] h-[18px]" strokeWidth={2} />
          {!isCollapsed && <span>Personal</span>}
        </NavLink>
      </div>
    </div>
  );
}