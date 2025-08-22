import React from 'react';
import Sidebar from './_components/Sidebar';

export default function AdminLayout({ children }) {
  return (
    <main className='flex h-screen'>
      <aside className="w-54">
        <Sidebar />
      </aside>
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">{children}</main>
    </main>
  );
}