import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FilteredBookItem from './FilteredBookItem';

class FilterBooks extends Component 
{

    handleChange = (event) => {
        if (this.props.searchString) {
            this.setState({ searchString: event.target.value })
            this.props.searchString(event.target.value)
        }
    }

    componentWillMount()
    {
        this.setState({ searchString: '' })
    }
    
    render(){

        const {filteredBooks, books, results, updateShelf} = this.props;

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.handleChange} />
                    </div>
                </div>
                <div className="search-books-results">
                    {(this.state.searchString.length > 2) ? (
                        <h4 className="search-results">
                            Search results found for <strong> "{this.state.searchString}"</strong>: 
                            &nbsp;<strong>{filteredBooks.length} books.</strong>
                        </h4>
                    ):('')
                    }
                    <ol className="books-grid">
                        {   
                            (filteredBooks.length > 0 && this.state.searchString.length > 2) ? (
                                
                                filteredBooks.map((book) => (
                                    <FilteredBookItem book={book} books={books} updateShelf={updateShelf} key={book.id} />
                                ))

                            ) : (
                                <h1>{results}</h1>
                            )
                        }
                    </ol>
                </div>
          </div>
        )
    }
}

export default FilterBooks