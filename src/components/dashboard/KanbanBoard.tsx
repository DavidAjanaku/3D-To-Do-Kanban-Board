'use client';
import { Plus, Filter, MoreHorizontal, LayoutGrid } from 'lucide-react';
import { useTaskContext } from '@/context/TaskContext';
import { useTheme } from '@/context/ThemeContext';
import TaskColumn from './TaskColumn';
import more from '../../../public/assets/More.png';
import icon from '../../../public/assets/Icons.png';
import plus from '../../../public/assets/Plus.png';

import Image from 'next/image';
export default function KanbanBoard() {
  const { tasks } = useTaskContext();
  const { isDark } = useTheme();
  
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const progressTasks = tasks.filter(task => task.status === 'progress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  return (
    <div className="flex-1 ml-5 flex flex-col min-h-0">
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between mb-0 px-3 sm:px-6 py-4 ${isDark ? 'border-gray-700' : 'border-gray-200'} border-b flex-shrink-0 gap-4 sm:gap-0`}>
        <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto">
          <div className={`flex cursor-pointer items-center gap-2 pb-4 border-b-2 ${isDark ? 'border-white' : 'border-black'} whitespace-nowrap`}>
            <Image
              src={icon}
              alt="board view icon"
              className={`w-4 h-4 ${isDark ? 'filter invert opacity-80' : ''}`}
            />
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Board view</span>
          </div>
          
          <button className={`flex cursor-pointer items-center gap-2 transition-colors pb-4 whitespace-nowrap ${
            isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
          }`}>
            <Image
              src={plus}
              alt="add view"
              className={`w-4 h-4 ${isDark ? 'filter invert opacity-60 hover:opacity-80' : ''}`}
            />
            <span className="text-sm">Add view</span>
          </button>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <button className={`px-2 cursor-pointer sm:px-4 py-2 font-semibold flex items-center gap-2 transition-colors text-xs sm:text-sm ${
            isDark 
              ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
              : 'border-gray-300 hover:bg-gray-50 text-gray-700'
          }`}>
            <span>Filter</span>
          </button>
          
          <button className={`px-2 cursor-pointer sm:px-4 py-2 transition-colors text-xs sm:text-sm ${
            isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
          }`}>
            <span>Sort</span>
          </button>
          
          <button className={`p-2 cursor-pointer transition-colors ${
            isDark 
              ? 'border-gray-600 hover:bg-gray-700' 
              : 'border-gray-300 hover:bg-gray-50'
          }`}>
            <Image
              src={more}
              alt="more options"
              className={`w-6 h-6 ${isDark ? 'filter invert opacity-60 hover:opacity-80' : ''}`}
            />
          </button>
          
           <button className={`px-2 sm:px-4 py-2 cursor-pointer rounded-3xl transition-colors text-xs sm:text-sm font-medium ${
            isDark 
              ? 'bg-[#4B69FF] text-white hover:bg-[#3B5BFF]' 
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}>
            <span className="whitespace-nowrap">New template</span>
          </button>
        </div>
      </div>

      <div className="flex-1 px-2 sm:px-4 lg:px-6 py-2 sm:py-4 min-h-0">
        <div className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto h-full pb-4">
          <div className="flex gap-3 sm:gap-4 flex-wrap lg:gap-6">
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
      </div>
    </div>
  );
}