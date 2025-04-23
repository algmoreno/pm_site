'use client';
import { Html, useProgress } from '@react-three/drei'

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-black font-light mt-2">
          Loading... {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  )
}

export default Loader