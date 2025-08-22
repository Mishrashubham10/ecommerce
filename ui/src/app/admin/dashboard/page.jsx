import Link from 'next/link';
import React from 'react';

export default function AdminDashboard() {
  return (
    <main className="px-3 py-2">
      {/* <Sidebar /> */}
      <section className="flex items-center justify-between w-[100%]">
        <h1 className="text-2xl mb-4 text-gray-500 font-semibold">
          Admin Dashboard
        </h1>
        <Link
          href="/admin/products/create"
          className="px-4 py-2 bg-blue-500 text-white font-semibold text-md rounded hover:bg-blue-600"
        >
          + Add Product
        </Link>
      </section>
      {/* =========== CARD AND THEIR LINKS ========== */}
      {/* ========== CARDS =========== */}
      <div className="grid grid-cols-1 md:grid-cols-4 text-black mt-6 gap-3">
        <div className="bg-gray-700/30 py-4 px-3 rounded-md border-[0.5px] border-gray-300 shadow-lg">
          <h1>Products Card</h1>
        </div>
        <div className="bg-gray-700/30 py-4 px-3 rounded-md border-[0.5px] border-gray-300 shadow-lg">
          <h1>Analytics</h1>
        </div>
        <div className="bg-gray-700/30 py-4 px-3 rounded-md border-[0.5px] border-gray-300 shadow-lg">
          USERS
        </div>
        <div className="bg-gray-700/30 py-4 px-3 rounded-md border-[0.5px] border-gray-300 shadow-lg">
          <h1>Orders</h1>
        </div>
      </div>
    </main>
  );
}