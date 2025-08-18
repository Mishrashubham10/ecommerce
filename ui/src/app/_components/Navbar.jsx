'use client';

import { Search } from 'lucide-react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getToken, removeToken } from '../../utils/authToken';
import GlobalSearch from './GlobalSearch';
import { toast } from 'react-toastify';

export default function Navbar() {
  const router = useRouter();
  const isOpen = false;
  const token = getToken();

  const isLoggedInUser = typeof window !== 'undefined' ? token : null;
  console.log(isLoggedInUser, "Yee got the loggedInUser");

  // LOGGING OUT USER
  const handleLogoutClick = async () => {
    // try {
    //   const res = await fetch('http://localhost:5500/auth/logout', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
  
    //   if (res.ok) {
    //     console.log('User logged out successfully!');
    //     removeToken();
    //     router.push('/login');
    //     toast.success("User logged out successfully!");
    //   }
    // } catch (error) {
    //   toast.error("Something went wrong");
    // }
    removeToken();
  };

  return (
    <nav className="w-full h-[4rem] bg-blue-600">
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-4">
        {/* ======= FIRST SECTION ========= */}
        <section className="flex items-center gap-4">
          <div className="flex flex-col gap-[1px] text-white">
            <h1 className="text-md font-bold italic">ShubhKart</h1>
            <p className="text-xs font-bold text-white">Explore plus ✨</p>
          </div>

          {/* ============ GLOBAL SEARCH INPUT ============ */}
          <div className="flex items-center gap-2 bg-white px-3 h-[2.6rem] w-lg rounded">
            <GlobalSearch />
            <Search className="text-blue-600 font-bold" />
          </div>

          {isLoggedInUser ? (
            <button
              className="text-md py-1 bg-white h-auto px-9 cursor-pointer text-blue-500 font-bold"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="text-md py-1 bg-white h-auto px-9 cursor-pointer text-blue-500 font-bold"
            >
              Login
            </Link>
          )}
        </section>

        {/* ======= SECOND SECTION ========= */}
        <ul className="flex items-center gap-8 text-white">
          <Link href="/" className="text-md font-bold">
            Become a Seller
          </Link>

          <li className="flex items-center cursor-pointer text-md font-bold">
            More
            {isOpen ? (
              <ChevronUp className="size-4 ml-1" />
            ) : (
              <ChevronDown className="size-4 ml-1" />
            )}
          </li>

          <li className="flex items-center cursor-pointer text-md font-bold gap-1">
            <ShoppingCart className="size-4 mr-1" />
            Cart
          </li>
        </ul>
      </div>
    </nav>
  );
}