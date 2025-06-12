import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

/** component displays one todo item with button that removes it */
function ToDoItem(props) {
  return (
    <div class="item">
      <button
        className="item-button red-button"
        onClick={() => {
          props.onChecked(props.id);
        }}
      >
        <HighlightOffIcon style={{ fontSize: 15 }} />
      </button>
      <li>{props.text}</li>
    </div>
  );
}

export default ToDoItem;
