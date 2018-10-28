import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookItem from './BookItem';

class BookList extends Component
{
    handleChange = (event) => {
        alert(event.target.value);
        /*
        if (this.props.searchString) {
            this.setState({ searchString: event.target.value })
            this.props.searchString(event.target.value)
        }
        */
    }

    render()
    {
        const { books, updateShelf } = this.props;

        return(
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.filter(item => item.shelf === 'currentlyReading')
                            .map((book) => (
                            
                                <BookItem book={book} filterShelf='currentlyReading' updateShelf={updateShelf} key={book.id} />
                            ))
                        }
                      
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.filter(item => item.shelf === 'wantToRead')
                            .map((book) => (
                            
                                <BookItem book={book} filterShelf='wantToRead' updateShelf={updateShelf} key={book.id} />
                            ))
                        }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.filter(item => item.shelf === 'read')
                            .map((book) => (
                            
                                <BookItem book={book} filterShelf='read' updateShelf={updateShelf} key={book.id} />
                            ))
                        }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )
    }
}

export default BookList