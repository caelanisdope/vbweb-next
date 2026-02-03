import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { APP_CONFIG } from '@/lib/constants';
import { Header } from '@/components/layout/Header';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: APP_CONFIG.name,
  description: APP_CONFIG.description,
  keywords: ['排球', '女排', '意大利联赛', '庄宇珊', '朱婷', 'Serie A1'],
  authors: [{ name: 'VB Stats Team' }],
  openGraph: {
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    type: 'website',
    locale: 'zh_CN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-apple-gray-50 via-white to-apple-gray-50">
          {children}
        </main>
        <footer className="py-8 text-center text-sm text-apple-gray-500 border-t border-apple-gray-200">
          <p>
            {APP_CONFIG.name} v{APP_CONFIG.version}
          </p>
          <p className="mt-2">Made with ❤️ for Volleyball Fans</p>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
