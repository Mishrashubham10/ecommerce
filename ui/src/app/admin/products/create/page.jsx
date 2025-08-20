'use client';

import { useState } from 'react';
import { getToken } from '../../../../utils/authToken';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function CreateProduct() {
  const router = useRouter();
  const token = getToken();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    stock: '',
    storage: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5500/api/v1/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('Yee Product Created', data);

      if (res.ok) {
        toast.success('✅ Product created successfully!');
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 2000);
      } else {
        toast.error(data?.message || '❌ Something went wrong!');
      }
    } catch (err) {
      toast.error('⚠️ Network error, please try again!');
      console.error('Error creating product:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-2 text-black py-8 px-16"
      onSubmit={handleSubmit}
    >
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-center">
        {/* ======= NAME ========= */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm text-gray-600 font-semibold">
            Name
          </label>
          <input
            type="text"
            placeholder="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="outline-none border-[0.2px] border-gray-500 rounded px-4 py-2"
          />
        </div>
        {/* ======= PRICE ========= */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="price"
            className="text-sm text-gray-600 font-semibold"
          >
            Price
          </label>
          <input
            type="number"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="outline-none border-[0.2px] border-gray-500 rounded px-4 py-2"
          />
        </div>
        {/* ======= CAT ========= */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="category"
            className="text-sm text-gray-600 font-semibold"
          >
            Category
          </label>
          <input
            type="text"
            placeholder="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="outline-none border-[0.2px] border-gray-500 rounded px-4 py-2"
          />
        </div>
        {/* ======= BRAND ========= */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="brand"
            className="text-sm text-gray-600 font-semibold"
          >
            Brand
          </label>
          <input
            type="text"
            placeholder="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="outline-none border-[0.2px] border-gray-500 rounded px-4 py-2"
          />
        </div>
        {/* ======= STOCK ========= */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="stock"
            className="text-sm text-gray-600 font-semibold"
          >
            Stock
          </label>
          <input
            type="number"
            placeholder="Stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="outline-none border-[0.2px] border-gray-500 rounded px-4 py-2"
          />
        </div>
        {/* ======= STORAGE ========= */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="storage"
            className="text-sm text-gray-600 font-semibold"
          >
            Storage
          </label>
          <input
            type="text"
            placeholder="Storage"
            name="storage"
            value={formData.storage}
            onChange={handleChange}
            className="outline-none border-[0.2px] border-gray-500 rounded px-4 py-2"
          />
        </div>
        {/* ======= IMAGES ========= */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="image"
            className="text-sm text-gray-600 font-semibold"
          >
            Image
          </label>
          <input
            type="text"
            placeholder="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="outline-none border-[0.2px] border-gray-500 rounded px-4 py-2"
          />
        </div>
        {/* ======= DESCRIPTION ========= */}
        <div className="flex flex-col gap-1">
          <label
            htmlFor="description"
            className="text-sm text-gray-600 font-semibold"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="outline-none border-[0.2px] border-gray-500 rounded px-4"
          ></textarea>
        </div>
      </section>

      {/* BUTTON */}
      <div className="justify-end mr-4 mt-3 self-right text-right">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded shadow-md font-semibold"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </div>
    </form>
  );
}