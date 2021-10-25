import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useBookSearch(query, pageNumber) {
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [books, setBooks] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setBooks([])
  }, [query])

  useEffect(() => {
    setIsLoading(true)
    setHasError(false)

    const CancelToken = axios.CancelToken;
    let cancel

    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: {
        q: query,
        page: pageNumber
      },
      cancelToken: new CancelToken(c => cancel = c)
    }).then(res => {
      setBooks(prevBooks => {
        return [...new Set([...prevBooks, ...res.data.docs.map(book => book.title)])]
      })
      setHasMore(res.data.docs.length > 0)
      setIsLoading(false)
    }).catch(err => {
      if (axios.isCancel(err)) return
      setHasError(true)
    })
    return () => cancel()
  }, [query, pageNumber])
  return { isLoading, hasError, books, hasMore }
}
