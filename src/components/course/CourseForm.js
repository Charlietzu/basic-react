import React from "react";
import TextInput from "../common/TextInput";
import PropTypes from "prop-types";
import DropDown from "../common/DropDown";

function CourseForm(props) {
  return (
    <>
      <form onSubmit={props.onSubmit}>
        <TextInput
          id="title"
          label="Title"
          name="title"
          value={props.course.title}
          onChange={props.onChange}
          error={props.errors.title}
        />

        <DropDown
          id="author"
          name="authorId"
          onChange={props.onChange}
          authorId={props.course.authorId}
          authors={props.authors}
          errors={props.errors}
        />

        <TextInput
          id="category"
          name="category"
          label="Category"
          value={props.course.category}
          onChange={props.onChange}
          error={props.errors.category}
        />

        <input type="submit" value="Save" className="btn btn-primary" />
      </form>
    </>
  );
}

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CourseForm;
