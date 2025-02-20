import Image from "next/image";
import "../styles/globals.css";
import { Main, About } from '../components';

const Home = () => {
  return (
    <div className="block min-h-screen w-full"> 
      <div >
        <Main />
      </div>
      <div>
        <About />
      </div>
    </div>
  );
}

export default Home;
