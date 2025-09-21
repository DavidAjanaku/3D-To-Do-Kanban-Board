'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ProgressCube from './ProgressCube';
import { Task } from '@/types';

interface Scene3DProps {
  tasks: Task[];
}

export default function Scene3D({ tasks }: Scene3DProps) {
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const getProgressColor = (progress: number) => {
    if (progress > 75) return "#10b981"; // Green
    if (progress > 50) return "#f59e0b"; // Orange
    return "#ef4444"; // Red
  };

  return (
    <div className="w-full h-32 rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/20 to-blue-900/20">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ProgressCube 
          progress={progress} 
          color={getProgressColor(progress)} 
        />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={true}
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
}