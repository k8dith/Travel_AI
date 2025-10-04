import React from 'react';
import Header from './components/Header';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="max-w-4xl mx-auto">
        <Header />
        <p className="text-center text-gray-600 text-xl">Coming soon...</p>
      </div>
    </div>
  );
}