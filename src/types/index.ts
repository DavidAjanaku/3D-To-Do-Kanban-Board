export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  dueDate: string;
  assignees: string[];
  comments: number;
  views: number;
  attachments: number;
  category: string;
  image?: string; // Optional image field
}

export interface Project {
  id: string;
  name: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}