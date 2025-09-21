'use client';

import { TaskProvider } from '@/context/TaskContext';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import KanbanBoard from '@/components/dashboard/KanbanBoard';

export default function Home() {
  return (
    <TaskProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <KanbanBoard />
        </div>
      </div>
    </TaskProvider>
  );
}