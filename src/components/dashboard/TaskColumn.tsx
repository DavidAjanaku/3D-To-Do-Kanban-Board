import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import { Task } from '@/types';
import { useTheme } from '@/context/ThemeContext';
import { useTaskContext } from '@/context/TaskContext';
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
  const { updateTask } = useTaskContext();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    try {
      const taskData = JSON.parse(e.dataTransfer.getData('application/json')) as Task;
      
      if (taskData.status === status) {
        return;
      }

      // Update task status and progress based on the column
      let newProgress = taskData.progress;
      if (status === 'done') {
        newProgress = 10; // Completed
      } else if (status === 'progress' && taskData.progress === 0) {
        newProgress = Math.max(taskData.progress, 3); // Start with some progress
      } else if (status === 'todo') {
        newProgress = 0; // Reset progress
      }

      updateTask(taskData.id, { 
        status: status as 'todo' | 'progress' | 'done',
        progress: newProgress
      });

      // Brief success feedback
      const column = e.currentTarget;
      column.classList.add('animate-pulse');
      setTimeout(() => {
        column.classList.remove('animate-pulse');
      }, 200);

    } catch (error) {
      console.error('Error parsing dropped task data:', error);
    }
  };

  const getDropZoneStyle = () => {
    if (!isDragOver) return '';
    
    switch (status) {
      case 'done':
        return isDark 
          ? 'border-green-400 bg-green-900/10 shadow-lg shadow-green-400/20' 
          : 'border-green-500 bg-green-50 shadow-lg shadow-green-500/20';
      case 'progress':
        return isDark 
          ? 'border-blue-400 bg-blue-900/10 shadow-lg shadow-blue-400/20' 
          : 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20';
      case 'todo':
        return isDark 
          ? 'border-orange-400 bg-orange-900/10 shadow-lg shadow-orange-400/20' 
          : 'border-orange-500 bg-orange-50 shadow-lg shadow-orange-500/20';
      default:
        return '';
    }
  };

  return (
    <div 
      className={`${isDark ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-300'} 
        rounded-lg p-4 min-h-96 w-80 min-w-80 border-2 border-dotted flex flex-col 
        transition-all duration-300 ${getDropZoneStyle()}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center">
          <h4 className={`font-medium text-sm ${isDark ? 'text-gray-300' : 'text-gray-400'}`}>
            {title}
          </h4>
          <span className={`px-1 py-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
            ({count})
          </span>
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

      {isDragOver && (
        <div className={`mb-4 p-6 border-2 border-dashed rounded-lg text-center transition-all duration-200 ${
          status === 'done' 
            ? (isDark ? 'border-green-400 text-green-400' : 'border-green-500 text-green-600')
            : status === 'progress'
            ? (isDark ? 'border-blue-400 text-blue-400' : 'border-blue-500 text-blue-600')
            : (isDark ? 'border-orange-400 text-orange-400' : 'border-orange-500 text-orange-600')
        }`}>
          <div className="text-sm font-medium">
            {status === 'done' && 'Release to complete task'}
            {status === 'progress' && 'Release to start working on task'}
            {status === 'todo' && 'Release to move to backlog'}
          </div>
        </div>
      )}

      {/* Tasks */}
      <div className={`space-y-3 flex-1 overflow-y-auto transition-opacity duration-200 ${
        isDragOver ? 'opacity-60' : ''
      }`}>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
        
        {/* Empty state */}
        {tasks.length === 0 && !isDragOver && (
          <div className={`flex-1 flex items-center justify-center h-32 border-2 border-dashed rounded-lg ${
            isDark ? 'border-gray-600 text-gray-500' : 'border-gray-300 text-gray-400'
          }`}>
            <div className="text-center">
              <div className="text-sm">No tasks</div>
              <div className="text-xs mt-1">Drag tasks here</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}