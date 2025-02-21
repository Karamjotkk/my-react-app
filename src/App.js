import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [filterOption, setFilterOption] = useState('alphabets');

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput); // Parse input JSON
      const res = await fetch('http://localhost:5000/bfhl', { // Make API call to backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });
      const data = await res.json();
      setResponse(data); // Set response to state
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Invalid JSON format'); // Handle invalid JSON input
    }
  };

  return (
    <div className="App">
      <h1>Welcome to Karamjot Kaur's Backend App</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON data"
      />
      <button onClick={handleSubmit}>Submit</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {response && (
        <div>
          <h2>Filtered Data</h2>
          <select
            onChange={(e) => setFilterOption(e.target.value)}
            value={filterOption}
          >
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>

          <div>
            {filterOption === 'alphabets' && <p>{JSON.stringify(response.alphabets)}</p>}
            {filterOption === 'numbers' && <p>{JSON.stringify(response.numbers)}</p>}
            {filterOption === 'highest_alphabet' && <p>{JSON.stringify(response.highest_alphabet)}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
