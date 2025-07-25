import React, { useState } from 'react'

function App() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [review, setReview] = useState(null)

  const fetchSuggestions = async (input) => {
    setQuery(input)
    if (input.length > 1) {
      const res = await fetch(`https://restaurant-nlp-review-backenddocker.onrender.com/autocomplete?query=${input}`)
      const data = await res.json()
      setSuggestions(data.suggestions || [])
    } else {
      setSuggestions([])
    }
  }

  const fetchReview = async (name) => {
    const res = await fetch(`https://restaurant-nlp-review-backenddocker.onrender.com/review?restaurant=${encodeURIComponent(name)}`)
    const data = await res.json()
    setReview(data.review)
    setQuery(name)
    setSuggestions([])
  }

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Restaurant NLP Review</h1>
      <input
        value={query}
        onChange={(e) => fetchSuggestions(e.target.value)}
        placeholder="Type restaurant name..."
        style={{ width: '100%', padding: '8px', fontSize: '1rem' }}
      />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {suggestions.map((s, i) => (
          <li
            key={i}
            style={{ padding: '4px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
            onClick={() => fetchReview(s)}
          >
            {s}
          </li>
        ))}
      </ul>
      {review && (
        <div style={{ marginTop: '2rem', background: '#f9f9f9', padding: '1rem', borderRadius: '8px' }}>
          <h2>Review</h2>
          <p>{review}</p>
        </div>
      )}
    </div>
  )
}

export default App
