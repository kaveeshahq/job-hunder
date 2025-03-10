export default function Loader() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-white bg-opacity-95 backdrop-blur-sm z-50">
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-30 blur-lg animate-pulse"></div>
        
        {/* Main spinner */}
        <div className="relative flex">
          <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-600 animate-spin"></div>
          
          {/* Inner dot */}
          <div className="absolute top-1/2 left-1/2 h-4 w-4 rounded-full bg-blue-600 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        </div>
      </div>
      
      <div className="mt-6 text-blue-600 font-medium animate-pulse">
        Loading...
      </div>
    </div>
  );
}