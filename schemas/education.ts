import { BiBriefcase } from "react-icons/bi";

const education = {
  name: "education",
  title: "Education",
  type: "document",
  icon: BiBriefcase,
  fields: [
    {
      name: "name",
      title: "University Name",
      type: "string",
      description: "What is the name of the university?",
    },
    {
      name: "logo",
      title: "University Logo",
      type: "image",
    },
    {
      name: "url",
      title: "University Website",
      type: "url",
    },
    {
      name: "startDate",
      title: "Start Date",
      type: "date",
    },
    {
      name: "endDate",
      title: "End Date",
      type: "date",
    },
  ],
};

export default education;
