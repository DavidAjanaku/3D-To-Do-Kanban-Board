'use client';
import { useState } from 'react';
import {
  Plus,
  Target,
  User,
  Lightbulb,
  BarChart3,
  Calendar,
  FileText,
  Settings,
  ChevronRight,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react';

export default function Sidebar() {
  const [activeProject, setActiveProject] = useState('design-system');
  const [projectsExpanded, setProjectsExpanded] = useState(true);
  const [tasksExpanded, setTasksExpanded] = useState(true);
  const [isDark, setIsDark] = useState(true);

  const projects = [
    { id: 'design-system', name: 'Design system' },
    { id: 'user-flow', name: 'User flow' },
    { id: 'ux-research', name: 'Ux research' }
  ];

  const navigation = [
    { icon: BarChart3, label: 'Dashboard' },
    { icon: User, label: 'Team' },
    { icon: Target, label: 'Projects', active: true },
    { icon: Calendar, label: 'Calendar' },
    { icon: FileText, label: 'Documents' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Settings, label: 'Settings' }
  ];

  const taskCounts = [
    { label: 'All tasks', count: 11 },
    { label: 'To do', count: 4 },
    { label: 'In progress', count: 4 },
    { label: 'Done', count: 3 }
  ];

  return (
    <div className="flex">
      <div className="bg-[#1C1D22] w-16 h-screen fixed left-0 top-0 flex flex-col items-center py-4 space-y-4 z-10">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mb-4">
          <div className="w-4 h-4 bg-gray-900 rounded-sm"></div>
        </div>

        <div className="flex flex-col space-y-4 flex-1">
          {navigation.map(({ icon: Icon, label, active }, index) => (
            <button
              key={label}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                active ? 'bg-gray-800' : 'hover:bg-gray-800'
              }`}
              title={label}
            >
              <Icon size={20} className="text-gray-400" />
            </button>
          ))}
        </div>

        <div className="bg-gray-800 rounded-full p-1 flex">
          <button
            onClick={() => setIsDark(false)}
            className={`p-2 rounded-full transition-colors ${
              !isDark ? 'bg-white text-gray-900' : 'text-gray-400'
            }`}
          >
            <Sun size={16} />
          </button>
          <button
            onClick={() => setIsDark(true)}
            className={`p-2 rounded-full transition-colors ${
              isDark ? 'bg-gray-600 text-white' : 'text-gray-400'
            }`}
          >
            <Moon size={16} />
          </button>
        </div>
      </div>

      <div className="bg-white w-72 h-screen fixed left-16 top-0 border-r border-gray-200 flex flex-col z-10">
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50">
              <Plus size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-900 font-medium">Team</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>

            <div>
              <button
                onClick={() => setProjectsExpanded(!projectsExpanded)}
                className="flex items-center justify-between w-full py-2 mb-3"
              >
                <span className="text-gray-900 font-medium">Projects</span>
                {projectsExpanded ? (
                  <ChevronDown size={16} className="text-gray-400" />
                ) : (
                  <ChevronRight size={16} className="text-gray-400" />
                )}
              </button>

              {projectsExpanded && (
                <div className="space-y-1 ml-4">
                  <div className="text-gray-500 text-sm py-1">
                    All projects (3)
                  </div>
                  {projects.map(({ id, name }) => (
                    <button
                      key={id}
                      onClick={() => setActiveProject(id)}
                      className={`w-full text-left py-2 px-3 rounded-lg text-sm transition-colors ${
                        activeProject === id 
                          ? 'bg-gray-100 text-gray-900 font-medium' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setTasksExpanded(!tasksExpanded)}
                className="flex items-center justify-between w-full py-2 mb-3"
              >
                <span className="text-gray-900 font-medium">Tasks</span>
                {tasksExpanded ? (
                  <ChevronDown size={16} className="text-gray-400" />
                ) : (
                  <ChevronRight size={16} className="text-gray-400" />
                )}
              </button>

              {tasksExpanded && (
                <div className="space-y-1 ml-4">
                  {taskCounts.map(({ label, count }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <span>{label}</span>
                      <span className="text-gray-400">({count})</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-gray-900 font-medium">Reminders</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-gray-900 font-medium">Messengers</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex-shrink-0">
          <div className="bg-gray-100 rounded-full p-1 flex">
            <button
              onClick={() => setIsDark(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                !isDark ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              <Sun size={16} />
              Light
            </button>
            <button
              onClick={() => setIsDark(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                isDark ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              <Moon size={16} />
              Dark
            </button>
          </div>
        </div>
      </div>

      <div className="w-[330px]"></div>
    </div>
  );
}