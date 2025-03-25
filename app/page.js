import { Landing, About, Services } from '@/components/index';

const Home = () => {
  return (
    <div className="bg-1" > 
      <Landing />
      <Services />
      <About />
    </div>
  );
}

export default Home;
