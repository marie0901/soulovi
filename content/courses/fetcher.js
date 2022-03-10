import courses from "./index.json";

export const getAllCourses = () => {
  return {
    data: courses,
  };
};
