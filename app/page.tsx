"use client";
import { useUser } from "@clerk/nextjs";
import { redirect, usePathname } from "next/navigation";
import { HeroHighlightDemo } from "@/components/Hero";
import { useQueryStore } from "@/store/store";
import { useEffect } from "react";

export default function Home() {
  const pathname = usePathname();
  const [resetStore] = useQueryStore((state) => [state.resetStore]);
  useEffect(() => {
    if (pathname === "/") resetStore();
  }, [pathname]);
  const { isSignedIn, user, isLoaded } = useUser();
  if (isSignedIn) redirect("/job");
  const grid = [
    {
      title: "Find yourself Remote Job",
      description:
        "Work from anywhere: Find your ideal remote job and enjoy the flexibility and freedom of working from home.",
    },
    {
      title: " Filter by Employment Type",
      description:
        "Full-time, part-time, contract, or freelance: Choose the employment type that best suits your needs and career goals.",
    },
    {
      title: "Filter by Experience",
      description:
        "Entry-level, mid-level, senior, or executive: Find jobs that match your experience level and qualifications.",
    },
  ];
  return (
    <main className="overflow-y-auto flex flex-col h-full bg-gradient-to-t to-gray-800 from-blue-500">
      <div className="h-1/3 flex items-center">
        <HeroHighlightDemo />
      </div>
      <div className="h-2/3 px-2">
        {/* <FeaturesSection/> */}
        <div className="py-20 lg:py-40">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 md:gap-2 max-w-7xl mx-auto">
            {grid.map((feature) => (
              <div key={feature.title}>
                <div className="relative bg-[#023047] p-6 rounded-3xl overflow-hidden h-full">
                  <p className="text-base font-semibold text-white relative z-20">
                    {feature.title}
                  </p>
                  <p className="text-neutral-300 mt-4 text-base font-normal relative z-20">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
