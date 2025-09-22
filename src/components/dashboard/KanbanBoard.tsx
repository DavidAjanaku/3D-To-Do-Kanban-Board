'use client';

import { Plus, Filter, MoreHorizontal, LayoutGrid } from 'lucide-react';
import { useTaskContext } from '@/context/TaskContext';
import TaskColumn from './TaskColumn';
import Scene3D from '@/components/three/ThreeDScene';

export default function KanbanBoard() {
  const { tasks } = useTaskContext();
  
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const progressTasks = tasks.filter(task => task.status === 'progress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  return (
    <div className="flex-1 p-6">
     <div className="flex items-center justify-between mb-6 p-4  border-b border-gray-200">
  <div className="flex items-center gap-6">
    {/* Active tab with black underline */}
    <div className="flex items-center gap-2 pb-4 border-b-2 border-black">
      <img 
        src="/assets/icons.png" 
        alt="board view icon" 
        className="w-4 h-4"
      />
      <span className="text-sm font-medium">Board view</span>
    </div>

    {/* Inactive tab */}
    <button className="text-gray-500 hover:text-gray-700 flex items-center gap-2 transition-colors pb-4">
      <img 
        src="/assets/plus.png" 
        alt="add view" 
        className="w-4 h-4"
      />
      <span className="text-sm">Add view</span>
    </button>
  </div>

  <div className="flex items-center gap-2">
    <button className="px-4 py-2 border-0 border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors">
      <span className="text-sm">Filter</span>
    </button>
    <button className="px-4 py-2 hover:bg-gray-50 transition-colors">
      <span className="text-sm">Sort</span>
    </button>
    <button className="p-2 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors">
      <img 
        src="/assets/more.png" 
        alt="more options" 
        className="w-4 h-4"
      />
    </button>
    <button className="bg-gray-900 text-white px-4 py-2 rounded-3xl hover:bg-gray-800 transition-colors">
      <span className="text-sm font-medium">New template</span>
    </button>
  </div>
</div>


     
      
      <div className="flex p-4 gap-6 overflow-x-auto">
        <TaskColumn 
          title="To do" 
          tasks={todoTasks} 
          status="todo" 
          count={todoTasks.length}
        />
        <TaskColumn 
          title="In progress" 
          tasks={progressTasks} 
          status="progress" 
          count={progressTasks.length}
        />
        <TaskColumn 
          title="Done" 
          tasks={doneTasks} 
          status="done" 
          count={doneTasks.length}
        />
      </div>
    </div>
  );
}