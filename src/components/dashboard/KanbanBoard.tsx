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
       <div className="flex items-center justify-between mb-6 p-4 bg-white">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 pb-4 border-b-2 border-black">
          <LayoutGrid size={16} />
          <span className="text-sm font-medium">Board view</span>
        </div>
        <button className="text-gray-500 hover:text-gray-700 flex items-center gap-2 transition-colors pb-4">
          <Plus size={16} />
          <span className="text-sm">Add view</span>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-4 py-2 border-0 border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors">
          
          <span className="text-sm">Filter</span>
        </button>
        <button className="px-4 py-2  border-gray-300  hover:bg-gray-50 transition-colors">
          <span className="text-sm">Sort</span>
        </button>
        <button className="p-2 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-colors">
          <MoreHorizontal size={16} />
        </button>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-3xl hover:bg-gray-800 transition-colors">
          <span className="text-sm font-medium">New template</span>
        </button>
      </div>
    </div>

     
      
      <div className="flex gap-6 overflow-x-auto">
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