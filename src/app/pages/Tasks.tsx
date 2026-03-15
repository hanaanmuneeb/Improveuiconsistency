import React from 'react';
import { Circle } from 'lucide-react';

export function Tasks() {
  const tasks = {
    overdue: [
      { id: 1, date: 'Sun, Mar 15', title: 'AGS mevzuat missing Q' },
      { id: 2, date: 'Sun, Mar 15', title: 'AGS Sozel Yetenek missing Q' },
      { id: 3, date: 'Sun, Mar 15', title: 'AGS Tarih finish' },
      { id: 4, date: 'Sun, Mar 15', title: 'AGS Egitim Bilimleri Finish' },
    ],
    today: [
      { id: 5, date: 'Mon, Mar 16', title: 'Date w Samira' },
    ],
    thisWeek: [
      { id: 6, date: 'Tue, Mar 17', title: "Ridha's Bday" },
    ],
    later: [
      { id: 7, date: 'Mon, Apr 6', title: 'Meet with Cripple' },
    ],
  };

  const TaskRow = ({ task, overdue = false }) => (
    <div className="group flex items-center gap-4 px-4 py-3 bg-[var(--background-secondary)] hover:bg-[var(--hover)] transition-all duration-200 rounded-xl cursor-pointer border border-[var(--border-light)]">
      <button className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-[var(--foreground-tertiary)] hover:border-[var(--accent)] transition-colors duration-200" />
      <div className="flex-1 flex items-center gap-4">
        <span className={`text-[13px] font-medium w-28 flex-shrink-0 ${overdue ? 'text-red-500' : 'text-[var(--foreground-tertiary)]'}`}>
          {task.date}
        </span>
        <span className="text-[15px] text-[var(--foreground)]">{task.title}</span>
      </div>
    </div>
  );

  return (
    <div className="flex-1 h-full bg-[var(--background)] overflow-hidden">
      {/* Header */}
      <div className="px-8 py-4 border-b border-[var(--border-light)]">
        <h1 className="text-[28px] font-semibold text-[var(--foreground)]">My Tasks</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Overdue */}
          {tasks.overdue.length > 0 && (
            <div>
              <h2 className="text-[11px] font-semibold text-red-500 tracking-wider mb-4 uppercase px-1">
                Overdue
              </h2>
              <div className="space-y-2">
                {tasks.overdue.map((task) => (
                  <TaskRow key={task.id} task={task} overdue={true} />
                ))}
              </div>
            </div>
          )}

          {/* Today */}
          {tasks.today.length > 0 && (
            <div>
              <h2 className="text-[11px] font-semibold text-[var(--foreground-tertiary)] tracking-wider mb-4 uppercase px-1">
                Today
              </h2>
              <div className="space-y-2">
                {tasks.today.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}

          {/* This Week */}
          {tasks.thisWeek.length > 0 && (
            <div>
              <h2 className="text-[11px] font-semibold text-[var(--foreground-tertiary)] tracking-wider mb-4 uppercase px-1">
                This Week
              </h2>
              <div className="space-y-2">
                {tasks.thisWeek.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}

          {/* Later */}
          {tasks.later.length > 0 && (
            <div>
              <h2 className="text-[11px] font-semibold text-[var(--foreground-tertiary)] tracking-wider mb-4 uppercase px-1">
                Later
              </h2>
              <div className="space-y-2">
                {tasks.later.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}