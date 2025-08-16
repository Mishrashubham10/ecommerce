'use client';

import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function GlobalSearch() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState({ products: [], categories: [] });
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchResults = debounce(async (query) => {
    if (!query) {
      setResults({ products: [], categories: [] });
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5500/api/v1/search?query=${query}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await res.json();
      console.log('Yee got the global search', data);
      setResults(data);
      setShowDropdown(true);
    } catch (err) {
      console.error('Search error:', err);
    }
  });

  useEffect(() => {
    fetchResults(input);
  }, [input]);

  const handleSelect = (item) => {
    setInput('');
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <input
        type="text"
        className="w-full border-none outline-none placeholder:text-gray-400 text-gray-700 font-medium font-sm"
        placeholder="Search for products, categories..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => input && setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // allow click before hiding
      />

      {showDropdown && (results.products || results.categories) && (
        <div className="absolute bg-white border w-full z-50 mt-1 rounded shadow text-gray-600 flex flex-col">
          {results.categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => handleSelect(cat)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              📂 {cat.name}
            </div>
          ))}

          {results.products.map((product) => (
            <Link
              key={product._id}
              href={`/customer/dashboard/products/${product._id}`}
              onClick={() => handleSelect(product)}
              className="p-2 hover:bg-gray-100 cursor-pointer border-b-[0.1px] border-gray-400"
            >
              🛒 {product.name}
            </Link>
          ))}
          {/* ========= TRENDING ============ */}
          <div className="flex flex-col py-1 px-2">
            <h5 className='text-md text-gray-300 font-bold'>Trending</h5>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center hover:bg-gray-100 py-1">
                <Search className="text-gray-400 font-medium" />
                <p className='text-md text-gray-600'>mobiles</p>
              </div>
              <div className="flex gap-4 items-center hover:bg-gray-100 py-1">
                <Search className="text-gray-400 font-medium" />
                <p className='text-md text-gray-600'>shoes</p>
              </div>
              <div className="flex gap-4 items-center hover:bg-gray-100 py-1">
                <Search className="text-gray-400 font-medium" />
                <p className='text-md text-gray-600'>t-shirts</p>
              </div>
              <div className="flex gap-4 items-center hover:bg-gray-100 py-1">
                <Search className="text-gray-400 font-medium" />
                <p className='text-md text-gray-600'>laptops</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}