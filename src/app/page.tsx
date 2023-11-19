
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1
        className="text-center text-5xl tracking-tighter font-extrabold gray-800" 
      >
        create cover art for your next album
      </h1>
      <Link
        href="/login?return_url=/prompting"
        className='font-bold text-lg rounded-full bg-blue-500 text-white px-10 py-5 mt-6 transition duration-300 ease-in-out hover:bg-blue-600 mr-6'
      >
        get started 
      </Link> 
    </div>
  );
}