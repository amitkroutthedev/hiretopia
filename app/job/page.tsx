"use client";
import { useState } from "react";
import { searchingHandler } from "@/axios/request";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useQueryStore } from "@/store/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { FiFilter } from "react-icons/fi";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import CircularLoader from "@/components/CircularLoader";
import TableWrapper from "@/components/table/TableWrapper";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CardCollection from "@/components/CardCollection";
import Backdrop from "@/components/Backdrop";

export default function Home() {
  const [loader, setLoader] = useState(false);
  const [
    query,
    updateQuery,
    isRemoteJob,
    updateRemoteJob,
    typeOfEmployment,
    updateEmployment,
    noOfExperience,
    updateExperience,
    totalJobRes,
    updateTotalJobRes,
    dataPosted,
    updateDataPosted
  ] = useQueryStore((state) => [
    state.query,
    state.updateQuery,
    state.isRemoteJob,
    state.updateRemoteJob,
    state.typeOfEmployment,
    state.updateEmployment,
    state.noOfExperience,
    state.updateExperience,
    state.totalJobRes,
    state.updateTotalJobRes,
    state.dataPosted,
    state.updateDatePosted
  ]);
  function clearHandler() {
    updateRemoteJob("");
    updateEmployment("");
    updateExperience("");
  }
  async function searchHandler() {
    setLoader(true);
   if (query === "") {
      setLoader(false);
      toast.error("Query shouldn't be empty");
    } else {
      let body: { [k: string]: string | boolean } = {
        query: query,
        page: "1",
        num_pages: "1",
      };
      if (isRemoteJob) {
        body = { ...body, remote_jobs_only: isRemoteJob };
      }
      if (typeOfEmployment !== "") {
        body = { ...body, employment_types: typeOfEmployment };
      }
      if (noOfExperience !== "") {
        body = { ...body, job_requirements: noOfExperience };
      }
      if(dataPosted!==""){
        body={...body,date_posted:dataPosted}
      }
      const jobSearchRes = await searchingHandler(body);
      setLoader(false);
      if (jobSearchRes.status === "OK") {
        updateTotalJobRes(jobSearchRes.data);
      } else {
        toast.error("Error in fetching data!!!");
      }
    }
  }
  const changeFilterHandler = () => {
    searchHandler();
  };
  return (
    <>
    <div className="p-4 border-2 w-full">
      <div className="mx-auto">
        <div className="mb-8 flex flex-row space-x-3 items-center justify-between">
          <Input
            className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
            placeholder="Search job postings..."
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
            type="search"
          />
          <Button
            disabled={loader}
            onClick={searchHandler}
            className="bg-[#2d6a4f]"
          >
            {loader ? <CircularLoader /> : "Search"}
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[300px_1fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label
                      className="mb-2 block text-sm font-medium"
                      htmlFor="remote-job"
                    >
                      Job Type
                    </Label>
                    <RadioGroup
                      onValueChange={(e) => updateRemoteJob(e)}
                      defaultValue={isRemoteJob}
                     // value={isRemoteJob}
                      className="flex space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="option-one" />
                        <Label htmlFor="option-one">Remote</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="option-two" />
                        <Label htmlFor="option-two">Non Remote</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label
                      className="mb-2 block text-sm font-medium"
                      htmlFor="employment-type"
                    >
                      Type of Employment
                    </Label>
                    <Select
                      value={typeOfEmployment}
                      onValueChange={(e) => updateEmployment(e)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="FULLTIME">Full Time</SelectItem>
                          <SelectItem value="CONTRACTOR">Contractor</SelectItem>
                          <SelectItem value="PARTTIME">Part Time</SelectItem>
                          <SelectItem value="INTERN">Intern</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      className="mb-2 block text-sm font-medium"
                      htmlFor="employment-type"
                    >
                      Date Posted
                    </Label>
                    <Select
                      value={dataPosted}
                      onValueChange={(e) => updateDataPosted(e)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Dates" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="all">ALL</SelectItem>
                          <SelectItem value="today">TODAY</SelectItem>
                          <SelectItem value="3days">3 DAYS</SelectItem>
                          <SelectItem value="week">WEEK</SelectItem>
                          <SelectItem value="month">MONTH</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      className="mb-2 block text-sm font-medium"
                      htmlFor="experience"
                    >
                      Experience
                    </Label>
                    <Select
                      value={noOfExperience}
                      onValueChange={(e) => updateExperience(e)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectGroup>
                        <SelectContent>
                          <SelectItem value="no_degree">No Degree</SelectItem>
                          <SelectItem value="no_experience">
                            No Experience
                          </SelectItem>
                          <SelectItem value="under_3_years_experience">
                            Under 3 years experience
                          </SelectItem>
                          <SelectItem value=" more_than_3_years_experience">
                            More than 3 years experience
                          </SelectItem>
                        </SelectContent>
                      </SelectGroup>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                {loader ? (
                  <Button className="w-full bg-[#2d6a4f]" disabled>
                    <CircularLoader />
                  </Button>
                ) : (
                  <>
                    <Button
                      className="w-full bg-[#2d6a4f]"
                      onClick={() => changeFilterHandler()}
                    >
                      Apply Filters
                    </Button>
                    <Button
                      className="w-full bg-[#d8f3dc]"
                      variant={"outline"}
                      onClick={() => clearHandler()}
                    >
                      Clear Filters
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Postings</CardTitle>
              </CardHeader>
              <CardContent>
                {totalJobRes.length !== 0 ? (
                  <CardCollection completeJobList={totalJobRes} setLoader={setLoader}/>
                ) : (
                  <div>
                    <p className="text-center">No jobs found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
      {loader && <Backdrop/>}
    </>
  );
}
