import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _authors = [];

class AuthorStore extends EventEmitter {
  /**this will allow React components to subscribe to our store
   * so they're notified when changes occur */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /** this will allow React components to unsubscribe from our store*/
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getAuthors() {
    return _authors;
  }

  getAuthorById(id) {
    return _authors.find((author) => author.id === id);
  }

  getAuthorBySlug(slug) {
    return _authors.find((author) => author.slug === slug);
  }
}

const store = new AuthorStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.LOAD_AUTHORS:
      _authors = action.authors;
      store.emitChange();
      break;
    case actionTypes.CREATE_AUTHOR:
      _authors.push(action.author);
      store.emitChange();
      break;
    case actionTypes.UPDATE_AUTHOR:
      _authors = _authors.map((author) =>
        author.id === action.author.id ? action.author : author
      );
      store.emitChange();
      break;
    case actionTypes.DELETE_AUTHOR:
      //iterate over all the courses and filter out any course that it's id match the action course id
      _authors = _authors.filter(
        (author) => author.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;
    default:
    //nothing to do here
  }
});

export default store;
