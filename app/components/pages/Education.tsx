import Image from "next/image";
import { educationQuery } from "@/lib/sanity.query";
import type { EducationType } from "@/types";
import { formatDate } from "../../utils/date";
import { Slide } from "../../animation/Slide";
import { sanityFetch } from "@/lib/sanity.client";
import RefLink from "../shared/RefLink";

export default async function Education() {
  const education: EducationType[] = await sanityFetch({
    query: educationQuery,
    tags: ["education"],
  });

  // Ordina le esperienze educative dal più lontano al più recente
  const sortedEducation = [...education].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return (
    <section className="mt-32">
      <Slide delay={0.16}>
        <div className="mb-16">
          <h2 className="font-incognito text-4xl mb-4 font-bold tracking-tight">
            Education
          </h2>
        </div>
      </Slide>

      <Slide delay={0.18}>
        <div className="relative">
          {/* Linea principale verticale - color responsive to theme */}
          <div className="absolute left-7 top-0 w-1 h-full bg-black dark:bg-white rounded-full" />
          
          <div className="flex flex-col gap-y-16">
            {sortedEducation.map((data, index) => (
              <div
                key={data._id}
                className="flex items-start lg:gap-x-8 gap-x-6 max-w-2xl relative"
              >
                {/* Connettore curvo personalizzato per ogni elemento - color responsive to theme */}
                <div className={`absolute left-0 top-14 w-14 h-${index % 2 ? '24' : '16'} overflow-visible`}>
                  <svg 
                    width="100%" 
                    height="100%" 
                    viewBox="0 0 60 100" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 left-0"
                  >
                    <path 
                      d={index % 3 === 0 
                        ? "M15,0 C40,20 35,80 60,100" 
                        : index % 3 === 1 
                          ? "M15,0 C50,30 20,70 60,100" 
                          : "M15,0 C0,40 80,60 60,100"
                      } 
                      className="stroke-black dark:stroke-white" 
                      strokeWidth="2" 
                      fill="none" 
                    />
                  </svg>
                </div>
                
                {/* Logo della scuola/università */}
                <div className="relative z-10">
                  <a
                    href={data.url}
                    rel="noreferrer noopener"
                    className="min-h-[60px] min-w-[60px] rounded-md overflow-clip relative flex items-center justify-center border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md transform transition-transform hover:scale-105"
                  >
                    <Image
                      src={data.logo}
                      className="object-cover"
                      alt={`${data.name} logo`}
                      fill
                    />
                  </a>
                </div>
                
                {/* Contenuto dell'esperienza educativa - senza background */}
                <div className="flex flex-col items-start">
                  <h3 className="text-xl font-bold">{data.name}</h3>
                  <small className="text-sm text-zinc-500 mt-2 tracking-widest uppercase">
                    {formatDate(data.startDate)} - {formatDate(data.endDate)}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Slide>
    </section>
  );
}