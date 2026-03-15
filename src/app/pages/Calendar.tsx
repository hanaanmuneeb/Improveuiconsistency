import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Calendar() {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Generating calendar days for March 2026
  const calendarCells = [];
  
  // February days to pad
  for (let i = 0; i < 6; i++) {
    calendarCells.push({ day: '', disabled: true, events: [] });
  }
  
  // March days
  for (let i = 1; i <= 31; i++) {
    const events = [];
    if (i === 15) {
      events.push({ title: 'AGS mevzuat missing Q', color: 'blue' });
      events.push({ title: 'AGS Sozel Yetenek missing Q', color: 'blue' });
      events.push({ title: 'AGS Tarih finish', color: 'blue' });
    }
    if (i === 16) {
      events.push({ title: 'Date w Samira', color: 'purple' });
    }
    if (i === 17) {
      events.push({ title: "Ridha's Bday", color: 'green' });
    }
    
    calendarCells.push({ day: i, disabled: false, events, isToday: i === 16 });
  }
  
  // Pad the rest
  const remaining = 42 - calendarCells.length;
  for (let i = 0; i < remaining; i++) {
    calendarCells.push({ day: '', disabled: true, events: [] });
  }

  const eventColors = {
    blue: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
    purple: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
    green: 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400',
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--background)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-[var(--border-light)]">
        <div className="flex items-center gap-4">
          <h1 className="text-[28px] font-semibold text-[var(--foreground)]">
            March <span className="text-[var(--foreground-secondary)] font-normal">2026</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-[var(--hover)] text-[var(--foreground-secondary)] transition-all duration-200">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="px-4 py-2 rounded-lg hover:bg-[var(--hover)] text-[var(--foreground-secondary)] text-[15px] transition-all duration-200">
            Today
          </button>
          <button className="p-2 rounded-lg hover:bg-[var(--hover)] text-[var(--foreground-secondary)] transition-all duration-200">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          {/* Calendar Grid */}
          <div className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-2xl overflow-hidden">
            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-[var(--border)]">
              {daysOfWeek.map((day) => (
                <div key={day} className="py-3 text-center text-[13px] font-semibold text-[var(--foreground-secondary)]">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar cells */}
            <div className="grid grid-cols-7 auto-rows-[120px]">
              {calendarCells.map((cell, idx) => (
                <div 
                  key={idx} 
                  className={`
                    border-b border-r border-[var(--border-light)] p-2 flex flex-col transition-all duration-200
                    ${(idx + 1) % 7 === 0 ? 'border-r-0' : ''}
                    ${idx >= 35 ? 'border-b-0' : ''}
                    ${cell.disabled ? 'bg-[var(--background-tertiary)]/30' : 'bg-[var(--background)] hover:bg-[var(--hover)]'}
                  `}
                >
                  {cell.day && (
                    <>
                      <div className="flex items-start justify-between mb-1">
                        <span 
                          className={`
                            text-[15px] font-medium px-2 py-0.5 rounded-lg
                            ${cell.isToday 
                              ? 'bg-[var(--accent)] text-white' 
                              : 'text-[var(--foreground)]'
                            }
                          `}
                        >
                          {cell.day}
                        </span>
                      </div>
                      
                      <div className="space-y-1 overflow-hidden">
                        {cell.events.map((event, eventIdx) => (
                          <div 
                            key={eventIdx} 
                            className={`text-[11px] truncate px-2 py-1 rounded-md font-medium ${eventColors[event.color]}`}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}