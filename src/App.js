import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList';
import FilterBooks from './FilterBooks';
import NotFound from './NotFound';
import Loading from './Loading';

class BooksApp extends React.Component {

  state = {
    books: [],
    filteredBooks: [],
    results: '',
    showSearchPage: false,
    loadPage: true
  }

  onSearchString = (searchString) => {
    
    this.setState(() => ({
        loadPage: true
    }))

    if(searchString.length > 2){
      BooksAPI.search(searchString)
      .then((filteredBooks) => {
          
          if(filteredBooks[0] === undefined) 
          {
            this.setState(() => ({
              filteredBooks: [],
              
            }))
            this.setState({results: 'No results found.'})
            this.setState(() => ({
              loadPage: false
          }))
          }else{
            this.setState(() => ({
                filteredBooks
            }))
            this.setState(() => ({
                loadPage: false
            }))
          }
      })
    }else{
      this.setState({results: '', filteredBooks: [], loadPage: false})
    }
  }

  updateShelf = (bookItem, shelfStatus) => {
    BooksAPI.update(bookItem, shelfStatus).then(response => {
      bookItem.shelf = shelfStatus;
      this.setState(prevState => ({
        books: prevState.books
          .filter(book => book.id !== bookItem.id)
          .concat(bookItem)
      }));
    });

    Alert.success(`The book <b>"${bookItem.title}"</b> has been moved to shelf <b>"${shelfStatus}"</b>`, {
        position: 'top-right',
        effect: 'slide',
        timeout: 3000
    });

  }

  componentDidMount()
  {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
      this.setState(() => ({
        loadPage: false
      }))
    })
  }

  render() {

    return (

      <div className="app">
        <Alert html={true} />
        { (this.state.loadPage) ? (<Loading />) : ''}
        <Switch>
          <Route exact path='/' render={() => (
            <BookList
              books={this.state.books} 
              updateShelf={this.updateShelf}
            />
          )} />

          <Route path='/search' render={({ history }) => (
            <FilterBooks searchString = { (text) => { this.onSearchString(text) }} 
                        filteredBooks={this.state.filteredBooks} 
                        books={this.state.books}
                        results={this.state.results} 
                        updateShelf={this.updateShelf}
            />
          )} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
