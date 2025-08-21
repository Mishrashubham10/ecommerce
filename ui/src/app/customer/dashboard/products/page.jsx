'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getToken } from '../../../../utils/authToken';
import NoProductFound from '../_components/NoProductFound';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const router = useRouter();
  const token = getToken();

  const [products, setProducts] = useState([]);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (page) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_KEY}/products?page=${page}&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error('Failed to fetch products');

      const data = await res.json();
      setProducts(data?.products);
      setTotalPages(data?.pages || 1);
      setErr(false);
    } catch (error) {
      setErr(true);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleProductClick = (id) => {
    router.push(`/customer/dashboard/products/${id}`);
  };

  return (
    <section className="p-8">
      {err ? (
        <p className="text-4xl text-red-400 text-center">
          Something went wrong...
        </p>
      ) : loading ? (
        <p className="text-4xl text-blue-400 text-center">Loading...</p>
      ) : products.length > 0 ? (
        <>
          <section className="grid mt-3 grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5 bg-white">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white overflow-hidden transition hover:shadow-lg hover:scale-101 cursor-pointer"
                onClick={() => handleProductClick(product._id)}
              >
                <Image
                  src={product?.images[0]}
                  alt="Product Image"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col">
                  <h1 className="text-lg font-semibold text-gray-800 truncate">
                    {product?.name}
                  </h1>
                  <p className="truncate text-gray-600 mt-1">
                    {product.description}
                  </p>
                  <p className="text-sm text-green-600 mt-2">
                    Special Price ₹{product.price}
                  </p>
                </div>
              </div>
            ))}
          </section>

          {/* Pagination Controls */}
          <div className="flex justify-end items-center gap-2 p-4 border-t text-sm mt-6 mr-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-500 hover:bg-gray-600 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-gray-500">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-500 hover:bg-gray-600 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <NoProductFound />
      )}
    </section>
  );
}
