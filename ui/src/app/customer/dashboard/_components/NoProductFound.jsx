import Link from 'next/link';

export default function NoProductFound() {
  return (
    <div className="mt-32 text-center text-balance">
      <h1 className="text-4xl font-semibold mb-2">You have no products</h1>
      <p className="mb-4">
        Get started with ShubhKart
      </p>
      <button size="lg" className='py-1.5 border-[0.2px]'>
        <Link href="/auth/signup">Register</Link>
      </button>
    </div>
  );
}