var React = require('react');
var ReactDOM = require('react-dom');


class Search extends React.Component {
  
  render() {
    
    return(
      <div className="search">
        <p className="comment-header">{this.props.author}</p>          
      </div>
    );
  }
}



class SearchBox extends React.Component {
  constructor() {
    super();

    this.state = {
      searches: [
        { id: 1, author: 'Jack'},
        { id: 2, author: 'Vidush'}
      ]
    };
  }
  render() {
    const searches = this._getSearches();
    return (
      <div className='search-box'>
        <SearchList addSearch={this._addSearch.bind(this)} />
        <h3>Searches</h3>
        <div className='seach-list'>
          {searches}
        </div>
      </div>
    );
  }
  _addSearch(searchAuthor) {
    let search = {
      id: this.state.searches.length + 1,
      author: searchAuthor
    };
    this.setState({ 
      searches: this.state.searches.concat([search])
    });
  }

  _getSearches() {
    return this.state.searches.map((search) => {
      return (<Search
                author={search.author}
                key={search.id} />);
    })
  }
}

class SearchList extends React.Component {
  render() {
    return (
      <form className='search-list' onSubmit={this._handleSubmit.bind(this)}>
        <div className='search-list-fields'>
          <input placeholder="Search Box" ref={(value) => this._author = value}/>
        </div>
        <div className='search-list-actions'>
          <button type='submit'>
            submit
          </button>
        </div>
      </form>
    );
  }
  _handleSubmit(e) {
    e.preventDefault();

    this.props.addSearch(this._author.value);

    this._author.value = '';
    
  }
}

ReactDOM.render(
  <SearchBox />,  document.getElementById('app')
  );






