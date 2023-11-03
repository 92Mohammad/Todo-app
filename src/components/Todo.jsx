import { MdEdit, MdDelete } from "react-icons/md";
import React from "react";

export default function Todo(props) {
  // console.log('these are  props : ', props)

  const [checkBox, setCheckBox] = React.useState(false);

  function handleChange(event) {
    setCheckBox(event.target.checked);
  }

  return (
    <>
      <div
        className="todos--container"
        style={{ backgroundColor: !checkBox ? "#b8b894" : "#ccccb3 " }}
      >
        <div className="left-tods-section">
          <input
            type="checkbox"
            name="isChecked"
            checked={checkBox}
            onChange={handleChange}
          />
          <p style={{ textDecoration: checkBox ? "line-through" : "none" }}>
            {props.text}
          </p>
        </div>
        <div className="right-tods-section">
          <MdEdit className="edit-btn" />
          <MdDelete
            className="delete-btn"
            onClick={async () => {
              try {
                const response = await fetch(
                  "http://localhost:8000/deleteTodo",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      authorization: localStorage.getItem("token"),
                    },
                    body: JSON.stringify({
                      userId: props.id,
                    }),
                  }
                );
                if (response.status === 204) {
                  // if response is ok means that new todo item inserted successfully into database
                  // redirect on the todoPage so that react re-render the component with updated todos
                  window.location.href = "/todoPage";
                }
              } catch (error) {
                console.error(error);
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
