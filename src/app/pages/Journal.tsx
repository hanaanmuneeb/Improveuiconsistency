import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Bold, Italic, Code, List, ListOrdered, Image, Link, Type } from 'lucide-react';
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
  const [direction, setDirection] = useState(0);
  const [activeEditor, setActiveEditor] = useState<'left' | 'right' | null>(null);
  const [leftContent, setLeftContent] = useState(journalEntries[currentPage].leftPage.content);
  const [rightContent, setRightContent] = useState(journalEntries[currentPage].rightPage.content);

  const goToNextPage = () => {
    if (currentPage < journalEntries.length - 1) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
      setActiveEditor(null);
      setLeftContent(journalEntries[currentPage + 1].leftPage.content);
      setRightContent(journalEntries[currentPage + 1].rightPage.content);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(currentPage - 1);
      setActiveEditor(null);
      setLeftContent(journalEntries[currentPage - 1].leftPage.content);
      setRightContent(journalEntries[currentPage - 1].rightPage.content);
    }
  };

  const currentEntry = journalEntries[currentPage];

  // Book flip animation variants
  const bookVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 25 : -25,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -25 : 25,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const ToolbarButton = ({ icon: Icon, label }: { icon: any; label: string }) => (
    <button
      className="p-2 rounded hover:bg-[var(--hover)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
      title={label}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--background)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-[var(--border-light)]">
        <div className="flex items-center gap-4">
          <button 
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            className="p-2 rounded-lg hover:bg-[var(--hover)] text-[var(--foreground-secondary)] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-[13px] text-[var(--foreground-secondary)] font-medium">
            {currentEntry.date}
          </div>
          <button 
            onClick={goToNextPage}
            disabled={currentPage === journalEntries.length - 1}
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
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={currentEntry.id}
              custom={direction}
              variants={bookVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                rotateY: { 
                  type: 'spring', 
                  stiffness: 60, 
                  damping: 25 
                },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
              }}
              className="absolute inset-0 flex gap-0"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Left Page */}
              <div 
                className="flex-1 h-full bg-[var(--card)] border-l border-t border-b border-[var(--border-light)] rounded-l-lg overflow-hidden relative shadow-2xl"
                style={{
                  boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.05)'
                }}
              >
                {/* Left page binding shadow */}
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
                
                <div className="h-full overflow-y-auto px-12 py-10">
                  <div className="max-w-xl ml-auto">
                    {currentEntry.leftPage.title && (
                      <h1 className="text-[28px] font-semibold text-[var(--foreground)] mb-6">
                        {currentEntry.leftPage.title}
                      </h1>
                    )}
                    {activeEditor === 'left' ? (
                      <textarea
                        className="w-full min-h-[500px] bg-transparent resize-none outline-none text-[15px] leading-[1.8] text-[var(--foreground)] placeholder:text-[var(--foreground-tertiary)] font-mono"
                        value={leftContent}
                        onChange={(e) => setLeftContent(e.target.value)}
                        placeholder="Start writing..."
                        spellCheck={false}
                        autoFocus
                        onBlur={() => setActiveEditor(null)}
                      />
                    ) : (
                      <div 
                        className="text-[15px] leading-[1.8] text-[var(--foreground)] whitespace-pre-wrap cursor-text font-mono"
                        onClick={() => setActiveEditor('left')}
                      >
                        {leftContent}
                      </div>
                    )}
                  </div>
                </div>

                {/* Page number */}
                <div className="absolute bottom-8 right-12 text-[12px] text-[var(--foreground-tertiary)] font-medium">
                  {currentPage * 2 + 1}
                </div>
              </div>

              {/* Center Spine */}
              <div className="w-[4px] h-full bg-gradient-to-b from-black/20 via-black/30 to-black/20 shadow-lg" style={{ zIndex: 10 }} />

              {/* Right Page */}
              <div 
                className="flex-1 h-full bg-[var(--card)] border-r border-t border-b border-[var(--border-light)] rounded-r-lg overflow-hidden relative shadow-2xl"
                style={{
                  boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.05)'
                }}
              >
                {/* Right page binding shadow */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
                
                <div className="h-full overflow-y-auto px-12 py-10">
                  <div className="max-w-xl mr-auto">
                    {activeEditor === 'right' ? (
                      <textarea
                        className="w-full min-h-[500px] bg-transparent resize-none outline-none text-[15px] leading-[1.8] text-[var(--foreground)] placeholder:text-[var(--foreground-tertiary)] font-mono"
                        value={rightContent}
                        onChange={(e) => setRightContent(e.target.value)}
                        placeholder="Continue writing..."
                        spellCheck={false}
                        autoFocus
                        onBlur={() => setActiveEditor(null)}
                      />
                    ) : (
                      <div 
                        className="text-[15px] leading-[1.8] text-[var(--foreground)] whitespace-pre-wrap cursor-text font-mono"
                        onClick={() => setActiveEditor('right')}
                      >
                        {rightContent}
                      </div>
                    )}
                  </div>
                </div>

                {/* Page number */}
                <div className="absolute bottom-8 left-12 text-[12px] text-[var(--foreground-tertiary)] font-medium">
                  {currentPage * 2 + 2}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}