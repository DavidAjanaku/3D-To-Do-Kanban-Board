'use client';
import { useState } from 'react';
import Image from 'next/image';
import {
  Plus,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

// Import your custom images
import personIcon from '../../../public/assets/person.png';
import appIcon from '../../../public/assets/app.png';
import mapIcon from '../../../public/assets/map.png';
import logoIcon from '../../../public/assets/Logo.png';
import downloadIcon from '../../../public/assets/download.png';
import statsIcon from '../../../public/assets/stats.png';
import toolsIcon from '../../../public/assets/tool.png';
import calenderIcon from '../../../public/assets/Calenders.png';


export default function Sidebar() {
  const [activeProject, setActiveProject] = useState('design-system');
  const [projectsExpanded, setProjectsExpanded] = useState(true);
  const [tasksExpanded, setTasksExpanded] = useState(true);
  const { isDark, setTheme } = useTheme();

  const projects = [
    { id: 'design-system', name: 'Design system' },
    { id: 'user-flow', name: 'User flow' },
    { id: 'ux-research', name: 'Ux research' }
  ];

  const navigation = [
    { icon: appIcon, label: 'Projects', active: true },
    { icon: personIcon, label: 'Team' },
    { icon: calenderIcon, label: 'Analytics' },
    { icon: statsIcon, label: 'Dashboard' },
    { icon: downloadIcon, label: 'Documents' },
    { icon: mapIcon, label: 'Calendar' },
    { icon: toolsIcon, label: 'Settings' }
  ];

  const taskCounts = [
    { label: 'All tasks', count: 11 },
    { label: 'To do', count: 4 },
    { label: 'In progress', count: 4 },
    { label: 'Done', count: 3 }
  ];

  return (
    <div className="flex">
      {/* Left Icon Sidebar */}
      <div className={`${isDark ? 'bg-gray-900' : 'bg-[#1C1D22]'} w-16 h-screen fixed left-0 top-0 flex flex-col items-center py-4 space-y-4 z-20`}>
        <div className="w-8 h-8  rounded-lg flex items-center justify-center mb-4">
          <Image 
            src={logoIcon} 
            alt="Logo" 
            width={20} 
            height={20} 
            className="rounded-sm"
          />
        </div>

        <div className="flex flex-col space-y-4 flex-1">
          {navigation.map(({ icon, label, active }, index) => (
            <button
              key={label}
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                active 
                  ? (isDark ? 'bg-gray-700' : 'bg-gray-800') 
                  : (isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-800')
              }`}
              title={label}
            >
              <Image 
                src={icon} 
                alt={label} 
                width={20} 
                height={20} 
                className={`${isDark ? 'opacity-70' : 'opacity-60'} transition-opacity hover:opacity-100`}
              />
            </button>
          ))}
        </div>

        <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-800'} rounded-full p-1 flex`}>
          <button
            onClick={() => setTheme(false)}
            className={`p-2 rounded-full transition-colors ${
              !isDark ? 'bg-white text-gray-900' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {/* You can replace these with sun/moon images if you have them */}
            <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
          </button>
          <button
            onClick={() => setTheme(true)}
            className={`p-2 rounded-full transition-colors ${
              isDark ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {/* You can replace these with sun/moon images if you have them */}
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          </button>
        </div>
      </div>

      {/* Main Sidebar - Hidden on mobile, visible on large screens */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} w-72 h-screen fixed left-16 top-0 border-r flex-col z-10 hidden lg:flex`}>
        <div className={`p-6 ${isDark ? 'border-gray-700' : 'border-gray-200'} border-b flex-shrink-0`}>
          <div className="flex items-center justify-between">
            <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Projects</h1>
            <button className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-colors ${
              isDark 
                ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
                : 'border-gray-200 hover:bg-gray-50 text-gray-600'
            }`}>
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between py-2">
              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Team</span>
              <ChevronRight size={16} className={isDark ? 'text-gray-400' : 'text-gray-400'} />
            </div>

            <div>
              <button
                onClick={() => setProjectsExpanded(!projectsExpanded)}
                className="flex items-center justify-between w-full py-2 mb-3"
              >
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Projects</span>
                {projectsExpanded ? (
                  <ChevronDown size={16} className={isDark ? 'text-gray-400' : 'text-gray-400'} />
                ) : (
                  <ChevronRight size={16} className={isDark ? 'text-gray-400' : 'text-gray-400'} />
                )}
              </button>

              {projectsExpanded && (
                <div className="relative ml-4">
                  {/* Vertical line */}
                  <div className={`absolute left-0 top-0 bottom-0 w-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                  
                  <div className="space-y-1">
                    <div className={`relative text-sm py-1 pl-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {/* Horizontal connecting line */}
                      <div className={`absolute left-0 top-1/2 w-3 h-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                      All projects (3)
                    </div>
                    {projects.map(({ id, name }) => (
                      <div key={id} className="relative">
                        {/* Horizontal connecting line */}
                        <div className={`absolute left-0 top-1/2 w-3 h-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                        <button
                          onClick={() => setActiveProject(id)}
                          className={`w-full text-left py-2 pl-4 pr-3 ml-3 rounded-lg text-sm transition-colors ${
                            activeProject === id 
                              ? (isDark ? 'bg-gray-700 text-white font-medium' : 'bg-gray-100 text-gray-900 font-medium')
                              : (isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900')
                          }`}
                        >
                          {name}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setTasksExpanded(!tasksExpanded)}
                className="flex items-center justify-between w-full py-2 mb-3"
              >
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Tasks</span>
                {tasksExpanded ? (
                  <ChevronDown size={16} className={isDark ? 'text-gray-400' : 'text-gray-400'} />
                ) : (
                  <ChevronRight size={16} className={isDark ? 'text-gray-400' : 'text-gray-400'} />
                )}
              </button>

              {tasksExpanded && (
                <div className="relative ml-4">
                  {/* Vertical line */}
                  <div className={`absolute left-0 top-0 bottom-0 w-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                  
                  <div className="space-y-1">
                    {taskCounts.map(({ label, count }) => (
                      <div
                        key={label}
                        className="relative"
                      >
                        {/* Horizontal connecting line */}
                        <div className={`absolute left-0 top-1/2 w-3 h-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                        <div className={`flex items-center justify-between py-2 pl-1 pr-3 ml-3 text-sm rounded-lg cursor-pointer transition-colors ${
                          isDark 
                            ? 'text-gray-300 hover:bg-gray-700' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}>
                          <span>{label}</span>
                          <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>({count})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between py-2">
              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Reminders</span>
              <ChevronRight size={16} className={isDark ? 'text-gray-400' : 'text-gray-400'} />
            </div>

            <div className="flex items-center justify-between py-2">
              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Messengers</span>
              <ChevronRight size={16} className={isDark ? 'text-gray-400' : 'text-gray-400'} />
            </div>
          </div>
        </div>

        <div className={`p-6 ${isDark ? 'border-gray-700' : 'border-gray-200'} border-t flex-shrink-0`}>
          <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-full p-1 flex`}>
            <button
              onClick={() => setTheme(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                !isDark 
                  ? (isDark ? 'bg-gray-600 text-white shadow-sm' : 'bg-white text-gray-900 shadow-sm')
                  : (isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
              }`}
            >
              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
              Light
            </button>
            <button
              onClick={() => setTheme(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                isDark 
                  ? (isDark ? 'bg-gray-600 text-white shadow-sm' : 'bg-white text-gray-900 shadow-sm')
                  : (isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900')
              }`}
            >
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              Dark
            </button>
          </div>
        </div>
      </div>

      <div className="w-[330px]"></div>
    </div>
  );
}