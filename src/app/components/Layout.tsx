import React from 'react';
import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';

export function Layout() {
  return (
    <div className="flex h-screen w-full bg-[var(--background)] text-[var(--foreground)] overflow-hidden transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 h-full overflow-hidden flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}