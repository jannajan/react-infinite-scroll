import React, { useState } from 'react'
import useBookSearch from './hooks/useBookSearch'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const handleSearch = (e) => {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  const {
    isLoading,
    hasError,
    books,
    hasMore
  } = useBookSearch(query, pageNumber)

  return (
    <div className="App">
      <header className="App-header">
        <div>Infinite Scroll Playground</div>
      </header>
      <>
        <input
          type="text"
          onChange={handleSearch}
        />
        {books.map((book, idx) => {
          return <div key={idx}>{book}</div>
        })}
        <div>{isLoading ? 'Loading search results...' : null}</div>
        <div>{hasError ? 'Oops, something went wrong' : null}</div>
      </>
    </div>
  );
}

export default App
