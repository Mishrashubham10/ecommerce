import Link from 'next/link';
import React from 'react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <Link 
        href="/admin/products/create" 
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        + Add Product
      </Link>
      {/* Products table here */}
    </div>
  );
}