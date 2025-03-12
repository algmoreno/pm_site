import "../../styles/globals.css";
import { Calendar } from '@/components/index';

const Schedule = async () => {
  return (
    <div className="flex flex-wrap m-auto">       
      <Calendar/>
    </div>
  );
}

export default Schedule;