import Image from "next/image";
import { Metadata } from "next";
import { singleProjectQuery } from "@/lib/sanity.query";
import type { ProjectType } from "@/types";
import { PortableText } from "@portabletext/react";
import { CustomPortableText } from "@/app/components/shared/CustomPortableText";
import { Slide } from "../../animation/Slide";
import { urlFor } from "@/lib/sanity.image";
import { sanityFetch } from "@/lib/sanity.client";
import { BiLinkExternal, BiLogoGithub } from "react-icons/bi";

type Props = {
  params: {
    project: string;
  };
};

const fallbackImage: string =
  "https://res.cloudinary.com/victoreke/image/upload/v1692636087/victoreke/projects.png";

  export default async function Project({ params }: Props) {
    const slug = params.project;
    const project: ProjectType = await sanityFetch({
      query: singleProjectQuery,
      tags: ["project"],
      qParams: { slug },
    });
  
    return (
      <main className="max-w-3xl mx-auto px-4">
        {/* Titolo e metadati */}
        <Slide delay={0.1}>
          <div className="mb-8 space-y-4">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
              {project.name}
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              {project.tagline}
            </p>
          </div>
        </Slide>
  
        {/* Immagine principale */}
        <Slide delay={0.1}>
          <div className="mb-12 rounded-lg border dark:border-zinc-800 border-zinc-200 overflow-hidden">
            <Image
              src={project.coverImage?.image ?? fallbackImage}
              alt={project.coverImage?.alt ?? project.name}
              width={1200}
              height={630}
              quality={100}
              className="w-full h-auto"
              placeholder="blur"
              blurDataURL={project.coverImage?.lqip || ""}
            />
          </div>
        </Slide>
  
        {/* Azioni principali */}
        <Slide delay={0.1}>
          <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={project.projectUrl}
              className="flex items-center justify-center gap-2 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <BiLinkExternal />
              {project.projectUrl ? "View Project" : "Coming Soon"}
            </a>
            <a
              href={project.repository}
              className="flex items-center justify-center gap-2 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <BiLogoGithub />
              {project.repository ? "View Code" : "Code Private"}
            </a>
          </div>
        </Slide>
  
        {/* Descrizione pulita */}
        <Slide delay={0.1}>
          <article className="mb-12 prose prose-zinc dark:prose-invert max-w-none">
            <PortableText
              value={project.description}
              components={CustomPortableText}
            />
          </article>
        </Slide>
  
        {/* Galleria essenziale */}
        {project.gallery?.length > 0 && (
          <Slide delay={0.1}>
            <div className="space-y-8">
              {project.gallery.map((item, index) => (
                <div key={index}>
                  <hr />
                  <Slide delay={0.1}>
                    <div className="space-y-2">
                      <div className="rounded-lg overflow-hidden border dark:border-zinc-800 border-zinc-200">
                        <Image
                          src={item.image}
                          alt={item.alt || `Project detail ${index + 1}`}
                          width={1200}
                          height={800}
                          quality={100}
                          className="w-full h-auto"
                        />
                      </div>
                      {item.description && (
                        <div className="prose prose-zinc dark:prose-invert max-w-none">
                          <PortableText
                            value={item.description}
                            components={CustomPortableText}
                          />
                        </div>
                      )}
                    </div>
                  </Slide>
                </div>
              ))}
            </div>
          </Slide>
        )}
  
        {/* Contributori */}
        <Slide delay={0.1}>
          <hr />
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <PortableText
              value={project.contributors}
              components={CustomPortableText}
            />
          </div>
        </Slide>
      </main>
    );
  }