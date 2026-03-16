import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Bold, Italic, Code, List, ListOrdered, Image, Link } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock journal entries - each entry has left and right pages
const journalEntries = [
  {
    id: 1,
    date: 'Sunday, March 15, 2026',
    leftPage: {
      title: 'We had our first fight',
      content: `What did I learn? To listen first rather than explaining always. Not every time is the time to defend yourself. Maybe the other person just wants to be heard and understood. She also said one thing that stuck with me.

"Hanaan you make everything about yourself, it is not about you, it is about me."

I never thought that I do that. I thought I was a good listener. But I guess she is right, I try to please people rather than speak my own thoughts sometimes.

But when I be objective they get hurt. I really don't know what to do sometimes, feels like they don't understand me. I felt really bad I hurt her. I don't find her friend or anyone else attractive.`
    },
    rightPage: {
      content: `I really love her. She is the most prettiest girl for me. Whenever I see her I feel like: "I am sitting by the beach, winds gushing, waves crashing to the shore while my feet are submerged in the cold sea water, and this all is accompanied by a bright sun, that gives soothing warm to my whole body."

Anyways, she forgave me and I really hope we can get past this. She is the best thing that has happened to me ever. She is the girl of my dreams, and I really wanna spend the rest of my life with her.

I bought her a painting canvas that has numbers on it, and you color those numbered parts and it turns into a painting. I hope she likes it, ofc she will, she is an angel, she loves to be loved and I love cherishing her. Honestly she deserves all of this.

I also made her a custom card, and a custom envelope which I doodled myself. It's really great feeling to have someone to love and do this stuff for them.`
    }
  },
  {
    id: 2,
    date: 'Saturday, March 14, 2026',
    leftPage: {
      title: 'A Perfect Day',
      content: `Today was one of those days that makes everything worth it. We went for a walk in the park, just the two of us, and it felt like time stopped.

The sun was setting, painting the sky in shades of orange and pink. We talked about everything and nothing at the same time. These are the moments I want to remember forever.`
    },
    rightPage: {
      content: `She laughed at my terrible jokes, and I pretended not to notice how beautiful she looked in that golden light. But I did notice. I always do.

I'm grateful for days like these. They remind me of what truly matters in life - connection, presence, and love.

Tomorrow might bring challenges, but today was perfect.`
    }
  }
];

