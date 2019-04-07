import React from 'react';
import './SearchBar.css';



class SearchBar extends React.Component {
  //70. In the SearchBar component, create a contstructor method with a call to super(props).
//Inside of the constructor, bind the current value of this to .search()
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.search = this.search.bind(this);
  }

//Pass .search() to the SearchBar component as an onSearch attribute.
  search() {
    this.props.onSearch(this.state.term);
  }

//71.In SearchBar.js create a method called handleTermChange with the following functionality:
//Accepts an event argument
//Sets the state of the search bar’s term to the event target’s value.

//72. In the SearchBar.js constructor method, bind the current value of this to this.handleTermChange.

handleTermChange(event) {
  this.setState({term: event.target.value});
}

//73.In the search bar’s <input> element, add an onChange attribute and set it equal to this.handleTermChange.
  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song Title" onChange={this.handleTermChange}/>
        <a onClick={this.search}>SEARCH</a>
      </div>


    );
  }
}
export default SearchBar;
