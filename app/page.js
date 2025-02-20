import Image from "next/image";
import "../styles/globals.css";
import { Main, About } from '../components';

const Home = () => {
  return (
    <div className="bg-1"> 
        <Main />
        <About />
    </div>
  );
}

export default Home;
