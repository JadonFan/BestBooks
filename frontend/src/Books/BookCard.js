import React, { Component } from 'react';
import './Books.css';

/**
 * @author Jadon
 */
class BookCard extends Component {
  static defaultProps = {
    book: {
      coverPic: "", 
      title: "Jane Doe", 
      description: "", 
      author: "", 
      publisher: "", 
      isbn: "None"
    }
  };
  initialBookEdits = {
    title: this.props.book.title.toUpperCase(),
    description: this.props.book.description,
    author: this.props.book.author,
    publisher: this.props.book.publisher
  };

  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitBookChanges = this.submitBookChanges.bind(this);
    this.cancelBookChanges = this.cancelBookChanges.bind(this);
    this.state = {
      isInViewMode: true,
      bookEdits: this.initialBookEdits
    };
  }

  /**
   * Handles user input changes to any of the non-read-only fields in the book edit form
   * @param {Event} event 
   */
  handleInputChange(event) {
    const target = event.target;
    this.setState({bookEdits: {...this.state.bookEdits, [target.name]: target.value}});
  }

  /**
   * Sends the changes to a particular book to the server and sets the respective book card back to view mode
   * @param {Event} event 
   */
  submitBookChanges(event) {
    event.preventDefault();
    const editedBook = {
      ...this.state.bookEdits, 
      cover_pic: this.props.book.cover_pic, 
      title: this.props.title.toUpperCase(), 
      isbn: this.props.book.isbn
    };
    this.props.editBook(this.props.book.isbn, editedBook);
    this.setState({isInViewMode: true});
  }

  /**
   * Removes any changes to the book edit form, and resets the book card back to view mode
   * @param {Event} event 
   */
  cancelBookChanges(event) {
    event.preventDefault();
    this.setState({isInViewMode: true, bookEdits: this.initialBookEdits});
  }

  /**
   * One of two display options for the {@link BookCard} component
   * @returns the JSX element for displaying the details for a particular bestseller 
   * @see this.displayEdit
   */
  displayInfo() {
    return (
      <div className="col-md-4 book-col">
        <div className="card book-card" style={{height: "100%"}}>
          <img className="card-img-top" src={this.props.book.cover_pic} alt="Book Cover"/>
          <div className="card-body">
            <h5 className="card-title"> {this.props.book.title.toUpperCase()} </h5>
            <p className="card-text"> {this.props.book.description} </p>
          </div>

          <ul className="list-group list-group-flush">
            <li className="list-group-item"> <b>Author:</b> &nbsp; {this.props.book.author} </li>
            <li className="list-group-item"> <b>Publisher:</b> &nbsp; {this.props.book.publisher} </li>
            <li className="list-group-item"> <b>ISBN:</b> &nbsp; {this.props.book.isbn} </li>
          </ul>

          <div className="card-body" style={{bottom: 0}}>
            <button type="button" className="btn btn-primary card-link" 
            onClick={() => this.setState({isInViewMode: false})}> 
              Edit 
            </button>
            <button type="button" className="btn btn-danger card-link" 
            onClick={() => this.props.removeBookFromCategory(this.props.book.isbn)}> 
              Delete 
            </button>
          </div>
        </div>
      </div>
    );
  }

  /**
   * One of two display options for the {@link BookCard} component
   * @returns the JSX element for displaying the edit form for a particular bestseller
   * @see this.displayInfo
   */
  displayEdit() {
    return (
      <div className="col-md-4 book-col">
        <div className="card book-card">
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="bookTitle"> Title </label>
                <input name="title" className="form-control" id="bookTitle" value={this.state.bookEdits.title} 
                onChange={this.handleInputChange} /> 
              </div>
              <div className="form-group">
                <label htmlFor="bookDescription"> Description </label>
                <textarea name="description" className="form-control" id="bookDescription" rows="5" 
                value={this.state.bookEdits.description} onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="bookAuthor"> Author </label>
                <input name="author" className="form-control" id="bookAuthor" value={this.state.bookEdits.author} 
                onChange={this.handleInputChange} /> 
              </div>
              <div className="form-group">
                <label htmlFor="bookPublisher"> Publisher </label>
                <input name="publisher" className="form-control" id="bookPublisher" value={this.state.bookEdits.publisher} 
                onChange={this.handleInputChange} /> 
              </div>
              <div className="form-group">
                <label htmlFor="bookISBN"> ISBN </label>
                <input className="form-control" id="bookISBN" type="text" readOnly="readonly" placeholder={this.props.book.isbn} /> 
              </div>
            </form>
          </div>

          <div className="card-body" style={{position: "absolute", bottom: 0}}>
            <button type="button" className="btn btn-primary card-link" onClick={this.submitBookChanges}> 
              Done 
            </button>
            <button type="button" className="btn btn-danger card-link" onClick={this.cancelBookChanges}> 
              Cancel 
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return <> {this.state.isInViewMode ? this.displayInfo() : this.displayEdit()} </>;
  }
}

export default BookCard;
