'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(false);

  const roles = ['Admin', 'Seller', 'Customer'];

  // HANDLING INPUTS
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // HANDLING FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      console.log('Passwords do not match');
      setError(true);
      return;
    }

    try {
      const res = await fetch('http://localhost:5500/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
      } else {
        console.log("Customer cound'nt registered!");
        setError(true);
      }
    } catch (err) {
      console.log('Error while registering user', err.message);
      setError(true);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen">
      {/* ============= LEFT SECTION ============= */}
      <div className="bg-blue-300 shadow-lg p-4 h-[440px] w-xs">
        <h1 className="text-3xl font-bold text-white">
          Looks like you're new here!
        </h1>
        <p className="mt-3 text-lg font-bold text-[#6E6E6E]">
          Sign up with your personal information to get started
        </p>
      </div>
      {/* ============= RIGHT SECTION ============= */}
      <div className="bg-white shadow-lg p-4 h-auto rounded-r">
        {/* =========== FORM SECTION =========== */}
        <form className="flex flex-col gap-2 text-black" onSubmit={handleSubmit}>
          {/* ========= FIELDS SECTION ======== */}
          <div className="flex flex-col gap-[2px]">
            <label className="text-md text-[#6E6E6E]" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="ex:example@gmail.com"
              onChange={handleInputChange}
              required
              className="py-2 outline-none border-[0.2px] border-[#000] px-2 rounded-md"
            />
          </div>
          {/* ========= FIELDS SECTION ======== */}
          <div className="flex flex-col gap-[2px]">
            <label className="text-md text-[#6E6E6E]" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="ex:example@gmail.com"
              onChange={handleInputChange}
              required
              className="py-2 outline-none border-[0.2px] border-[#000] px-2 rounded-md"
            />
          </div>
          {/* ========= FIELDS SECTION ======== */}
          <div className="flex flex-col gap-[2px]">
            <label className="text-md text-[#6E6E6E]" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="py-2 outline-none border-[0.2px] border-[#000] px-2 rounded-md"
            />
          </div>
          {/* ========= FIELDS SECTION ======== */}
          <div className="flex flex-col gap-[2px]">
            <label className="text-md text-[#6E6E6E]" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="py-2 outline-none border-[0.2px] border-[#000] px-2 rounded-md"
            />
          </div>

          {/* ============ BUTTON ============ */}
          <div className="flex flex-col w-[100%] items-center justify-center mt-1.5">
            <p className="text-xs mb-[3px] text-[#6E6E6E]">
              By continuing, you agree to Flipkart's{' '}
              <a className="text-blue-400" href="#">
                Terms of Use{' '}
              </a>
              and{' '}
              <a className="text-blue-400" href="#">
                Privacy Policy.
              </a>
            </p>
            <button className="w-[100%] bg-[#FB641B] py-1.5 px-5 rounded-md shadow-md">
              Continue
            </button>
          </div>

          {/* ========== EXISTING USER BUTTON ========== */}
          <Link
            href="login"
            className="py-2 w-full bg-white text-blue-500 font-bold text-sm shadow-xl rounded-md text-center mt-[3px]"
          >
            Existing User? Login
          </Link>
        </form>
      </div>
    </section>
  );
}