import Image from "next/image";
import "../styles/globals.css";
import { Main, About } from '../components';

const Home = () => {
  return (
    <div > 
        <Main />
        <About />
    </div>
  );
}

export default Home;
