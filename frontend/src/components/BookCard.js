import React, { Component } from 'react';

class BookCard extends Component {
    static defaultProps = {coverPic: "", title: "Jane Doe", description: "", author: "", publisher: "", isbn: "None"}

    constructor(props) {
        super(props);
        this.state = {
            isShowingInfo: true
        };
    }

    displayInfo() {
        return (
            <div className="col-md-4"  style={{margin:"30px 0px 30px 0px"}}>
                <div className="card" style={{height: "100%"}}>
                    <img className="card-img-top" src={this.props.coverPic} alt="Card cap"/>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.title}</h5>
                        <p className="card-text">{this.props.description}</p>
                    </div>

                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"> <b>Author:</b> &nbsp; {this.props.author} </li>
                        <li className="list-group-item"> <b>Publisher:</b> &nbsp; {this.props.publisher} </li>
                        <li className="list-group-item"> <b>ISBN:</b> &nbsp; {this.props.isbn} </li>
                    </ul>

                    <div className="card-body" style={{bottom: 0}}>
                    <button type="button" className="btn btn-primary card-link" onClick={() => this.setState({isShowingInfo: false})}> 
                        Edit 
                    </button>
                    <button type="button" className="btn btn-danger card-link"> 
                        Delete 
                    </button>
                    </div>
                </div>
            </div>
        );
    }

    displayEdit() {
        return (
            <div className="col-md-4"  style={{margin:"30px 0px 30px 0px"}}>
                <div className="card" style={{height: "100%"}}>
                    <div className="card-body">
                        <form>
                        <div class="form-group">
                            <label for="bookTitle"> Title </label>
                            <input class="form-control" id="bookTitle" value={this.props.title} /> 
                        </div>
                        <div class="form-group">
                            <label for="bookDescription"> Description </label>
                            <textarea className="form-control" id="bookDescription" rows="5" value={this.props.description} />
                        </div>
                        <div class="form-group">
                            <label for="bookAuthor"> Author </label>
                            <input class="form-control" id="bookAuthor" value={this.props.author} /> 
                        </div>
                        <div class="form-group">
                            <label for="bookPublisher"> Publisher </label>
                            <input class="form-control" id="bookPublisher" value={this.props.publisher} /> 
                        </div>
                        <div class="form-group">
                            <label for="bookISBN"> ISBN </label>
                            <input class="form-control" id="bookISBN" type="text" readonly="readonly" placeholder={this.props.isbn}/> 
                        </div>
                        </form>
                    </div>

                    <div className="card-body" style={{position: "absolute", bottom: 0}}>
                    <button type="button" className="btn btn-primary card-link"> 
                        Done 
                    </button>
                    <button type="button" className="btn btn-danger card-link" onClick={() => this.setState({isShowingInfo: true})}> 
                        Cancel 
                    </button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <> {this.state.isShowingInfo ? this.displayInfo() : this.displayEdit() } </>
        );
    }
}

export default BookCard;
