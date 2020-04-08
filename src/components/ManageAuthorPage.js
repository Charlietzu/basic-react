import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import authorStore from "../stores/authorStore";
import * as authorActions from "../actions/authorActions";
import AuthorForm from "./AuthorForm";

const ManageAuthorPage = (props) => {
  const [errors, setErrors] = useState({});
  const [redirectNotFound, setRedirectNotFound] = useState(false);
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [author, setAuthor] = useState({
    id: null,
    name: "",
  });

  useEffect(() => {
    authorStore.addChangeListener(onChange);

    const id = props.match.params.id;
    if (id === undefined || authors.length === 0) {
      authorActions.loadAuthors();
    } else if (id) {
      setAuthor(authorStore.getAuthorById(id));
    }

    return () => {
      authorStore.removeChangeListener(onChange);
    };
  }, [props.match.params.id, authors.length]);

  function onChange() {
    setAuthors(authorStore.getAuthors());
  }

  function handleChange({ target }) {
    setAuthor({
      ...author,
      [target.name]: target.value,
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!author.name) _errors.name = "Author Name is required";

    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    //this will prevent the page from posting back to the server
    event.preventDefault();
    if (!formIsValid()) return;
    authorActions.saveAuthor(author).then(() => {
      props.history.push("/authors");
      toast.success("Author saved");
    });
  }

  return (
    <>
      <h2>Manage Author</h2>
      <AuthorForm
        errors={errors}
        author={author}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageAuthorPage;
