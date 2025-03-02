import { defineField } from "sanity";
import { BiUser } from "react-icons/bi";

const profile = {
  name: "profile",
  title: "Profile",
  type: "document",
  icon: BiUser,
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: "In one short sentence, what do you do?",
      validation: (Rule) => Rule.required().min(40).max(80),
    }),
    defineField({
      name: "profileImages",
      title: "Profile Images Gallery",
      type: "array",
      description: "Add multiple images for the profile carousel",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
            metadata: ["lqip"]
          },
          fields: [
            {
              name: "alt",
              title: "Alternative Text",
              type: "string",
              validation: (Rule) => Rule.required()
            },
            {
              name: "customSize",
              title: "Custom Size",
              type: "string",
              options: {
                list: [
                  {title: 'Default', value: 'default'},
                  {title: 'Portrait', value: 'portrait'},
                  {title: 'Landscape', value: 'landscape'}
                ]
              }
            }
          ]
        }
      ],
      validation: (Rule) => [
        Rule.min(1).error('At least one image is required'),
        Rule.max(10).warning('Maximum 10 images allowed')
      ]
    }),
    defineField({
      name: "shortBio",
      title: "Short Bio",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fullBio",
      title: "Full Bio",
      type: "blockContent",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "resumeURL",
      title: "Upload Resume",
      type: "file",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "usage",
      title: "Usage",
      type: "blockContent",
      validation: (rule) => rule.required(),
    }),
  ],
};

export default profile;
