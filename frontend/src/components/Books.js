import React, { Component } from 'react';
import BookCard from './BookCard';

class Books extends Component {
    apiKey = "gKqNNLdx3R6yG0GiFbOOAScG4u6SKbJK";

    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    componentDidMount() {
        fetch(`http://localhost:3001/categories/${this.props.listNameEncoded}/books`)
            .then(response => response.json())
            .then(localBooks => {
                if (localBooks.length === 0) {
                    this.getRemoteBooks();
                } else {
                    this.setState({books: localBooks});
                }
            })
            .catch(() => this.getRemoteBooks());
    }

    getRemoteBooks() {
        fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${this.props.listNameEncoded}.json?api-key=${this.apiKey}`)
            .then(response => response.json())
            .then(data => {
                const remoteBooks = [];
                data.results.books.forEach(book => {
                    remoteBooks.push({cover_pic: book.book_image, title: book.title, description: book.description,
                                        author: book.author, publisher: book.publisher, isbn: book.isbns[0].isbn13})
                });
                this.postBooksToLocal({book: remoteBooks})
                    .catch(error => alert(error));
                this.setState({books: remoteBooks});
            })
            .catch(error => alert(error));   
    }

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

    removeBookFromCategory = function(isbn) {
        const newBooks = this.state.books.filter(book => book.isbn !== isbn);
        fetch(`http://localhost:3001/categories/${this.props.listNameEncoded}/books/${isbn}`, {method: 'DELETE'})
            .then(() => this.setState({books: newBooks}))
            .catch(error => alert(error));
    }.bind(this);

    splitEvery = (array, length) =>
        array.reduce((result, item, index) => {
                if (index % length === 0) result.push([])
                result[Math.floor(index / length)].push(item)
                return result
            },
            []
        );

    render() {
        return (
            <div className="container"> 
                {this.splitEvery(this.state.books, 3).map(booksChunk => (
                    <div className="row">
                        { booksChunk.map(book => <BookCard book={book} removeBookFromCategory={this.removeBookFromCategory} />) }
                    </div>
                ))}
            </div>
        );    
    }

}

export default Books;