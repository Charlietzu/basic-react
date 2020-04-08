import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadAuthors, deleteAuthor } from "../../actions/authorActions";
import authorStore from "../../stores/authorStore";
import AuthorList from "./AuthorList";

function AuthorPage() {
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    authorStore.addChangeListener(onChange);
    if (authorStore.getAuthors().length === 0) loadAuthors();
    return () => {
      authorStore.removeChangeListener(onChange);
    }; //cleanup on unmount
  }, []);

  function onChange() {
    setAuthors(authorStore.getAuthors());
  }

  return (
    <>
      <h2>Authors</h2>
      <Link className="btn btn-primary my-2" to="/author">
        Add Author
      </Link>
      <AuthorList authors={authors} deleteAuthor={deleteAuthor} />
    </>
  );
}

export default AuthorPage;
