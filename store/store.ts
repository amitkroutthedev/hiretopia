import { create,StateCreator } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

interface JobData {
  job_id:string,
  employer_logo?: string|undefined;
  job_title: string;
  employer_name: string;
  job_posted_at_timestamp: number;
  job_required_experience: {
    no_experience_required: boolean;
    experience_mentioned?: boolean;
    required_experience_in_months?: number;
  };
  job_required_skills: string[] | null;
  apply_options: {
    apply_link: string;
    publisher: string;
  }[];
  job_description: string;
}

type State = {
    query: string,
    isRemoteJob:string,
    typeOfEmployment:string,
    noOfExperience:string,
    dataPosted:string,
    totalJobRes:any[],
    selectedJobRes:JobData[]
}


type Action = {
  updateQuery: (query: State['query']) => void
  updateRemoteJob:(isRemoteJob:State['isRemoteJob'])=>void
  updateEmployment:(typeOfEmployment:State['typeOfEmployment'])=>void
  updateExperience:(noOfExperience:State['noOfExperience'])=>void
  updateDatePosted:(dataPosted:State['dataPosted'])=>void
  updateTotalJobRes:(totalJobRes:State['totalJobRes'])=>void
  updateSelectedJobRes:(selectedJobRes:State['selectedJobRes'])=>void
  resetStore: () => void
}

const initialState ={
  query: '',
  isRemoteJob:"",
  typeOfEmployment:"",
  noOfExperience:"",
  dataPosted:"",
  totalJobRes:[],
  selectedJobRes:[]
}

const useQuery: StateCreator<State&Action>=(set) => ({
  ...initialState,
    updateQuery: (query) => set(() => ({ query: query })),
    updateRemoteJob:(isRemote)=>set(()=>({isRemoteJob:isRemote})),
    updateEmployment:(typeOfEmployment)=>set(()=>({typeOfEmployment:typeOfEmployment})),
    updateExperience:(noOfExperience)=>set(()=>({noOfExperience:noOfExperience})),
    updateDatePosted:(dataPosted)=>set(()=>({dataPosted:dataPosted})),
    updateTotalJobRes:(totalJobRes)=>set(()=>({totalJobRes:totalJobRes})),
    updateSelectedJobRes:(selectJobRes)=>set(()=>({selectedJobRes:selectJobRes})),
    resetStore: () => set(() => ({ ...initialState }))
})

export const useQueryStore = create<State & Action>()(
  persist(useQuery,{
    name:"query-storage",
    storage:createJSONStorage(()=>sessionStorage)
  })
);
