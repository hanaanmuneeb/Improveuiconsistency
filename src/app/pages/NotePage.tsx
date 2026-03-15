import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Link as LinkIcon,
  Code,
  MoreHorizontal
} from 'lucide-react';

export function NotePage() {
  const location = useLocation();
  const isSyntheticBio = location.pathname.includes('synthetic-bio');
  
  const [content, setContent] = useState(
    isSyntheticBio 
      ? `# chapter 1

i am testing the app lets see

• these are bullet points
• testing

## a monthly guide

_a monthly guide_

this is a quote

this is a numbered list

1. hey
2. luke
3. [Luke]`
      : '/'
  );

  const [showToolbar, setShowToolbar] = useState(false);

  const ToolbarButton = ({ icon: Icon, label }: { icon: any; label: string }) => (
    <button 
      className="p-2 rounded-lg hover:bg-[var(--hover)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-all duration-200"
      title={label}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <div className="flex-1 flex h-full bg-[var(--background)] overflow-hidden">
      {/* Sidebar with pages list */}
      <div className="w-64 border-r border-[var(--border)] bg-[var(--background-secondary)] flex flex-col">
        <div className="px-4 py-4 border-b border-[var(--border)]">
          <h2 className="text-[15px] font-semibold text-[var(--foreground)]">Uni</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            <a 
              href="/uni/synthetic-bio"
              className={`block px-3 py-2 rounded-lg text-[13px] transition-all duration-200 ${
                isSyntheticBio 
                  ? 'bg-[var(--accent)] text-white' 
                  : 'text-[var(--foreground-secondary)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]'
              }`}
            >
              <div className="font-medium">synthetic bio</div>
              <div className="text-[11px] opacity-60 truncate mt-0.5">
                chapter 1 i am testing the app...
              </div>
            </a>
            <a 
              href="/uni/untitled"
              className={`block px-3 py-2 rounded-lg text-[13px] transition-all duration-200 ${
                !isSyntheticBio 
                  ? 'bg-[var(--accent)] text-white' 
                  : 'text-[var(--foreground-secondary)] hover:bg-[var(--hover)] hover:text-[var(--foreground)]'
              }`}
            >
              <div className="font-medium">Untitled</div>
              <div className="text-[11px] opacity-60 truncate mt-0.5">/...</div>
            </a>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="px-8 py-3 border-b border-[var(--border-light)] flex items-center gap-1">
          <ToolbarButton icon={Heading1} label="Heading 1" />
          <ToolbarButton icon={Heading2} label="Heading 2" />
          <ToolbarButton icon={Heading3} label="Heading 3" />
          <div className="w-px h-6 bg-[var(--border)] mx-1" />
          <ToolbarButton icon={Bold} label="Bold" />
          <ToolbarButton icon={Italic} label="Italic" />
          <ToolbarButton icon={Code} label="Code" />
          <div className="w-px h-6 bg-[var(--border)] mx-1" />
          <ToolbarButton icon={List} label="Bullet List" />
          <ToolbarButton icon={ListOrdered} label="Numbered List" />
          <div className="w-px h-6 bg-[var(--border)] mx-1" />
          <ToolbarButton icon={ImageIcon} label="Insert Image" />
          <ToolbarButton icon={LinkIcon} label="Insert Link" />
          <div className="ml-auto" />
          <ToolbarButton icon={MoreHorizontal} label="More" />
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          <div className="max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Untitled"
              className="w-full text-[32px] font-bold text-[var(--foreground)] bg-transparent border-none outline-none mb-6 placeholder:text-[var(--foreground-tertiary)]"
              defaultValue={isSyntheticBio ? 'synthetic bio' : 'Untitled'}
            />
            <textarea
              className="w-full min-h-[600px] bg-transparent resize-none outline-none text-[17px] leading-[1.7] text-[var(--foreground)] placeholder:text-[var(--foreground-tertiary)] font-mono"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing..."
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
