interface AvatarProps {
  src?: string;
  alt: string;
  className?: string;
}

// Sample profile images 
const profileImages: { [key: string]: string } = {
  'John Doe': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  'Jane Smith': 'https://images.unsplash.com/photo-1494790108755-2616b9da8c3c?w=100&h=100&fit=crop&crop=face',
  'Mike Johnson': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  'Sarah Wilson': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  'Alex Brown': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  'Tom Davis': 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face',
  'Lisa Garcia': 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face'
};

export default function Avatar({ src, alt, className = "" }: AvatarProps) {
  // Use provided src, or look up profile image, or fallback to placeholder
  const imageUrl = src || profileImages[alt] || `https://ui-avatars.com/api/?name=${encodeURIComponent(alt)}&background=e5e7eb&color=6b7280`;

  return (
    <div className={`rounded-full bg-gray-200 flex items-center justify-center overflow-hidden ${className}`}>
      <img 
        src={imageUrl} 
        alt={alt} 
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to initials if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `<span class="text-xs font-medium text-gray-600">${alt.split(' ').map(n => n[0]).join('').toUpperCase()}</span>`;
          }
        }}
      />
    </div>
  );
}