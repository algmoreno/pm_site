import Image from "next/image";
import "../styles/globals.css";

const Home = () => {
  return (
    <div className="block justify-items-center min-h-screen gap-16 w-full"> 
      <div className="min-h-[500px] bg-slate-300 w-full">
        Home Page Component
      </div>
      <div className="min-h-[500px] bg-slate-500 w-full">
        About Component
      </div>
    </div>
  );
}

export default Home;
