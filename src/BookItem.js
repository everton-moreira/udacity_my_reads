import React, { Component } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import bgImage from './icons/no_image_available.png';

class BookItem extends Component 
{

    updateShelf = (event) => {
        let shelf = event.target.value;
        confirmAlert({
            title: 'Attention',
            message: 'Confirm update shelf?',
            buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    this.props.updateShelf(this.props.book, shelf);
                }
            },
            {
                label: 'No'
            }
            ]
        })
    }
    render(){

        const {book, filterShelf} = this.props;

        const bookImage = (book.imageLinks && book.imageLinks.thumbnail) 
                            ? book.imageLinks.thumbnail : bgImage;
        
        return(
            <li key={book.id}>
                <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookImage})` }}></div>
                    <div className="book-shelf-changer">
                    <select defaultValue={filterShelf} onChange={this.updateShelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        )
    }
}

export default BookItem