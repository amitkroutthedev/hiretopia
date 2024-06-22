"use client"

import { Button } from "./ui/button";
import { GrUserWorker } from "react-icons/gr";
import { CgCalendarDates } from "react-icons/cg";
import { Badge } from "./ui/badge";
import { searchedJobDetailsHandler } from "@/axios/request";
import { useQueryStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Backdrop from "./Backdrop";
import { useState } from "react";

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
    console.log(jobDetailsRes.data)
    if(jobDetailsRes.status==="OK"){
      updateSelectedJobRes(jobDetailsRes.data)
      router.push(`job-details?search=${jobDetailsRes.data[0].job_id}`)
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
            className="bg-[#dde5b6] rounded-md border border-gray-300 p-4 dark:border-gray-600"
            key={allData.job_id}
          >
            <h3 className="mb-2 text-lg font-medium">
              {allData.job_title}{" "}
              <span className="font-thin">({allData.employer_name})</span>
            </h3>
            <div className="mb-4 text-gray-500 dark:text-gray-400">
              <Badge variant="outline">
                <GrUserWorker />
                {allData.job_employment_type}
              </Badge>
              <Badge variant="outline">
                <CgCalendarDates />
                {formattedDate}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <LocateIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {allData.job_is_remote
                    ? "Remote"
                    : `${allData.job_city},${allData.job_country}`}
                </span>
              </div>
                <Button size="sm" className="bg-[#2d6a4f]" onClick={()=>getJobDetailsHandler(allData.job_id)}>
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
