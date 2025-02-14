"use client";

import React from 'react';
import { HomeIcon, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-8xl font-bold text-gray-900 mb-4">
          4<span className="text-green-500">0</span>4
        </h1>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 mb-8">
          Oops! The page you're looking for seems to have wandered off.
          Let's help you find your way back.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            <HomeIcon className="w-5 h-5" />
            <span>Go Home</span>
          </a>
        </div>
      </div>
    </main>
  );
}
