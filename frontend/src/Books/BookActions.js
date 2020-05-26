export const setBooks = books => dispatch => {
  dispatch({
    type: 'SET_ALL',
    payload: {books}
  });
};

export const editBook = updatedBook => dispatch => {
  dispatch({
    type: 'EDIT',
    payload: {updatedBook}
  });
};

export const deleteBook = targetIsbn => dispatch => {
  dispatch({
    type: 'DELETE',
    payload: {targetIsbn}
  });
}