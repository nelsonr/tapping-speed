import { useState, useRef } from 'react'
import './App.css'

function App () {
    const [inputValue, setInputValue] = useState("")
    const [tappingValues, setTappingValues] = useState([]);
    const [keyDownTimeStamp, setKeyDownTimeStamp] = useState(null);
    const inputRef = useRef(null);

    const onKeyDown = (ev) => {
        setKeyDownTimeStamp(ev.timeStamp);
    };

    const onKeyUp = (ev) => {
        const tappingValue = ev.timeStamp - keyDownTimeStamp;
        setTappingValues(tappingValues.concat(tappingValue));

        console.log(tappingValue + "ms")
    };

    const clear = () => {
        setTappingValues([]);
        setInputValue("");
        inputRef.current.focus();
    }

    const averageSpeed = Math.round(
        tappingValues.length > 0
            ? tappingValues.reduce((sum, val) => sum + val, 0) / tappingValues.length
            : 0
    );

    return (
        <div className="App">
            <section>
                <article>
                    <blockquote>Life is either a daring adventure or nothing at all.</blockquote>
                    -Helen Keller
                </article>
                <div className="prompt">
                    <input
                        type="text"
                        placeholder="Start typing..."
                        value={inputValue}
                        onInput={(ev) => setInputValue(ev.target.value)}
                        onKeyDown={onKeyDown}
                        onKeyUp={onKeyUp}
                        ref={inputRef}
                    />
                </div>
                <div className="stats">
                    <label>Key press avg. speed: <strong>{averageSpeed}ms</strong></label>
                    <button onClick={clear}>Clear</button>
                </div>
                <div className="tapping-values">
                    <ul>{tappingValues.map((val, index) => <li key={index}>{Math.round(val)}ms</li>)}</ul>
                </div>
            </section>
        </div>
    )
}

export default App
