import Logo from "@/assets/homelogo.png";
import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";
import { auth } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
//  const [resetStore] = useQueryStore(state=>state.resetStore)
  const { userId } = auth();
  if (userId) redirect("/job");
  return (
    <main className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row items-center justify-between px-2 md:px-10 h-3/5">
        <div className="p-10 w-full md:w-3/6">
          <p className="text-3xl md:text-6xl font-bold font-sans mb-2">
            Unlock Your Dream Career Today
          </p>
          <p className="font-mono text-justify mb-2">
            Discover thousands of exciting job opportunities across industries.
            Find your perfect fit and take the next step in your professional
            journey.
          </p>
          <SignInButton fallbackRedirectUrl="/job" >
            <Button className="bg-[#14746f] hover:bg-white hover:text-[#14746f] hover:border hover:border-[#14746f]">
              Start Your Job Search
            </Button>
          </SignInButton>
        </div>
        <div className="">
          <Image src={Logo} alt="logo" height={350} width={350} priority />
        </div>
      </div>
      <div className="p-2 md:p-10 h-2/5">
        <p className="text-3xl font-semibold mb-1">Features</p>
        <div className="grid grid-cols-1 md:grid-cols-3 h-40 gap-2 p-1">
          <div className="text-justify border-2 bg-[#248277] hover:bg-[#14746f] text-white rounded-lg p-10">
            <p className="font-bold text-xl text-center">Remote Job</p>
            <p className="text-center">
              Work from anywhere: Find your ideal remote job and enjoy the
              flexibility and freedom of working from home.
            </p>
          </div>
          <div className="text-justify border-2 bg-[#248277] hover:bg-[#14746f] text-white rounded-lg p-10">
            <p className="font-bold text-xl text-center">
              Filter by Employment Type
            </p>
            <p className="text-center">
              Full-time, part-time, contract, or freelance: Choose the
              employment type that best suits your needs and career goals.
            </p>
          </div>
          <div className="text-justify border-2 bg-[#248277] hover:bg-[#14746f] text-white rounded-lg p-10">
            <p className="font-bold text-xl text-center">
              Filter by Experience
            </p>
            <p className="text-center">
              Entry-level, mid-level, senior, or executive: Find jobs that match
              your experience level and qualifications.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
