'use client';

import { getToken } from '../../../../utils/authToken';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

import ProductsGrid from '../../../_components/ProductsGrid';
import NoProductFound from '../_components/NoProductFound';

export default function ProductsPage() {
  const token = getToken();

  const [products, setProducts] = useState([]);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  // USE EFFECT TO FETCH PRODUCTS
  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      const res = await fetch('http://localhost:5500/api/v1/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setErr(true);
        throw new Error('Failed to fetch products');
      }

      const data = await res.json();
      console.log(data.products, "Yee this is the product")
      setLoading(false);
      setErr(false);
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  console.log(products);

  if (err)
    <p className="text-4xl text-red-400 text-center flex items-center justify-center">
      Something Went Wrong...
    </p>;

  if (loading)
    <p className="text-4xl text-red-400 text-center flex items-center justify-center">
      Loading...
    </p>;

  return (
    <section className="p-8">
      <h1 className="font-bold text-2xl lg:text-4xl">Products Page</h1>
      {products ? <ProductsGrid products={products} /> : <NoProductFound />}
    </section>
  );
}