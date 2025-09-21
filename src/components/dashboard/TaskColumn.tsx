import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import { Task } from '@/types';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status: string;
  count: number;
}

export default function TaskColumn({ title, tasks, status, count }: TaskColumnProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 min-h-96 flex-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-medium text-gray-700">{title}</h2>
          <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">({count})</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600 p-1 flex items-center gap-1 text-sm">
          <Plus size={16} />
          Add new task
        </button>
      </div>
      
      <div className="space-y-3">
          {/* <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-2">
          <Plus size={16} />
          Add new task
        </button> */}
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
        
      
      </div>
    </div>
  );
}