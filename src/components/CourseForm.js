import React from "react";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";

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

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <div className="field">
            <select
              id="author"
              name="authorId"
              value={props.course.authorId || ""}
              className="form-control"
              onChange={props.onChange}
            >
              <option value="" />
              {props.authors.map((author) => {
                return (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                );
              })}
            </select>
          </div>
          {props.errors.authorId && (
            <div className="alert alert-danger">{props.errors.authorId}</div>
          )}
        </div>

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
