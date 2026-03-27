import { useState } from 'react';
import { APP_NAME } from '../../config/app';

export function Header() {
  const [imgError, setImgError] = useState(false);

  return (
    <header className="sticky top-0 z-10 bg-[#fafafa]/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-xl mx-auto px-4 h-16 flex items-center gap-3">
        {!imgError ? (
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-9 w-auto object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-9 h-9 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
            {APP_NAME.charAt(0)}
          </div>
        )}
        <h1 className="text-xl font-semibold tracking-tight text-gray-900">{APP_NAME}</h1>
      </div>
    </header>
  );
}

