import React from "react";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";

/** component displays input for todo list*/
function ToDoInput(props) {
  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  const [inputText, setInputText] = useState("");

  return (
    <div className="form">
      <input onChange={handleChange} type="text" value={inputText} />
      <button
        className="custom-button green-button"
        style={{ padding: "3px 7px" }}
        onClick={() => {
          props.add(inputText);
          setInputText("");
        }}
      >
        <span>
          <AddBoxIcon />
        </span>
      </button>
    </div>
  );
}

export default ToDoInput;
