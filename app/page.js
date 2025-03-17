import "@/styles/globals.css";
import { Landing, About } from '@/components/index';

const Home = () => {
  return (
    <div className="bg-2" > 
      <Landing />
      <About />
    </div>
  );
}

export default Home;
