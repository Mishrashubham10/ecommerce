'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { saveToken } from '../../../utils/authToken';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const router = useRouter();
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Login failed:', errorData.message || 'Unknown error');
        toast.error("Something went wrong!");
      } else {
        const data = await res.json();
        console.log('Login successful:', data);
        toast.success("User logged in successfully");

        // SAVING TOKEN & ROLE INTO LOCALSTORAGE
        saveToken(data?.token);

        if (data?.user?.role === 'Customer') {
          router.push('/customer/dashboard');
        } else if (data?.user?.role === 'Seller') {
          router.push('/seller/dashboard');
        } else {
          router.push('/admin/dashboard');
        }
      }
    } catch (err) {
      console.log(err.message || 'Error while logging user!');
    }
  };

  return (
    <section className="flex items-center justify-center bg-[#F1F1F1] text-black h-[70vh]">
      {/* ========== LEFT SECTION ========= */}
      {/* <div className="shadow-lg rounded-md bg-blue-300 p-3 w-xs h-[50vh]">
        <h1 className="text-3xl font-bold text-white">Login</h1>
        <p className="mt-3 text-lg font-bold text-[#aaa]">
          Get access to your orders,
        </p>
        <span className="text-lg font-bold text-[#aaa]">
          Wishlist and Recommendation
        </span>
      </div> */}
      {/* RIGHT SECTION */}
      <div className="shadow-lg rounded-lg p-3 w-md">
        <form onSubmit={handleSubmit}>
          {/* ====== EMAIL ======= */}
          <div className="flex flex-col gap-1 p-2">
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
          <div className="flex flex-col gap-1 p-2">
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
            <p className="text-xs mb-[3px]">
              By continuing, you agree to Flipkart's{' '}
              <a className="text-blue-400" href="#">
                Terms of Use{' '}
              </a>
              and{' '}
              <a className="text-blue-400" href="#">
                Privacy Policy.
              </a>
            </p>
            <button className="w-[100%] bg-[#FB641B] py-1.5 px-5 rounded-md shadow-md mt-1">
              Login
            </button>

            {/* ========== EXISTING USER BUTTON ========== */}
            <Link
              href="signup"
              className="py-2 w-full bg-white text-blue-500 font-bold text-sm shadow-xl rounded-md text-center mt-1"
            >
              Create an account? SignUp
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}