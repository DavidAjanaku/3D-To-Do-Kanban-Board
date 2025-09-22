import type { Metadata } from 'next';
import { Exo_2 } from 'next/font/google'; // ⬅️ change here
import './globals.css';

// Load Exo 2 instead of Inter
const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // pick the weights you’ll use
});

export const metadata: Metadata = {
  title: '3D Todo Kanban Board',
  description: 'A modern task management app with 3D visualizations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={exo2.className}>{children}</body>
    </html>
  );
}
