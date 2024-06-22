import axios from "axios";

const Headers ={
    'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
    'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPID_API_HOST
  }
const SEARCH_URL = 'https://jsearch.p.rapidapi.com/search'
const JOB_DETAILS_SEARCH_URL = 'https://jsearch.p.rapidapi.com/job-details'

export async function searchingHandler(query: any) {
    const options = {
        method: 'GET',
        url: SEARCH_URL,
        params: query,
        headers: Headers
    };
    try {
        const response = await axios.request(options);
        return response.data
    } catch (error) {
        return error
    }
}


export async function searchedJobDetailsHandler(jobId: string) {
    const options = {
        method: 'GET',
        url: JOB_DETAILS_SEARCH_URL,
        params: {
            job_id: jobId,
            extended_publisher_details: 'false'
        },
        headers: Headers
    };
    try {
        const response = await axios.request(options);
        return response.data
    } catch (error) {
        console.error(error);
    }
}