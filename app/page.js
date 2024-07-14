// page.js
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-10" style={{ backgroundImage: 'url(https://sheltonfleming.com/wp-content/uploads/2023/04/BLOG-POST-Interview-with-an-AI-featured-image.png)' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-white text-center">
        <h1 className="text-4xl font-bold mb-5">Welcome to AI Mock Interview!</h1>
        <p className="text-lg mb-10 max-w-2xl">
          Prepare for your next job interview with our AI-powered mock interview platform. 
          Practice answering common interview questions and receive feedback to improve your performance.
        </p>
        <Link href="/dashboard">
          <Button className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
