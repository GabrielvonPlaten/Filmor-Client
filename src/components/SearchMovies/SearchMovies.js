import React, { useEffect } from 'react'
import './SearchMovies.sass';

const SearchResults = (props) => {
  return (
    <div className="searchresults-container">
      <h1 className="searchresults__title">This is the route for search results</h1>
      <p>Search: {props.match.params.query}</p>
    </div>
  )
}

export default SearchResults
