import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookCard from './BookCard';
import { setBooks, editBook, deleteBook } from './BookActions'

/**
 * @author Jadon
 */
class Books extends Component {
  componentDidMount() {
    fetch(`http://localhost:3001/categories/${this.props.listNameEncoded}/books`)
      .then(response => response.json())
      .then(books => (books === undefined || books.length === 0) ? this.getRemoteBooks() : this.props.setBooks(books))
      .catch(() => this.getRemoteBooks());
  }

  /**
   * Fetches the list of NYTimes bestsellers for a specific category from our internal database if such list exists,
   * and from the NYTimes API otherwise
   */
  getRemoteBooks() {
    fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${this.props.listNameEncoded}.json?api-key=${process.env.NYTIMES_BOOKS_API_KEY}`)
      .then(response => response.json())
      .then(data => {
          const books = [];
          data.results.books.forEach(book => 
            books.push({cover_pic: book.book_image, title: book.title, description: book.description,
                        author: book.author, publisher: book.publisher, isbn: book.isbns[0].isbn13})
          );
          this.postBooksToLocal({books}).catch(error => alert(error));
          this.props.setBooks(books);
      })
      .catch(error => alert(error));   
  }

  /**
   * Creates an async POST request to store, in our internal database, the list of NYTimes bestsellers for a specific category 
   * @param {object} books the books to be stored on the back-end
   * @returns the list of successfully stored books
   */
  async postBooksToLocal(books = {}) {
    const response = await fetch(`http://localhost:3001/categories/${this.props.listNameEncoded}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(books)
    });

    return response.json();
  }

  /**
   * Removes a specific book by its ISBN from its respective category 
   * @param {number} targetIsbn the ISBN13 of the book that is to be deleted
   */
  removeBookFromCategory = function(targetIsbn) {
    fetch(`http://localhost:3001/categories/${this.props.listNameEncoded}/books/${targetIsbn}`, {method: 'DELETE'})
      .then(() => this.props.removeBookFromCategory(targetIsbn))
      .catch(error => alert(error));
  }.bind(this);

  /**
   * Edits the title, description, author and/or publisher of a specific book by its ISBN
   * @param {number} targetIsbn the ISBN13 of the book whose properties are to be edited
   * @param {object} editedBook the updated properties for the book
   */
  editBook = function(targetIsbn, editedBook = {}) {
    fetch(`http://localhost:3001/categories/${this.props.listNameEncoded}/books/${targetIsbn}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedBook)
      })
      .then(response => response.json())
      .then(updatedBook => this.props.changeBookDetails(updatedBook))
      .catch(error => alert(error));
  }.bind(this);

  /**
   * Splits an array into smaller arrays, each of size length, except possibly for the last subarray
   * @param {array} array the array that is to be split into smaller arrays
   * @param {number} length the length of each resulting array
   * @returns an array containing (almost) equally sized subarrays 
   */
  splitEvery(array, length) {
    return array.reduce((result, item, index) => {
        if (index % length === 0) result.push([]);
        result[Math.floor(index / length)].push(item);
        return result;
      },
      []
    );
  }

  render() {
    return (
      <div className="container"> 
        {this.splitEvery(this.props.books, 3).map(booksChunk => (
          <div className="row">
            {
              booksChunk.map(book => {
                return <BookCard book={book} removeBookFromCategory={this.removeBookFromCategory} 
                editBook={this.editBook} />
              })
            }
          </div>
        ))}
      </div>
    );    
  }
}

const mapStateToProps = state => ({books: state.bookReducer.books}); 
const mapDispatchToProps = dispatch => ({
  setBooks: books => dispatch(setBooks(books)),
  changeBookDetails: editedBook => dispatch(editBook(editedBook)),
  removeBookFromCategory: targetIsbn => dispatch(deleteBook(targetIsbn))
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);