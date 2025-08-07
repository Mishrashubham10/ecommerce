import Image from 'next/image';

export default function ProductsGrid({ products }) {
  return (
    <>
      <section className="grid mt-3 grid-cols-1 py-4 gap-4 md:grid-cols-3 lg:grid-cols-5 bg-white">
        {/* =========== PRODUCT ============= */}
        {products.map((product) => (
          <div
          key={product._id}
            className="mt-4 bg-white overflow-hidden transition duration-300 ease-in-out hover:shadow-lg hover:scale-101 cursor-pointer"
          >
            <Image
              src={product?.images[0]}
              alt="Product Image"
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            {/* ======== PRODUCT DETAILS ========== */}
            <div className="p-4 flex flex-col">
              <h1 className="text-lg font-semibold text-gray-800 truncate w-[100%]">
                {product?.name}
              </h1>
              <p className="truncate w-[100%] text-gray-600 mt-1">
                {product.description}
              </p>
              <p className="text-sm text-green-600 mt-2">
                Special Price {product.price}
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
