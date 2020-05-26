const bookReducer = (state = {books: []}, action) => {
  switch(action.type) {
    case 'SET_ALL': {
      const books = action.payload.books;
      return {...state, books};
    } case 'EDIT': {
      let targetIndex = 0;
      state.books.some((book, index) => {
        targetIndex = index;
        return book.isbn === action.payload.updatedBook.isbn;
      });
      const books = [...state.books.slice(0, targetIndex), action.payload.updatedBook, ...state.books.slice(targetIndex + 1)];
      return {...state, books};
    } case 'DELETE': {
      const books = state.books.filter(book => book.isbn !== action.payload.targetIsbn);
      return {...state, books};
    } default:
      return state;
  } 
};

export default bookReducer;