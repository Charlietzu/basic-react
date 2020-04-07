import React from "react";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";

function AuthorForm(props) {
  return (
    <>
      <form onSubmit={props.onSubmit}>
        <TextInput
          id="name"
          label="Name"
          name="name"
          value={props.author.name}
          onChange={props.onChange}
          error={props.errors.title}
        />
        <input type="submit" value="Save" className="btn btn-primary" />
      </form>
    </>
  );
}

AuthorForm.propTypes = {
  author: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default AuthorForm;
