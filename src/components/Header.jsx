import React from 'react';
import { Plane, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <div className="text-center py-8">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Plane className="w-10 h-10 text-blue-600" />
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
          Travel AI
        </h1>
        <Sparkles className="w-10 h-10 text-teal-600" />
      </div>
      <p className="text-gray-600">AI-powered trip planning within your budget</p>
    </div>
  );
}