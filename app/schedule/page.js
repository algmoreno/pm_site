import "../../styles/globals.css";
import { Calendar } from '@/components/index'

const Schedule = () => {
  return (
    <div className="flex flex-wrap m-auto"> 
      <div className="m-auto my-20 w-[1600px] h-[700px] bg-slate-300 rounded-md">
        <Calendar />
      </div>

      {/* <div className="m-auto my-20 w-[500px] h-[700px] bg-slate-600 flex-wrap rounded-md">
        <h1>
          Pick a time that works for you
        </h1>
      </div> */}
    </div>
  );
}

export default Schedule;