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
    slug: "",
    name: "",
  });

  useEffect(() => {
    authorStore.addChangeListener(onChange);

    const slug = props.match.params.slug;
    if (slug === undefined || authors.length === 0) {
      authorActions.loadAuthors();
    } else if (!authorStore.getAuthorBySlug(slug)) {
      setRedirectNotFound(true);
    } else if (authors.length === 0) {
      authorActions.loadAuthors();
    } else if (slug) {
      setAuthor(authorStore.getAuthorBySlug(slug));
    }
    return () => {
      authorStore.removeChangeListener(onChange);
    };
  }, [authors.length, props.match.params.slug]);

  function onChange() {
    setAuthors(authorStore.getAuthors());
  }

  if (redirectNotFound) {
    return <Redirect to="/404-not-found" />;
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
        authors={authors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageAuthorPage;
