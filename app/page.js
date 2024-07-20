import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SplineViewer from '@/components/SplineViewer'; // Adjust the import path as needed
import Image from 'next/image';

export const navItems = [
  { label: "About Us", href: "#" },
  { label: "How it Works", href: "#" },
  { label: "Contact Us", href: "#" },
];

export default function Home({ children }) {
  return (
    <>
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 z-[-2] h-full w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      {/* Navigation */}
      <nav className="relative flex justify-between items-center bg-black text-white p-4">
        {/* Logo */}
        <Image src={'/mock-image.jpg'} width={170} height={100} alt='logo' />

        {/* Navigation Links */}
        <div className="flex-grow">
          <ul className="flex justify-center space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="text-lg font-medium hover:text-gray-300">{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-row items-center  p-8 text-white h-screen">
        {/* Title and Content */}
        <div className="flex-1 max-w-2xl ml-20">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
          <p className="text-lg mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel
            justo auctor, ultricies tellus id, vestibulum lectus.
          </p>
          <Link href="/dashboard" legacyBehavior>
            <Button className="px-6 py-3 text-lg font-medium text-white bg-[#dc4848] rounded-lg hover:bg-[#dc4848]">
              Go to Dashboard
            </Button>
          </Link>
        </div>

        {/* Spline 3D Viewer */}
        <div className="flex-1 mb-40 mr-20">
          <SplineViewer url="https://prod.spline.design/xkMON4nEs3OhaOro/scene.splinecode" />
        </div>
      </section>

      {/* About Us Section */}
      <section className="relative p-8 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel
            justo auctor, ultricies tellus id, vestibulum lectus.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative p-8 bg-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Contact</h2>
          <p className="text-lg">
            You can reach us at contact@example.com or by phone at +123456789.
          </p>
        </div>
      </section>
    </>
  );
}
