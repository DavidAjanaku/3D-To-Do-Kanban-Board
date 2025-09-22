import { MoreHorizontal, MessageCircle, Eye, FileText } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import ProgressBar from './ProgressBar';
import { Task } from '@/types';
import { useTheme } from '@/context/ThemeContext';
import more from '../../../public/assets/More.png';
import icon from '../../../public/assets/Icon.png';
import Image from 'next/image';
interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { isDark } = useTheme();
  
  const statusColors = {
    todo: 'border-l-orange-500',
    progress: 'border-l-blue-500',
    done: 'border-l-green-500'
  };

  const priorityDots = {
    low: 'bg-green-400',
    medium: 'bg-yellow-400',
    high: 'bg-red-400'
  };

  // Function to determine date background color based on due date and status
  const getDateBackgroundClass = (dueDate: string, status: string) => {
    if (status === 'done') {
      return isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600';
    }

    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    const timeDiff = taskDueDate.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff <= 0) {
      return isDark ? 'bg-gray-700 text-gray-300' : 'bg-red-100 text-red-700';
    } else if (daysDiff <= 3) {
      return isDark ? 'bg-orange-800 text-orange-200' : 'bg-orange-100 text-orange-700';
    } else if (daysDiff <= 7) {
      return isDark ? 'bg-yellow-800 text-yellow-200' : 'bg-yellow-100 text-yellow-700';
    } else {
      return isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className={`${isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-md'} rounded-lg p-4 shadow-sm transition-all duration-200`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{task.title}</h3>
        <button className={`transition-colors ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}>
          <Image 
            src={more} 
            alt="more options" 
            className={`w-6 h-6 ${isDark ? 'filter invert opacity-60 hover:opacity-80' : ''}`}
          />
        </button>
      </div>
      
      <p className={`text-xs mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{task.description}</p>
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Image 
            src={icon}
            alt="progress icon" 
            className={`w-4 h-4 ${isDark ? 'filter invert opacity-60' : ''}`}
          />
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Progress</span>
        </div>
        <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{task.progress}/10</span>
      </div>
      
      <ProgressBar progress={task.progress * 10} className="mb-3" />
      
      <div className={`flex items-center justify-between text-xs mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        <div className="flex items-center">
          <span className={`px-2 py-1 rounded text-xs ${getDateBackgroundClass(task.dueDate, task.status)}`}>
            {task.dueDate}
          </span>
        </div>
        
        {/* Right side: Either avatars or stats */}
        <div className="flex items-center">
          {task.assignees.length > 0 ? (
            <div className="flex items-center">
              {task.assignees.slice(0, 2).map((assignee, index) => (
                <Avatar
                  key={index}
                  alt={assignee}
                  className="w-6 h-6 -ml-1 first:ml-0 border-2 border-white"
                />
              ))}
              {task.assignees.length > 2 && (
                <div className={`w-6 h-6 -ml-1 rounded-full flex items-center justify-center border-2 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-800 text-gray-300' 
                    : 'bg-gray-100 border-white text-gray-600'
                }`}>
                  <span className="text-xs">+{task.assignees.length - 2}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {task.comments > 0 && (
                <div className="flex items-center gap-1">
                  <MessageCircle size={12} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                  <span>{task.comments}</span>
                </div>
              )}
              {task.attachments > 0 && (
                <div className="flex items-center gap-1">
                  <FileText size={12} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                  <span>{task.attachments}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}