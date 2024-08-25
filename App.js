import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const jsonObject = JSON.parse(jsonInput);
            const res = await axios.post('https://your-backend-url.herokuapp.com/bfhl', jsonObject);
            setResponse(res.data);
        } catch (error) {
            alert('Invalid JSON or request failed');
        }
    };

    const handleSelectChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(value);
    };

    return (
        <div className="App">
            <h1>21BCE2409</h1>
            <textarea 
                rows="4"
                cols="50"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON here'
            />
            <button onClick={handleSubmit}>Submit</button>

            {response && (
                <>
                    <select multiple={true} onChange={handleSelectChange}>
                        <option value="alphabets">Alphabets</option>
                        <option value="numbers">Numbers</option>
                        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
                    </select>

                    <div>
                        {selectedOptions.includes("alphabets") && (
                            <p>Alphabets: {JSON.stringify(response.alphabets)}</p>
                        )}
                        {selectedOptions.includes("numbers") && (
                            <p>Numbers: {JSON.stringify(response.numbers)}</p>
                        )}
                        {selectedOptions.includes("highest_lowercase_alphabet") && (
                            <p>Highest Lowercase Alphabet: {JSON.stringify(response.highest_lowercase_alphabet)}</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
