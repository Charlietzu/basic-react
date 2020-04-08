import dispatcher from "../appDispatcher";
import * as authorApi from "../api/authorApi";
import actionTypes from "./actionTypes";

export function loadAuthors() {
  return authorApi.getAuthors().then((authors) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_AUTHORS,
      //the line below is equal to courses: courses
      authors,
    });
  });
}

export function saveAuthor(author) {
  return authorApi.saveAuthor(author).then((savedAuthor) => {
    dispatcher.dispatch({
      actionType: author.id
        ? actionTypes.UPDATE_AUTHOR
        : actionTypes.CREATE_AUTHOR,
      course: savedAuthor,
    });
  });
}

export function deleteAuthor(id) {
  return authorApi.deleteAuthor(id).then(() => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_AUTHOR,
      //the line below is equal to id: id
      id,
    });
  });
}
