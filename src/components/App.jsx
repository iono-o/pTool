import React, { useRef, useState } from "react";
import ToDoItem from "./ToDoItem";
import ToDoInput from "./ToDoInput";
import Timer from "./Timer";
import AmbientPlayer from "./AmbientPlayer";
import Weather from "./Weather";

function App() {
  const [items, setItems] = useState([]);

  function addItem(item) {
    setItems((prevItems) => {
      return [...prevItems, item];
    });
  }

  function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((item, index) => {
        return index !== id;
      });
    });
  }
  return (
    <div className="dashboard">
      <div className="todo hover-effect">
        <div className="heading">
          <h1>📋 To-Do List</h1>
          <ToDoInput add={addItem} />
          <div>
            <ul className="no-bullets">
              {items.map((todoItem, index) => (
                <ToDoItem
                  key={index}
                  id={index}
                  text={todoItem}
                  onChecked={deleteItem}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="pomodoro hover-effect">
        <h2>🍅 pomodoro timer</h2>
        <div className="timer-container">
          <Timer />
        </div>
      </div>
      <div className="bottom-right">
        <div className="white-noise hover-effect">
          <h2>🎼 white noise </h2>
          <div className="timer-container">
            <AmbientPlayer />
          </div>
        </div>
        <div className="weather hover-effect">
          <h2>⛅️ weather</h2>
          <div className="timer-container">
            <Weather />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
