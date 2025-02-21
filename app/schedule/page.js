import "../../styles/globals.css";
import { Calendar } from '../../components'

const Schedule = () => {
  return (
    <div className="flex flex-wrap m-auto"> 
      <div className="m-auto my-20 w-[500px] h-[700px] bg-slate-300">
        <Calendar />
      </div>

      <div className="m-auto my-20 w-[500px] h-[700px] bg-slate-600 flex-wrap">
        <h1>
          Pick a time that works for you
        </h1>
      </div>
    </div>
  );
}

export default Schedule;