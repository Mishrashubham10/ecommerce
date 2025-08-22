'use client';

import Image from 'next/image';
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
    <section className="w-[100%] sticky top-0 py-6 px-4 h-max bg-gray-200/30 shadow-md flex flex-col p-4">
      <div className="flex flex-col items-start gap-2">
        <Image
          src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/cow-csa-images.jpg"
          alt="Profile Image"
          width={75}
          height={75}
          className="object-cover rounded-full border-[0.1px] border-gray-400 shadow-md"
        />
        <h2 className="text-2xl font-bold text-black mb-2">Admin</h2>
      </div>
      {/* ========== LINKS =========== */}
      <nav className="flex flex-col gap-4 mt-6 text-gray-600">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className={`px-3 py-1.5 rounded-md shadow-md ${
              pathname === link.href
                ? 'bg-blue-500 font-semibold text-white'
                : 'hover:bg-blue-400 hover:text-white'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}
