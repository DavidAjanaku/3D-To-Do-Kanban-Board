import { Search } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import avatar from '../../../public/assets/Image.png';
import notifications from '../../../public/assets/Notifications.png';
import calendar from '../../../public/assets/Calender.png';
import search from '../../../public/assets/Search.png';

export default function Header() {
  const { isDark } = useTheme();

  return (
    <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <h1 className={`text-xl pl-4 font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Welcome back, Vincent 👋
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button className={`p-1 cursor-pointer transition-colors ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}>
            <Image
              src={search}
              alt="Search"
              width={20}
              height={20}
              className={isDark ? 'filter invert opacity-60 hover:opacity-80' : ''}
            />
          </button>
          
          <button className={`p-1 transition-colors cursor-pointer relative ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}>
            <Image
              src={notifications}
              alt="Notifications"
              width={20}
              height={20}
              className={isDark ? 'filter invert opacity-60 hover:opacity-80' : ''}
            />
          </button>
          
          <button className={`p-1 cursor-pointer transition-colors ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}>
            <Image
              src={calendar}
              alt="Calendar"
              width={20}
              height={20}
              className={isDark ? 'filter invert opacity-60 hover:opacity-80' : ''}
            />
          </button>
          
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>19 May 2022</span>
          
          <Image
            src={avatar}
            alt="Vincent"
            width={32}
            height={32}
            className="rounded-full cursor-pointer object-cover"
          />
        </div>
      </div>
    </header>
  );
}