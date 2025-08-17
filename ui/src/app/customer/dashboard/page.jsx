'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Pagination from '../../_components/Pagination';

export default function CustomerDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  // PAGINATION LOGICS
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totatPages, setTotalPages] = useState(1);

  async function fetchProducts(page) {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5500/api/v1/products?page=${page}&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await res.json();
      setProducts(data);
      setPage(data.page);
      setTotalPages(data.pages);
      setLoading(false);
      setErr(false);
    } catch (err) {
      setErr(true);
      console.log('Something went wrong while fetching products', err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleProductClick = (id) => {
    router.push(`/customer/dashboard/products/${id}`);
  };

  // PAGINANTION FUNCTIONS
  function handlePreviousPage() {
    setPage((prev) => Math.max(prev - 1, 1));
  }

  function handleNextPage() {
    setPage((prev) => Math.min(prev + 1, totatPages));
  }

  console.log(page, totatPages, 'Yee got the pages');
  console.log('Yee got the products', products);

  if (loading) {
    return <p>Loading....</p>;
  }

  if (err) {
    return <p>Something went wrong...</p>;
  }

  return (
    <section className="w-full py-6 px-16 text-gray-500">
      <h1 className="text-3xl font-bold md:text-3xl lg:text-4xl">
        Customer Dashboard
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-5 mt-8 gap-16 py-2 px-6">
        {products?.products?.map((prod) => (
          <div
            key={prod._id}
            className="bg-white overflow-hidden transition hover:shadow-lg hover:scale-101 cursor-pointer"
            onClick={() => handleProductClick(prod._id)}
          >
            <Image
              src={prod?.images[0]}
              alt="Product Image"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col">
              <h1 className="text-lg font-semibold text-gray-800 truncate">
                {prod?.name}
              </h1>
              <p className="truncate text-gray-600 mt-1">{prod.description}</p>
              <p className="text-sm text-green-600 mt-2">
                Special Price ₹{prod.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      <hr className="h-[0.2px] text-gray-300" />

      {/* ========= PAGINATION ======== */}
      <div className="flex gap-2 mt-6 justify-end p-4 mr-4">
        <button
          className="px-3 py-1 bg-gray-500 hover:bg-gray-600 disabled:opacity-50 text-black text-sm rounded"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="text-gray-500">
          Page {page} of {totatPages}
        </span>
        <button
          className="px-3 py-1 bg-gray-500 hover:bg-gray-600 disabled:opacity-50 text-black text-sm rounded"
          onClick={handleNextPage}
          disabled={page === totatPages}
        >
          Next
        </button>
      </div>
      {/* <Pagination page={page} totatPages={totatPages} onPageChange={setPage} /> */}
    </section>
  );
}

// FUTURE IMPLEMENTATION :: FOR LEARNING PURPOSE
// import useSWR from "swr";

// const fetcher = (url: string) => fetch(url).then(res => res.json());

// export default function Products() {
//   const { data, error, isLoading } = useSWR(
//     "http://localhost:5500/api/v1/products",
//     fetcher
//   );

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Failed to load products</p>;

//   return (
//     <div>
//       {data.map((p: any) => (
//         <p key={p._id}>{p.name}</p>
//       ))}
//     </div>
//   );
// }