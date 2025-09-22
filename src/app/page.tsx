'use client';
import React, { useState, useEffect, useRef, Suspense } from 'react';
import * as THREE from 'three';
import { TaskProvider } from '@/context/TaskContext';
import { useTheme } from '@/context/ThemeContext';

// Simple 3D Loading Animation Component
function LoadingCube({ time }: { time: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    // Create multiple rotating cubes
    const cubes: THREE.Mesh[] = [];
    const cubeCount = 5;
    
    for (let i = 0; i < cubeCount; i++) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL((i / cubeCount), 0.8, 0.6),
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });
      const cube = new THREE.Mesh(geometry, material);
      
      // Position cubes in a circle
      const angle = (i / cubeCount) * Math.PI * 2;
      cube.position.x = Math.cos(angle) * 3;
      cube.position.z = Math.sin(angle) * 3;
      
      scene.add(cube);
      cubes.push(cube);
    }

    // Add center orb
    const orbGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const orbMaterial = new THREE.MeshBasicMaterial({
      color: 0x4f46e5,
      transparent: true,
      opacity: 0.9
    });
    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    scene.add(orb);

    camera.position.z = 8;

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsed = Date.now() * 0.001;
      
      // Rotate cubes
      cubes.forEach((cube, i) => {
        cube.rotation.x = elapsed + i * 0.5;
        cube.rotation.y = elapsed * 0.8 + i * 0.3;
        
        // Float up and down
        cube.position.y = Math.sin(elapsed * 2 + i) * 0.5;
        
        // Rotate around center
        const angle = (i / cubeCount) * Math.PI * 2 + elapsed * 0.5;
        cube.position.x = Math.cos(angle) * 3;
        cube.position.z = Math.sin(angle) * 3;
      });

      // Rotate center orb
      orb.rotation.x = elapsed * 0.5;
      orb.rotation.y = elapsed * 0.7;
      orb.scale.setScalar(1 + Math.sin(elapsed * 3) * 0.1);

      // Camera orbit
      camera.position.x = Math.cos(elapsed * 0.3) * 8;
      camera.position.z = Math.sin(elapsed * 0.3) * 8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

// 3D Loading Screen Component
function LoadingScreen({ progress }: { progress: number }) {
  const { isDark } = useTheme();
  
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${
      isDark ? 'bg-gray-900' : 'bg-white'
    } transition-opacity duration-500`}>
      {/* 3D Background */}
      <div className="absolute inset-0">
        <LoadingCube time={Date.now()} />
      </div>
      
      {/* Loading Content */}
      <div className="relative z-10 text-center">
        <div className={`text-4xl font-bold mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          TaskFlow 3D
        </div>
        
        <div className={`text-lg mb-6 ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Initializing your workspace...
        </div>
        
        {/* Progress Bar */}
        <div className={`w-64 mx-auto h-2 rounded-full overflow-hidden ${
          isDark ? 'bg-gray-700' : 'bg-gray-200'
        }`}>
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className={`mt-3 text-sm ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {progress}% Complete
        </div>
        
        {/* Loading dots animation */}
        <div className="flex justify-center space-x-1 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                isDark ? 'bg-blue-400' : 'bg-blue-500'
              } animate-pulse`}
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Lazy load the main dashboard components
const Sidebar = React.lazy(() => import('@/components/layout/Sidebar'));
const Header = React.lazy(() => import('@/components/layout/Header'));
const KanbanBoard = React.lazy(() => import('@/components/dashboard/KanbanBoard'));

function AppContent() {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading with progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Wait a bit more after reaching 100% then hide loading
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + (Math.random() * 15 + 5); // Random progress jumps
      });
    }, 150);

    // Ensure loading screen shows for at least 3 seconds
    const minLoadingTime = setTimeout(() => {
      if (loadingProgress >= 100) {
        setIsLoading(false);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(minLoadingTime);
    };
  }, [loadingProgress]);

  if (isLoading) {
    return <LoadingScreen progress={Math.min(loadingProgress, 100)} />;
  }

  return (
    <TaskProvider>
      <div className={`flex h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Suspense fallback={
          <div className={`w-16 ${isDark ? 'bg-gray-900' : 'bg-gray-100'} animate-pulse`} />
        }>
          <Sidebar />
        </Suspense>
        <div className="flex-1 flex flex-col">
          <Suspense fallback={
            <div className={`h-16 ${isDark ? 'bg-gray-800' : 'bg-white'} animate-pulse`} />
          }>
            <Header />
          </Suspense>
          <Suspense fallback={
            <div className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'} animate-pulse flex items-center justify-center`}>
              <div className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Loading dashboard...
              </div>
            </div>
          }>
            <KanbanBoard />
          </Suspense>
        </div>
      </div>
    </TaskProvider>
  );
}

export default function Home() {
  return <AppContent />;
}