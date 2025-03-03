import { PortableText } from "@portabletext/react";
import { profileQuery } from "@/lib/sanity.query";
import type { ProfileType } from "@/types";
import { CustomPortableTextFavicon } from "../shared/CustomPortableTextFavicon";
import { sanityFetch } from "@/lib/sanity.client";

export default async function Usage() {
  const profile: ProfileType = await sanityFetch({
    query: profileQuery,
    tags: ["profile"],
  });

  return (
    <section className="max-w-2xl">
      <div className="mb-8">
        <h2 className="text-4xl mb-4 font-bold tracking-tight">Tools & Technologies</h2>
        <p className="dark:text-zinc-400 text-zinc-600 max-w-xl">
          Tools, technologies and gadgets I use on a daily basis but not limited
          to.
        </p>
      </div>
      <ul className="flex flex-wrap items-center gap-3 mt-8">
        {profile.skills.map((skill, id) => (
          <li
            key={id}
            className="cursor-pointer dark:text-zinc-400 border border-solid border-zinc-300 hover:border-zinc-950 rounded-md px-2 py-1 "
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}
