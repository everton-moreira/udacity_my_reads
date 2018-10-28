import React, { Component } from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

class FilteredBookItem extends Component 
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

        const {book, books} = this.props;

        let statusShelf = 'none';
        
        for (let item of books) {
            if (item.id === book.id) {
                statusShelf = item.shelf;
                break;
            }
        }

        return(
            <li key={book.id}>
                <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                    <select defaultValue={statusShelf} onChange={this.updateShelf}>
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

export default FilteredBookItem