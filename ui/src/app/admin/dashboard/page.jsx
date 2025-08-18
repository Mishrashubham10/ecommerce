import Link from 'next/link';
import React from 'react';
import Sidebar from '../_components/Sidebar';

export default function AdminDashboard() {
  return (
    <main>
      {/* <Sidebar /> */}
      <section className="flex items-center justify-between w-[100%] px-8 py-2">
        <h1 className="text-2xl mb-4 text-gray-500 font-semibold">Products</h1>
        <Link
          href="/admin/products/create"
          className="px-4 py-2 bg-blue-500 text-white font-semibold text-md rounded hover:bg-blue-600"
        >
          + Add Product
        </Link>
      </section>
      {/* =========== CARD AND THEIR LINKS ========== */}
    </main>
  );
}