import { BiPackage } from "react-icons/bi";
import { defineField, defineType } from "sanity";

const project = {
  name: "project",
  title: "Projects",
  description: "Project Schema",
  type: "document",
  icon: BiPackage,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "Enter the name of the project",
    },
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (rule) => rule.max(60).required(),
    }),
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Add a custom slug for the URL or generate one from the name",
      options: { source: "name" },
    },
    {
      name: "logo",
      title: "Project Logo",
      type: "image",
    },
    {
      name: "projectUrl",
      title: "Project URL",
      type: "url",
      description: "Leaving this URL blank will add a coming soon to the link.",
    },
    {
      name: "repository",
      title: "Repository URL",
      type: "url",
      description: 'Leaving this URL blank will add a "No Repository" message to the link.',
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description: "Upload a cover image for this project",
      options: {
        hotspot: true,
        metadata: ["lqip"],
      },
      fields: [
        {
          name: "alt",
          title: "Alt",
          type: "string",
        },
      ],
    },
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
      description: "Write a full description about this project",
    }),
    defineField({
      name: "contributors",
      title: "Contributors",
      type: "blockContent",
      description: "Write the contributors of the project"
    }),
    // Aggiungi un campo array per le immagini con descrizione
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      description: "Add images with descriptions to the gallery",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "alt",
                  title: "Alt",
                  type: "string",
                  description: "Alternative text for the image",
                },
              ],
            },
            {
              name: "description",
              title: "Description",
              type: "blockContent",
              description: "Description for the image",
            },
          ],
        },
      ],
    }),
  ],
};

export default project;