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
<div className="bg-gray-50 rounded-lg p-4 min-h-96 flex-1 border-2 border-gray-300 border-dotted">

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center ">
          <h4 className="font-medium text-sm text-gray-400">{title}</h4>
          <span className=" text-gray-400 px-1 py-1 text-xs">({count})</span>
        </div>
      <button className="text-gray-400 hover:text-gray-600 p-1 flex items-center gap-1 text-sm">
  <img 
    src="../assets/Plus.png" 
    alt="Add task" 
    className="w-4 h-4"
  />
  Add new task
</button>

      </div>
      
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
