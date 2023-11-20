
import Nav from '@/components/Nav';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Nav />
      <div className="min-h-screen flex flex-col justify-center items-center px-6">
        <h1
          className="text-center text-6xl tracking-tighter font-extrabold gray-800"
        >
          create beautiful cover art in minutes.
        </h1>
        <div className="h-6" />
        <h2 className='text-center font-thin text-lg text-gray-300'>
          design, edit, and export cover art for your next project in minutes.
        </h2>
        <div className="h-6" />
        <div className='w-full flex flex-col md:flex-row justify-center'>
          <Link
            href="/login?return_url=/prompting"
            className='w-full md:w-auto text-center text-lg rounded-xl bg-blue-600 text-white px-8 py-3 transition duration-300 ease-in-out hover:bg-blue-600'
          >
            get started
          </Link>
          <div className="h-2 md:w-2" />
          <Link
            href="/login?return_url=/pricing"
            className='w-full md:w-auto text-center text-lg rounded-xl bg-white/10 text-white px-8 py-3 transition duration-300 ease-in-out'
          >
            pricing
          </Link>
        </div>
      </div>
    </>
  );
}