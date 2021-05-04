import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { setCategories, changeCategory } from './CategoryActions'
import Books from '../Books/Books';
import './Nav.css';

/**
 * @author Jadon
 */
class Categories extends Component {
  apiKey = 'gKqNNLdx3R6yG0GiFbOOAScG4u6SKbJK';

  componentDidMount() {
    fetch(`http://localhost:3001/categories`)
      .then(response => response.json())
      .then(categoryNames => {
        if (categoryNames === undefined || categoryNames.length === 0) {
          this.getRemoteCategories();
        } else {
          this.props.setCurrentToFirstCategory(categoryNames);
        }
      })
      .catch(() => this.getRemoteCategories());
  }

  /**
   * Fetches the list of categories of NYTimes bestsellers from our internal database if such list exists,
   * and from the NYTimes API otherwise
   */
  getRemoteCategories() {
    fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${this.apiKey}`)
      .then(response => response.json())
      .then(data => {
        const categoryNames = [];
        data.results.forEach(result => 
          categoryNames.push({list_name: result.list_name, list_name_encoded: result.list_name_encoded})
        );
        this.postCategoriesToLocal({categories: categoryNames}).catch(error => alert(error));
        this.props.setCurrentToFirstCategory(categoryNames);
      })
      .catch(error => alert(error)); 
  }

  /**
   * Creates an async POST request to store, in our internal database, the list of NYTimes bestseller categories  
   * @param {object} categories the categories to be stored on the back-end
   * @returns the list of successfully stored categories
   */
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
        <Navbar className="navBar" bg="dark" variant="dark" expand="sm" sticky="top">
          <Navbar.Brand href="#"> NYTimes Bestsellers </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                {
                  this.props.categoryNames && 
                  this.props.categoryNames.map(categoryName => 
                    <NavDropdown.Item onClick={() => this.props.changeCategory(categoryName)} >
                      {categoryName.list_name} 
                    </NavDropdown.Item>
                  )
                }
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <h2 style={{textAlign: "center", padding: "20px 0px 20px 0px"}}> {this.props.currCategory} </h2>

        {
          this.props.currCategoryEncoded ? 
            <Books key={this.props.currCategoryEncoded} listNameEncoded={this.props.currCategoryEncoded} /> : 
            <> </>
        }
      </>
    );
  }
}

const mapStateToProps = state => ({
  categoryNames: state.categoryReducer.categoryNames, 
  currCategory: state.categoryReducer.currCategory, 
  currCategoryEncoded: state.categoryReducer.currCategoryEncoded
}); 
const mapDispatchToProps = dispatch => ({
  setCurrentToFirstCategory: categoryNames => dispatch(setCategories(categoryNames)),
  changeCategory: nextCategory => dispatch(changeCategory(nextCategory))
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);