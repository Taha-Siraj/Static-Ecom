import React from 'react';

const Loader = () => {
  return (
  <div className="flex flex-col items-center justify-center h-screen gap-4">
  <div className="w-12 h-12 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div>
  <p className="text-green-800 font-semibold animate-pulse">E-Shop is Loading, please wait...</p>
</div>

  );
};

export default Loader;
