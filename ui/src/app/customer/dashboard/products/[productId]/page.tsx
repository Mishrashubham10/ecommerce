'use client';

import { useEffect, useState } from 'react';
import { getToken } from '../../../../../utils/authToken';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function SingleProductPage() {
  const { productId } = useParams();
  const token = getToken();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5500/api/v1/products/${productId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!res.ok) {
          throw new Error('Can not fetch single product!');
        }

        const data = await res.json();
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
  }, [productId, token]);

  if (loading) return <p>Loading...</p>;
  if (err) return <p>Failed to load product.</p>;
  if (!product) return null;

  return (
    <div className="grid grid-cols-2 py-6 px-4 gap-16 text-black h-[70vh] items-center">
      {/* IMAGE */}
      <div className="relative h-[50%] w=[100%]">
        <Image src={product.images[0]} fill alt='Product Image' className='object-cover' />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">{product.name} Product Name</h1>
        <p>{product.description}</p>
        <p>Price: ₹{product.price}</p>
        {product && (
          <div className="">
            {product.storage?.map(s => (
              <div className="" key={s}>
                {s}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}