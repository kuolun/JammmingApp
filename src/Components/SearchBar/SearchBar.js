import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { term: "Enter A Song, Album, or Artist" };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }
  search() {
    this.props.onSearch(this.state.term);
  }
  handleTermChange(e) {
    console.log(e.target.value);
    let newterm = e.target.value;
    this.setState(() => ({ term: newterm }));
  }
  render() {
    return (
      <div className="SearchBar">
        <input placeholder={this.state.term} onChange={this.handleTermChange} />
        <a>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
