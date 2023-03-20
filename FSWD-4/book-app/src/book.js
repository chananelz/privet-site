import React from "react";
import { Button } from "./Button";

function Book(props) {
  return (
    <div style={{ display: props.onshelf ? "block" : "none" }}>
      <div style={{ "font-size": props.likes > 10 ? "30px " : "15px" }}>
        the title id is: {props.title}
      </div>
      <div>the author is: {props.author}</div>
      <div>text example: {props.sample}</div>
      <Button />
    </div>
  );
}

export default Book;
