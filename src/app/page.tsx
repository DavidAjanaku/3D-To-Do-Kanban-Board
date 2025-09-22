'use client';
import { TaskProvider } from '@/context/TaskContext';
import { useTheme } from '@/context/ThemeContext';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import KanbanBoard from '@/components/dashboard/KanbanBoard';

function AppContent() {
  const { isDark } = useTheme();

  return (
    <TaskProvider>
      <div className={`flex h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <KanbanBoard />
        </div>
      </div>
    </TaskProvider>
  );
}

export default function Home() {
  return <AppContent />;
}