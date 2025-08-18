"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/sellers', label: 'Sellers' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/orders', label: 'Orders' },
  { href: '/admin/analytics', label: 'Analytics' },
  { href: '/admin/settings', label: 'Settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <section className="w-[100%] bg-gray-500/2 py-6 px-4 shadow-lg">
      <h2 className='text-2xl font-bold text-black mb-2'>Admin</h2>
      {/* ========== LINKS =========== */}
      <nav className="flex flex-col gap-4 mt-3 text-gray-600">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className={`px-3 py-1.5 rounded-md shadow-md ${
              pathname === link.href
                ? 'bg-blue-400 font-semibold text-white'
                : 'hover:bg-blue-500 hover:text-white'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}