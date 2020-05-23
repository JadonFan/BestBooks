import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import Books from './Books';

class Home extends Component {
    apiKey = "gKqNNLdx3R6yG0GiFbOOAScG4u6SKbJK";

    constructor(props) {
        super(props);
        this.state = {
            bookCategories: [],
            currCategory: "",
            currCategoryEncoded: ""
        };
    }

    componentDidMount() {
        fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${this.apiKey}`)
            .then(response => response.json())
            .then(data => this.setState({bookCategories: data.results, 
                                         currCategory: data.results[0].list_name, 
                                         currCategoryEncoded: data.results[0].list_name_encoded}));
    }

    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark" sticky="top">
                    <Navbar.Brand href="#">NYTimes Bestsellers</Navbar.Brand>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" 
                    data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" 
                    aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <Nav>
                            <NavDropdown title="Categories" id="basic-nav-dropdown">
                                { this.state.bookCategories.map((element, index) => {
                                    return <NavDropdown.Item key={element.list_name} onClick={() => this.setState({currCategory: element.list_name, 
                                    currCategoryEncoded: element.list_name_encoded})} className="nav-item active">
                                        {element.list_name} 
                                    </NavDropdown.Item>;
                                })}
                            </NavDropdown>
                        </Nav>
                    </div>
                </Navbar>

                <h2 style={{textAlign: "center", padding: "20px 0px 20px 0px"}}> {this.state.currCategory} </h2>

                {this.state.currCategoryEncoded == 0 ? <> </> : <Books key={this.state.currCategoryEncoded} listNameEncoded={this.state.currCategoryEncoded}/>}
            </>
        );
    }
}

export default Home;