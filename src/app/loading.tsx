export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-r-transparent"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
} 