import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
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
        fetch(`http://localhost:3001/categories`)
            .then(response => response.json())
            .then(categories => {
                if (categories.length === 0) {
                    this.getRemoteCategories();
                } else {
                    this.setState({bookCategories: categories, 
                        currCategory: categories[0].list_name, 
                        currCategoryEncoded: categories[0].list_name_encoded});
                }
            })
            .catch(() => this.getRemoteCategories());
    }

    getRemoteCategories() {
        fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${this.apiKey}`)
            .then(response => response.json())
            .then(data => {
                const categoryNames = [];
                data.results.forEach(result => {
                    categoryNames.push({list_name: result.list_name, list_name_encoded: result.list_name_encoded});
                });
                this.postCategoriesToLocal({category: categoryNames})
                    .catch(error => alert(error));
                this.setState({bookCategories: categoryNames, 
                                currCategory: categoryNames[0].list_name, 
                                currCategoryEncoded: categoryNames[0].list_name_encoded});
            })
            .catch(error => alert(error)); 
    }

    async postCategoriesToLocal(categories = {}) {
        const response = await fetch(`http://localhost:3001/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categories)
        });

        return response.json();
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
                                {this.state.bookCategories.map(element => {
                                    return (
                                        <NavDropdown.Item onClick={() => this.setState({currCategory: element.list_name, 
                                        currCategoryEncoded: element.list_name_encoded})} className="nav-item active">
                                            {element.list_name} 
                                        </NavDropdown.Item>
                                    );
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