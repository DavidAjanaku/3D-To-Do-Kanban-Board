import { MoreHorizontal, MessageCircle, Eye, FileText } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import ProgressBar from './ProgressBar';
import { Task } from '@/types';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
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
    // If task is done, show grey background
    if (status === 'done') {
      return 'bg-gray-100 text-gray-600';
    }

    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    const timeDiff = taskDueDate.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Overdue or due today - red background
    if (daysDiff <= 0) {
      return 'bg-red-100 text-red-700';
    }
    // Due within 3 days - orange background
    else if (daysDiff <= 3) {
      return 'bg-orange-100 text-orange-700';
    }
    // Due within a week - yellow background
    else if (daysDiff <= 7) {
      return 'bg-yellow-100 text-yellow-700';
    }
    // More than a week - grey background
    else {
      return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900 text-sm">{task.title}</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={16} />
        </button>
      </div>
      
      <p className="text-xs text-gray-500 mb-3">{task.description}</p>
      
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-600">Progress</span>
        <span className="text-xs font-medium text-gray-900">{task.progress}/10</span>
      </div>
      
      <ProgressBar progress={task.progress * 10} className="mb-3" />
      
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
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
                <div className="w-6 h-6 -ml-1 bg-gray-100 rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-xs text-gray-600">+{task.assignees.length - 2}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {task.comments > 0 && (
                <div className="flex items-center gap-1">
                  <MessageCircle size={12} />
                  <span>{task.comments}</span>
                </div>
              )}
              {task.attachments > 0 && (
                <div className="flex items-center gap-1">
                  <FileText size={12} />
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