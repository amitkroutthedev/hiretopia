import Image from "next/image";
import { Badge } from "../ui/badge";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";

interface Job {
  job_id: string;
  employer_logo: string | null;
  job_posted_at_timestamp: number;
  job_publisher: string;
  job_title: string;
  job_is_remote: boolean;
  job_employment_type: string;
}

function TableWrapper({ completeJobList }: { completeJobList: Job[] }) {
  return (
    <div className="w-full">
      {/* <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 "> */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {completeJobList.map((allData) => {
          let imgSrc =
            allData.employer_logo === null ? "" : allData.employer_logo;
          let postTimeStamp = new Date(allData.job_posted_at_timestamp * 1000);
          let formattedDate = postTimeStamp.toLocaleDateString("en-IN");
          return (
            <div
              key={allData.job_id}
              className="rounded-lg border-slate-600/10 border-2 shadow-sm"
            >
              <div className=" p-4">
                <div className="bg-white rounded-xl inline-flex px-4 py-1 text-sm font-semibold items-center">
                  <FaCalendarAlt /> <span> {formattedDate}</span>
                </div>
                <div className="p-2 flex items-center justify-between">
                  <div>
                    <p className="text-md">{allData.job_publisher}</p>
                    <Link href={`job-details?search=${allData.job_id}`} className="text-xl font-semibold hover:underline cursor-pointer hover:text-sky-600">{allData.job_title}</Link>
                  </div>
                  <Image
                    src={imgSrc}
                    alt="logo"
                    width={40}
                    height={40}
                    className="bg-white h-auto w-auto"
                  />
                </div>
                <div className="space-x-2">
                  {allData.job_is_remote && (
                    <Badge
                      className="bg-gray-400 text-white hover:bg-slate-400"
                      variant={"secondary"}
                    >
                      REMOTE
                    </Badge>
                  )}
                  <Badge
                    className="bg-gray-400 text-white hover:bg-slate-400"
                    variant={"secondary"}
                  >
                    {allData.job_employment_type}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TableWrapper;
