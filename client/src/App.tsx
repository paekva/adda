import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {getToken} from "./api/auth";

function App() {

    useEffect(() => {
        getToken(`grant_type=password&username=admin&password=admin1234`);

    }, [])
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
