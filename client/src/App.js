import { useState, useEffect } from 'react';
import Axios from 'axios';
import React from 'react';
import './App.css';

function App() {
  const [questTitle, setQuestTitle] = useState('');
  const [questText, setQuestText] = useState('');
  const [questList, setQuestList] = useState([]);
  const [additionalObjectives, setAdditionalObjectives] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setQuestList(response.data);
    })
  });

  const submitQuest = () => {
    Axios.post("http://localhost:3001/api/insert", {
      questTitle: questTitle,
      questText: questText,
    });

    setQuestList([
      ...questList, { questTitle: questTitle, questText: questText }
    ]);
  };

  const addAdditionalObjectives = () => {
    setAdditionalObjectives([...additionalObjectives, '']); 
  };

  useEffect(() => {
    // This effect will run whenever additionalInputs change
    console.log('additionalInputs changed:', additionalObjectives);
  }, [additionalObjectives]);

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
              <button id="add-objective-button" onClick={addAdditionalObjectives}>+</button> {/* Add the + icon */}
              <div id="additional-input-container">
                {additionalObjectives.map((index) => (
                  <input
                    id="objective"
                    type="text"
                    key={index}
                    placeholder={`Objective ${index + 1}`}
                    onChange={(e) => {
                      // You can handle the input values here if needed
                    }}
                  />
                ))}
              </div>
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
            {questList.map((val) => {
              return (
                <h4>
                  QuestTitle: {val.questTitle} | QuestText: {val.questText}
                </h4>
              );
            })}
          </div>
        </aside>
      </div>
      <p>WoW To-do list</p>
    </div>
  );
}

export default App;
