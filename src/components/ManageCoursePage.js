import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import { toast } from "react-toastify";
import * as courseActions from "../actions/courseActions";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    //i want to call the onChange function when the courseStore changes
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug; //from the path '/courses/:slug'
    //if there aren't any courses in the state, we call loadCourses()
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      //ask the store by it slug and populate the form
      setCourse(courseStore.getCourseBySlug(slug));
    }
    //we clean up here, by returning a function
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  /**here we are using destructuring in the parameters of the function, so:
   * const { target } = event.target
   * we don't have to use the word "event" everytime now.
   */
  function handleChange({ target }) {
    setCourse({
      ...course,
      [target.name]: target.value,
    });
  }

  function formIsValid() {
    /**we made errors an object because it's easy to reference the relevant value for each input
     * you can see this in CourseForm.js, in each input.
     */
    const _errors = {};

    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author is required";
    if (!course.category) _errors.category = "Category is required";

    setErrors(_errors);
    //Form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    //this will prevent the page from posting back to the server
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course saved.");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
