import React, { Component } from 'react';
import BookCard from './BookCard';

class Books extends Component {
    apiKey = "gKqNNLdx3R6yG0GiFbOOAScG4u6SKbJK";

    constructor(props) {
        super(props);
        this.selectNextThree = this.selectNextThree.bind(this);
        this.state = {
            books: []
        };
    }

    componentDidMount() {
        var allBooks = []
        fetch(`https://api.nytimes.com/svc/books/v3/lists/current/${this.props.listNameEncoded}.json?api-key=${this.apiKey}`)
            .then(response => response.json())
            .then(data => data.results.books.forEach(element => allBooks.push(element)))
            .then(_ => {this.setState({books: allBooks})});     
    }

    selectNextThree(index, nextBooks) {
        var cards = new Array(3);
        const j = index;
        for (; index < j + 3 && index < this.state.books.length; index++) {
            const book = nextBooks[index % 3];
            cards[index % 3] = <BookCard coverPic={book.book_image} title={book.title} description={book.description}
                                author={book.author} publisher={book.publisher} isbn={book.isbns.isbn10} />
        }
        return <div className="row"> {cards[0]} {cards[1]} {cards[2]} </div>;
    }

    render() {
        var nextBooks = new Array(3);
        return <div className="container"> 
            {this.state.books.map((book, index) => {
                    nextBooks[index % 3] = book;
                    if (index === this.state.books.length - 1 || (index !== 0 && index % 3 === 0)) { 
                        return this.selectNextThree(index, nextBooks);
                    } else {
                        return <> </>;
                    }
                })}
        </div>;
    }

}

export default Books;