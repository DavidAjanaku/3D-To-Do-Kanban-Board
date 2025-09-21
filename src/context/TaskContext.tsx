'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Task, Project } from '@/types';

interface TaskContextType {
  tasks: Task[];
  projects: Project[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design new ui presentation',
      description: 'Dribbble marketing',
      status: 'todo',
      priority: 'high',
      progress: 7,
      dueDate: '24 Aug 2022',
      assignees: ['John Doe', 'Jane Smith'],
      comments: 7,
      views: 0,
      attachments: 2,
      category: 'Design'
    },
    {
      id: '2',
      title: 'Add more ui/ux mockups',
      description: 'Pinterest promotion',
      status: 'todo',
      priority: 'medium',
      progress: 4,
      dueDate: '25 Aug 2022',
      assignees: ['Mike Johnson', 'Sarah Wilson'],
      comments: 0,
      views: 0,
      attachments: 0,
      category: 'Design'
    },
    {
      id: '3',
      title: 'Design few mobile screens',
      description: 'Dropbox mobile app',
      status: 'todo',
      priority: 'low',
      progress: 3,
      dueDate: '26 Aug 2022',
      assignees: ['Alex Brown'],
      comments: 6,
      views: 0,
      attachments: 4,
      category: 'Mobile'
    },
    {
      id: '4',
      title: 'Create a tweet and promote',
      description: 'Twitter marketing',
      status: 'todo',
      priority: 'high',
      progress: 2,
      dueDate: '27 Aug 2022',
      assignees: ['Tom Davis', 'Lisa Garcia'],
      comments: 0,
      views: 0,
      attachments: 0,
      category: 'Marketing'
    },
    {
      id: '5',
      title: 'Design system update',
      description: 'Oreo website project',
      status: 'progress',
      priority: 'high',
      progress: 3,
      dueDate: '12 Nov 2022',
      assignees: ['John Doe', 'Mike Johnson', 'Sarah Wilson', 'Alex Brown'],
      comments: 0,
      views: 0,
      attachments: 0,
      category: 'Design'
    },
    {
      id: '6',
      title: 'Create brand guideline',
      description: 'Oreo branding project',
      status: 'progress',
      priority: 'medium',
      progress: 7,
      dueDate: '13 Nov 2022',
      assignees: [],
      comments: 2,
      views: 13,
      attachments: 13,
      category: 'Branding'
    },
    {
      id: '7',
      title: 'Create wireframe for ios app',
      description: 'Oreo ios app project',
      status: 'progress',
      priority: 'medium',
      progress: 4,
      dueDate: '14 Nov 2022',
      assignees: ['Alex Brown', 'Tom Davis', 'Lisa Garcia', 'Mike Johnson'],
      comments: 0,
      views: 0,
      attachments: 0,
      category: 'Mobile'
    },
    {
      id: '8',
      title: 'Create ui kit for layout',
      description: 'Crypto mobile app',
      status: 'progress',
      priority: 'low',
      progress: 3,
      dueDate: '15 Nov 2022',
      assignees: [],
      comments: 23,
      views: 12,
      attachments: 12,
      category: 'Design'
    },
    {
      id: '9',
      title: 'Add product to the market',
      description: 'UI8 marketplace',
      status: 'done',
      priority: 'high',
      progress: 10,
      dueDate: '6 Jan 2022',
      assignees: [],
      comments: 1,
      views: 0,
      attachments: 5,
      category: 'Business'
    },
    {
      id: '10',
      title: 'Launch product promotion',
      description: 'Kickstarter campaign',
      status: 'done',
      priority: 'high',
      progress: 10,
      dueDate: '7 Jan 2022',
      assignees: [],
      comments: 17,
      views: 0,
      attachments: 3,
      category: 'Marketing'
    },
    {
      id: '11',
      title: 'Make twitter banner',
      description: 'Twitter marketing',
      status: 'done',
      priority: 'medium',
      progress: 10,
      dueDate: '8 Jan 2022',
      assignees: ['Sarah Wilson', 'Alex Brown', 'Tom Davis', 'Jane Smith'],
      comments: 0,
      views: 0,
      attachments: 0,
      category: 'Marketing'
    }
  ]);

  const [projects] = useState<Project[]>([
    { id: 'design-system', name: 'Design System', color: '#3b82f6' },
    { id: 'user-flow', name: 'User Flow', color: '#10b981' },
    { id: 'ux-research', name: 'UX Research', color: '#f59e0b' }
  ]);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: Date.now().toString() };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, ...updates } : task));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, projects, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}