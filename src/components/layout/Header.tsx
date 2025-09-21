import { Search, Bell, Calendar } from 'lucide-react';
import image from '../../assets/Image.png';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl pl-4 font-semibold text-gray-900">
            Welcome back, Vincent 👋
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Search size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFA048] rounded-full"></span>
          </button>
           <button className="p-2 text-gray-400 hover:text-gray-600">
            <Calendar size={20} />
          </button>
          <span className="text-sm text-gray-500">19 May 2022</span>
          <img 
            src={image.src} 
            alt="Vincent" 
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}