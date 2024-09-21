"use client"

import { Button } from "./ui/button";
import { GrUserWorker } from "react-icons/gr";
import { CgCalendarDates } from "react-icons/cg";
import { Badge } from "./ui/badge";
import { searchedJobDetailsHandler } from "@/axios/request";
import { useQueryStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Backdrop from "./Backdrop";
import { MapPinIcon } from "lucide-react"

interface Job {
  job_id: string;
  employer_logo: string | null;
  job_posted_at_timestamp: number;
  job_publisher: string;
  job_title: string;
  job_is_remote: boolean;
  job_employment_type: string;
  employer_name: string;
  job_city: string;
  job_country: string;
}

function CardCollection({ completeJobList,setLoader }: { completeJobList: Job[],setLoader:any }) {
  const [ updateSelectedJobRes] = useQueryStore((state) => [
    state.updateSelectedJobRes,
  ]);
  const router = useRouter()
  const getJobDetailsHandler=async(searchId:string)=>{
    setLoader(true)
    const jobDetailsRes = await searchedJobDetailsHandler(searchId);
    if(jobDetailsRes.status==="OK"){
      updateSelectedJobRes(jobDetailsRes.data)
      router.push(`job-details/${jobDetailsRes.data[0].job_id}`)
      setLoader(false)
    }
  }
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
      {completeJobList.map((allData) => {
        let postTimeStamp = new Date(allData.job_posted_at_timestamp * 1000);
        let formattedDate = postTimeStamp.toLocaleDateString("en-IN");
        return (
          <div
            className="bg-gray-800 border-gray-700  rounded-md border p-4 text-white"
            key={allData.job_id}
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-200">
              {allData.job_title}{" "}
              <span className="text-sm text-gray-400 mb-2">({allData.employer_name})</span>
            </h3>
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {allData.job_is_remote
                    ? "Remote"
                    : `${allData.job_city},${allData.job_country}`}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <CgCalendarDates className="text-sm text-gray-200"/>
                {formattedDate}
              </div>
              </div>
              <br/>
            <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-400">
                  {allData.job_employment_type}
                  </p>
                <Button size="sm" className="bg-gray-700 hover:bg-gray-600 text-gray-200" onClick={()=>getJobDetailsHandler(allData.job_id)}>
                  Apply
                </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CardCollection;
function LocateIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}
