import React from "react";

const NotFound: React.FC = () => {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Sayfa Bulunamadı</h2>
      <p className="mt-2 text-gray-600">Aradığınız sayfa mevcut değil.</p>
      <button
        onClick={handleGoHome}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        Ana Sayfaya Dön
      </button>
    </div>
  );
};

export default NotFound;
