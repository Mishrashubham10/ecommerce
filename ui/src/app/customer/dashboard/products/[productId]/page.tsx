'use client';

import { useEffect, useState } from 'react';
import { getToken } from '../../../../../utils/authToken';
import { useParams } from 'next/navigation';

export default function SingleProductPage() {
  const { productId } = useParams();
  const token = getToken();

  console.log("Yee got the id", productId);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5500/api/v1/products/${productId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Can not fetch single product!');
        }

        const data = await res.json();
        console.log("Yee got the single product", data);
        setProduct(data);
        setErr(false);
      } catch (error) {
        setErr(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (err) return <p>Failed to load product.</p>;
  if (!product) return null;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{product.name} Product Name</h1>
      <p>{product.description}</p>
      <p>Price: ₹{product.price}</p>
    </div>
  );
}