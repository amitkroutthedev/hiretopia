"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MdArrowOutward } from "react-icons/md";
import moment from "moment";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQueryStore } from "@/store/store";
import { useRouter } from "next/navigation";
import Page404 from "./404";

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [selectedJobRes, updateSelectedJobRes] = useQueryStore((state) => [
    state.selectedJobRes,
    state.updateSelectedJobRes,
  ]);
  //console.log(selectedJobRes[0].job_id)
  if(!selectedJobRes[0] || selectedJobRes[0].job_id!==search) return <Page404/>
  return (
    <main className="h-full w-full p-4">
      <Button variant={"link"} onClick={()=>{
        updateSelectedJobRes([])
        router.replace("/")
      }}><ArrowLeft/> Back to home</Button>
      {typeof selectedJobRes!=="string" && selectedJobRes.length !== 0 ? (
        <>
          <div className="rounded-md p-4 w-full">
            <div className="flex items-center space-x-2">
              {selectedJobRes[0].employer_logo !== null ? (
                <Image
                  loading={"lazy"}
                  src={selectedJobRes[0].employer_logo||""}
                  alt="comp_logo"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-24 h-auto"
                />
              ) : (
                <Building2 width={96} height={96} />
              )}
              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  {selectedJobRes[0].job_title}{" "}
                  <span className="font-thin">
                    ({selectedJobRes[0].employer_name})
                  </span>
                </h3>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[300px_1fr]">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>
                      <span className="font-medium">Posted On:</span>{" "}
                      {moment
                        .unix(selectedJobRes[0].job_posted_at_timestamp)
                        .format("DD/MM/YYYY")}
                    </p>
                    <p>
                      <span className="font-medium">Required Experience:</span>{" "}
                      {selectedJobRes[0].job_required_experience
                        .no_experience_required
                        ? "Freshers"
                        : selectedJobRes[0].job_required_experience
                            .experience_mentioned &&
                          `${selectedJobRes[0].job_required_experience.required_experience_in_months} months`}
                    </p>
                    <div>
                      <span className="font-medium">Skills:</span>{" "}
                      <div>
                        {selectedJobRes[0].job_required_skills === null
                          ? "No skills provided"
                          : selectedJobRes[0].job_required_skills.length !==
                              0 &&
                            selectedJobRes[0].job_required_skills.map(
                              (data) => {
                                return (
                                  <Badge variant={"secondary"} key={data}>{data}</Badge>
                                );
                              }
                            )}
                      </div>
                    </div>
                  </div>
                  <br />
                  <div>
                    <span className="font-medium">Apply Links:</span>{" "}
                    <div>
                      {" "}
                      {selectedJobRes[0].apply_options.length !== 0 &&
                        selectedJobRes[0].apply_options.map((data) => (
                          <Link href={data.apply_link} key={data.apply_link}>
                            <Button variant={"link"}>
                              {data.publisher}
                              <span className="">
                                <MdArrowOutward />
                              </span>
                            </Button>
                          </Link>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent className="">
                  <div className="space-y-4">
                    {selectedJobRes[0].job_description
                      .split("\n")
                      .map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ):<p>{"Unable to find the job descriptions"}</p>}
    </main>
  );
}