export function Journal() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);
  const [activeEditor, setActiveEditor] = useState<'left' | 'right' | null>(null);
  const [leftContent, setLeftContent] = useState(journalEntries[currentPage].leftPage.content);
  const [rightContent, setRightContent] = useState(journalEntries[currentPage].rightPage.content);

  const goToNextPage = () => {
    if (currentPage < journalEntries.length - 1 && !isFlipping) {
      setFlipDirection('next');
      setIsFlipping(true);
      setActiveEditor(null);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setLeftContent(journalEntries[currentPage + 1].leftPage.content);
        setRightContent(journalEntries[currentPage + 1].rightPage.content);
        setIsFlipping(false);
        setFlipDirection(null);
      }, 800);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection('prev');
      setIsFlipping(true);
      setActiveEditor(null);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setLeftContent(journalEntries[currentPage - 1].leftPage.content);
        setRightContent(journalEntries[currentPage - 1].rightPage.content);
        setIsFlipping(false);
        setFlipDirection(null);
      }, 800);
    }
  };

  const currentEntry = journalEntries[currentPage];
  const nextEntry = currentPage < journalEntries.length - 1 ? journalEntries[currentPage + 1] : null;
  const prevEntry = currentPage > 0 ? journalEntries[currentPage - 1] : null;

  const ToolbarButton = ({ icon: Icon, label }: { icon: any; label: string }) => (
    <button
      className="p-2 rounded hover:bg-[var(--hover)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
      title={label}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  const PageContent = ({ 
    page, 
    side, 
    pageNumber, 
    isEditing, 
    content, 
    onContentChange, 
    onEditClick 
  }: { 
    page: any; 
    side: 'left' | 'right'; 
    pageNumber: number;
    isEditing: boolean;
    content: string;
    onContentChange: (val: string) => void;
    onEditClick: () => void;
  }) => (
    <div className="h-full overflow-y-auto px-12 py-10">
      <div className={`max-w-xl ${side === 'left' ? 'ml-auto' : 'mr-auto'}`}>
        {page.title && (
          <h1 className="text-[28px] font-semibold text-[var(--foreground)] mb-6">
            {page.title}
          </h1>
        )}
        {isEditing ? (
          <textarea
            className="w-full min-h-[500px] bg-transparent resize-none outline-none text-[15px] leading-[1.8] text-[var(--foreground)] placeholder:text-[var(--foreground-tertiary)] font-mono"
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Start writing..."
            spellCheck={false}
            autoFocus
            onBlur={() => setActiveEditor(null)}
          />
        ) : (
          <div 
            className="text-[15px] leading-[1.8] text-[var(--foreground)] whitespace-pre-wrap cursor-text font-mono"
            onClick={onEditClick}
          >
            {content}
          </div>
        )}
      </div>
      <div className={`absolute bottom-8 ${side === 'left' ? 'right-12' : 'left-12'} text-[12px] text-[var(--foreground-tertiary)] font-medium`}>
        {pageNumber}
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--background)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-[var(--border-light)]">
        <div className="flex items-center gap-4">
          <button 
            onClick={goToPrevPage}
            disabled={currentPage === 0 || isFlipping}
            className="p-2 rounded-lg hover:bg-[var(--hover)] text-[var(--foreground-secondary)] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-[13px] text-[var(--foreground-secondary)] font-medium">
            {currentEntry.date}
          </div>
          <button 
            onClick={goToNextPage}
            disabled={currentPage === journalEntries.length - 1 || isFlipping}
            className="p-2 rounded-lg hover:bg-[var(--hover)] text-[var(--foreground-secondary)] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="text-[13px] text-[var(--foreground-tertiary)]">
          Pages {currentPage * 2 + 1}-{currentPage * 2 + 2}
        </div>
      </div>

      {/* Formatting Toolbar */}
      {activeEditor && (
        <div className="border-b border-[var(--border-light)] bg-[var(--card)] px-8 py-2">
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-[13px] rounded hover:bg-[var(--hover)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors">
              H1
            </button>
            <button className="px-3 py-1.5 text-[13px] rounded hover:bg-[var(--hover)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors">
              H2
            </button>
            <button className="px-3 py-1.5 text-[13px] rounded hover:bg-[var(--hover)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors">
              H3
            </button>
            <div className="w-px h-6 bg-[var(--border-light)] mx-1" />
            <ToolbarButton icon={Bold} label="Bold" />
            <ToolbarButton icon={Italic} label="Italic" />
            <ToolbarButton icon={Code} label="Code" />
            <div className="w-px h-6 bg-[var(--border-light)] mx-1" />
            <ToolbarButton icon={List} label="Bullet List" />
            <ToolbarButton icon={ListOrdered} label="Numbered List" />
            <div className="w-px h-6 bg-[var(--border-light)] mx-1" />
            <ToolbarButton icon={Image} label="Image" />
            <ToolbarButton icon={Link} label="Link" />
          </div>
        </div>
      )}

      {/* Book Container */}
      <div className="flex-1 overflow-hidden flex items-center justify-center py-12 px-8">
        <div 
          className="relative w-full max-w-7xl h-full"
          style={{ perspective: '3000px' }}
        >
          <div className="absolute inset-0 flex gap-0">
            {/* Static Left Page */}
            <div 
              className="flex-1 h-full bg-[var(--card)] border-l border-t border-b border-[var(--border-light)] rounded-l-lg overflow-hidden relative shadow-2xl"
              style={{
                boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.05)'
              }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none z-10" />
              
              <PageContent 
                page={currentEntry.leftPage}
                side="left"
                pageNumber={currentPage * 2 + 1}
                isEditing={activeEditor === 'left'}
                content={leftContent}
                onContentChange={setLeftContent}
                onEditClick={() => setActiveEditor('left')}
              />
            </div>

            {/* Center Spine */}
            <div className="w-[4px] h-full bg-gradient-to-b from-black/20 via-black/30 to-black/20 shadow-lg" style={{ zIndex: 20 }} />

            {/* Static Right Page */}
            <div 
              className="flex-1 h-full bg-[var(--card)] border-r border-t border-b border-[var(--border-light)] rounded-r-lg overflow-hidden relative shadow-2xl"
              style={{
                boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.05)'
              }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-10" />
              
              <PageContent 
                page={currentEntry.rightPage}
                side="right"
                pageNumber={currentPage * 2 + 2}
                isEditing={activeEditor === 'right'}
                content={rightContent}
                onContentChange={setRightContent}
                onEditClick={() => setActiveEditor('right')}
              />
            </div>

            {/* Flipping Page Overlay - Right to Left (Next) */}
            <AnimatePresence>
              {isFlipping && flipDirection === 'next' && nextEntry && (
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: -180 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  className="absolute top-0 bottom-0 right-0 w-1/2"
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'left center',
                    zIndex: 30
                  }}
                >
                  {/* Front of flipping page (current right page) */}
                  <div 
                    className="absolute inset-0 bg-[var(--card)] border-r border-t border-b border-[var(--border-light)] rounded-r-lg overflow-hidden shadow-2xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.05)'
                    }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-10" />
                    <PageContent 
                      page={currentEntry.rightPage}
                      side="right"
                      pageNumber={currentPage * 2 + 2}
                      isEditing={false}
                      content={rightContent}
                      onContentChange={() => {}}
                      onEditClick={() => {}}
                    />
                  </div>

                  {/* Back of flipping page (next left page) */}
                  <div 
                    className="absolute inset-0 bg-[var(--card)] border-l border-t border-b border-[var(--border-light)] rounded-l-lg overflow-hidden shadow-2xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.05)'
                    }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none z-10" />
                    <PageContent 
                      page={nextEntry.leftPage}
                      side="left"
                      pageNumber={(currentPage + 1) * 2 + 1}
                      isEditing={false}
                      content={nextEntry.leftPage.content}
                      onContentChange={() => {}}
                      onEditClick={() => {}}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Flipping Page Overlay - Left to Right (Prev) */}
            <AnimatePresence>
              {isFlipping && flipDirection === 'prev' && prevEntry && (
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 180 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  className="absolute top-0 bottom-0 left-0 w-1/2"
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'right center',
                    zIndex: 30
                  }}
                >
                  {/* Front of flipping page (current left page) */}
                  <div 
                    className="absolute inset-0 bg-[var(--card)] border-l border-t border-b border-[var(--border-light)] rounded-l-lg overflow-hidden shadow-2xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.05)'
                    }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none z-10" />
                    <PageContent 
                      page={currentEntry.leftPage}
                      side="left"
                      pageNumber={currentPage * 2 + 1}
                      isEditing={false}
                      content={leftContent}
                      onContentChange={() => {}}
                      onEditClick={() => {}}
                    />
                  </div>

                  {/* Back of flipping page (prev right page) */}
                  <div 
                    className="absolute inset-0 bg-[var(--card)] border-r border-t border-b border-[var(--border-light)] rounded-r-lg overflow-hidden shadow-2xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg) scaleX(-1)',
                      boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.05)'
                    }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none z-10" />
                    <div className="transform scale-x-[-1]">
                      <PageContent 
                        page={prevEntry.rightPage}
                        side="right"
                        pageNumber={(currentPage - 1) * 2 + 2}
                        isEditing={false}
                        content={prevEntry.rightPage.content}
                        onContentChange={() => {}}
                        onEditClick={() => {}}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
