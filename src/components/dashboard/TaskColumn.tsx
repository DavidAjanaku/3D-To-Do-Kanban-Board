import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import { Task } from '@/types';
import { useTheme } from '@/context/ThemeContext';
import plus from '../../../public/assets/Plus.png';

import Image from 'next/image';
interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status: string;
  count: number;
}

export default function TaskColumn({ title, tasks, status, count }: TaskColumnProps) {
  const { isDark } = useTheme();

  return (
    <div className={`${isDark ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-300'} rounded-lg p-4 min-h-96 w-80 min-w-80 border-2 border-dotted flex flex-col`}>
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center">
          <h4 className={`font-medium text-sm ${isDark ? 'text-gray-300' : 'text-gray-400'}`}>{title}</h4>
          <span className={`px-1 py-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>({count})</span>
        </div>
        <button className={`flex items-center gap-1 text-sm p-1 transition-colors ${
          isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'
        }`}>
          <Image
            src={plus}
            alt="Add task"
            className={`w-4 h-4 ${isDark ? 'filter invert opacity-60 hover:opacity-80' : ''}`}
          />
          Add new task
        </button>
      </div>
      
      <div className="space-y-3 flex-1 overflow-y-auto">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}