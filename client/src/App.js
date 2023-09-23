import { useState, useEffect } from 'react';
import Axios from 'axios';
import React from 'react';
import './App.css';

function App() {
  const [questTitle, setQuestTitle] = useState('');
  const [questText, setQuestText] = useState('');

  const submitQuest = () => {
    Axios.post("http://localhost:3001/api/insert", {
      questTitle: questTitle, 
      questText: questText,
    }).then(() => {
      alert('successful insert');
    });
  };

  return (
    <div className="App">
      <header>
        <title>To Do List</title>
      </header>
      <div className="grid-container-whole-page">
        <main>
          <div className="quest-details">
            <div className="quest-title" id="quest-title">Quest Title</div>
            <div className="quest-summary-container">
              <div className="quest-summary-title">Quest Summary</div>
              <input type="text" id="quest-title-input" placeholder="Enter Quest Title" onChange={(e) => {
                setQuestTitle(e.target.value);
              }} />
              <textarea type="text" id="quest-summary-input" placeholder="Enter Quest Text" onChange={(e) => {
                setQuestText(e.target.value);
              }} />
              <p style={{ marginLeft: '0.5%' }}>Click the red button to add quest objectives</p>
              <button id="add-objective-button">+</button> {/* Add the + icon */}
              <div id="additional-input-container"></div>
            </div>
            <div className="rewards-summary-container">
              <div className="rewards-title"></div>
            </div>
            <div className="accept-decline-container">
              <button className="accept" id="accept-quest-button" onClick={submitQuest}>Accept</button>
              <button className="decline" id="decline-quest-button">Decline</button>
            </div>
          </div>
        </main>
        <aside>
          <div className="quest-list">
            <div className="quest-list-title">Quests</div>
          </div>
        </aside>
      </div>
      <p>WoW To-do list</p>
    </div>
  );
}

export default App;
