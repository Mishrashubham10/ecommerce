'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  // HANDLING INPUTS
  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5500/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Login failed:', errorData.message || 'Unknown error');
      } else {
        const data = await res.json();
        console.log('Login successful:', data);
      }
    } catch (err) {
      console.log(err.message || 'Error while logging user!');
    }
  };

  return (
    <section className="flex h-screen items-center justify-center bg-[#F1F1F1] text-black">
      {/* ========== LEFT SECTION ========= */}
      <div className="bg-blue-300 p-3 w-xs">
        <h1 className="text-3xl font-bold text-white">Login</h1>
        <p className="mt-3 text-lg font-bold text-[#aaa]">
          Get access to your orders,
        </p>
        <span className="text-lg font-bold text-[#aaa]">
          Wishlist and Recommendation
        </span>
      </div>
      {/* RIGHT SECTION */}
      <div className="shadow-lg rounded-md p-3 w-md">
        <form onSubmit={handleSubmit}>
          {/* ====== EMAIL ======= */}
          <div className="flex flex-col gap-1 p-4">
            <label htmlFor="email" className="text-sm">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email Address"
              required
              name="email"
              value={formData.email}
              onChange={handleInput}
              className="py-1.5 px-3 outline-none bg-transparent border-1 border-[#333 rounded-md"
            />
          </div>
          {/* ======= PASSWORD ======= */}
          <div className="flex flex-col gap-1 p-4">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              type="password"
              placeholder="Ex:*******"
              required
              name="password"
              value={formData.password}
              onChange={handleInput}
              className="py-1.5 px-3 outline-none bg-transparent border-1 border-[#333] rounded-md outline:border-[#333]"
            />
          </div>

          {/* ======== BUTTON ======== */}
          <div className="flex flex-col w-[100%] items-center justify-center p-4">
            <p className='text-xs mb-[3px]'>
            By continuing, you agree to Flipkart's <a className='text-blue-400' href="#">Terms of Use </a>
            and <a className='text-blue-400' href="#">Privacy Policy.</a>
          </p>
            <button className="w-[100%] bg-[#FB641B] py-1.5 px-5 rounded-md shadow-md">
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
