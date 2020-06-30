import React from "react";

const DropDown = ({ id, name, onChange, authorId, authors, errors }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>Author</label>
      <div className="field">
        <select
          id={id}
          name={name}
          value={authorId || ""}
          className="form-control"
          onChange={onChange}
        >
          <option value="" />
          {authors.map((author) => {
            return (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            );
          })}
        </select>
      </div>
      {errors.authorId && (
        <div className="alert alert-danger">{errors.authorId}</div>
      )}
    </div>
  );
};

export default DropDown;
