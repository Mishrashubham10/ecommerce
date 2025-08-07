'use client';

import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

export default function GlobalSearch() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState({ products: [], categories: [] });
  const [showDropdown, setShowDropdown] = useState(false);

  console.log("Yee got the input", input)

  const fetchResults = debounce(async (query) => {
    if (!query) {
      setResults({ products: [], categories: [] });
      return;
    }

    try {
      const res = await fetch(`http://localhost:5500/api/v1/search?query=${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
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
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        className="w-full border-none outline-none placeholder:text-gray-400 text-gray-700 font-medium font-sm"
        placeholder="Search for products, categories..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => input && setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // allow click before hiding
      />

      {showDropdown &&
        (results.products || results.categories) && (
          <div className="absolute bg-white border w-full z-50 mt-1 rounded shadow">
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
              <div
                key={product._id}
                onClick={() => handleSelect(product)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                🛒 {product.name}
              </div>
            ))}
          </div>
        )}
    </div>
  );
}