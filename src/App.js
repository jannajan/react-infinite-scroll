import React, { useState, useRef, useCallback } from 'react'
import useBookSearch from './hooks/useBookSearch'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const {
    isLoading,
    hasError,
    books,
    hasMore
  } = useBookSearch(query, pageNumber)

  const observer = useRef()
  const lastBookRef = useCallback(node => {
    if (isLoading) {
      return
    }

    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })

    if (node) {
      observer.current.observe(node)
    }
  }, [isLoading, hasMore])

  const handleSearch = (e) => {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div>Infinite Scroll Playground</div>
      </header>
      <div className="root">
        <input
          className="search-box"
          type="text"
          placeholder="Search for book titles..."
          value={query}
          onChange={handleSearch}
        />
        {books.map((book, idx) => {
          if (books.length === idx + 1) {
            return <div ref={lastBookRef} key={idx}>{book}</div>
          } else {
            return <div key={idx}>{book}</div>
          }
        })}
        <div className="loading">{isLoading && !hasError && query !== '' ? 'Loading search results...' : null}</div>
        <div className="error">{hasError ? 'Oops, something went wrong' : null}</div>
      </div>
    </div>
  );
}

export default App
