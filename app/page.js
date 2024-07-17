// page.js
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-10" style={{ backgroundImage: 'url(https://sheltonfleming.com/wp-content/uploads/2023/04/BLOG-POST-Interview-with-an-AI-featured-image.png)' }}>
      <div className="absolute inset-0 bg-black opacity-75"></div>
      <div className="relative z-10 text-white text-center">
      <h1 className="text-4xl md:text-6xl font-semibold mb-5">
  Welcome to <span className='text-[#ba4040]'>MockXpert</span>
</h1>

        <p className="text-lg mb-10 max-w-2xl">
          Prepare for your next job interview with our AI-powered mock interview platform. 
          Practice answering common interview questions and receive feedback to improve your performance.
        </p>
        <Link href="/dashboard">
          <Button className="px-6 py-3 text-lg font-medium text-white bg-[#ba4040] rounded-lg hover:bg-[#ba4040]">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
