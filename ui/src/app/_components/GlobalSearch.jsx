'use client';

import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import Link from 'next/link';
import { Search } from 'lucide-react';
import ProductsGrid from "./ProductsGrid";

export default function GlobalSearch() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState({ products: [], categories: [] });
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const storedSearch =
      JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(storedSearch);
  }, []);

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

    if (value.trim() && !searchHistory.includes(value)) {
      const updatedHistory = [value, ...searchHistory].slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    }
  };

  console.log(results.categories, "From global search!");

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <input
        type="text"
        className="w-full border-none outline-none placeholder:text-gray-400 text-gray-700 font-medium font-sm"
        placeholder="Search for products, categories..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // allow click
      />

      {showDropdown && (
        <div className="absolute bg-white border w-full z-50 mt-1 rounded shadow text-gray-600 flex flex-col">
          {/* ✅ Search History */}
          {searchHistory.length > 0 && !input && (
            <div className="p-2 border-b">
              <h5 className="text-sm text-gray-400 font-semibold">
                Recent Searches
              </h5>
              {searchHistory.map((term, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelect(term)}
                  className="flex gap-2 items-center cursor-pointer hover:bg-gray-100 py-1"
                >
                  <Search size={14} className="text-gray-400" />
                  <p className="text-gray-600">{term}</p>
                </div>
              ))}
            </div>
          )}

          {/* Categories */}
          {results.categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => handleSelect(cat)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              📂 {cat.name}
            </div>
          ))}

          {/* Products */}
          {results.products.map((product) => (
            <Link
              key={product._id}
              href={`/customer/dashboard/products/${product._id}`}
              onClick={() => handleSelect(product)}
              className="p-2 hover:bg-gray-100 cursor-pointer border-b-[0.1px] border-gray-200"
            >
              🛒 {product.name}
            </Link>
          ))}

          {/* ========= TRENDING ============ */}
          <div className="flex flex-col py-1 px-2">
            <h5 className="text-md text-gray-300 font-bold">Trending</h5>
            {['mobiles', 'shoes', 't-shirts', 'laptops'].map((item) => (
              <div
                key={item}
                onClick={() => handleSelect(item)}
                className="flex gap-4 items-center hover:bg-gray-100 py-1 cursor-pointer"
              >
                <Search className="text-gray-400 font-medium" />
                <p className="text-md text-gray-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}