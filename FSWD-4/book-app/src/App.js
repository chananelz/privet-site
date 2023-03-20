import React from "react";
import Book from "./book";

class Book_item {
  constructor(title, author, likes, onshelf, sample) {
    this.title = title;
    this.author = author;
    this.likes = likes;
    this.onshelf = onshelf;
    this.sample = sample;
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.arr_books = [
      new Book_item("aaa", "AAA", 1, true, "sample text1"),
      new Book_item("bbb", "BBB", 2, false, "sample text2"),
      new Book_item("ccc", "CCC", 12, true, "sample text3"),
    ];
  }
  render() {
    const mystyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial",
    };

    return (
      <div style={mystyle}>
        <Book
          title={this.arr_books[0].title}
          author={this.arr_books[0].author}
          likes={this.arr_books[0].likes}
          onshelf={this.arr_books[0].onshelf}
          sample={this.arr_books[0].sample}
        />
        <br />
        <Book
          title={this.arr_books[1].title}
          author={this.arr_books[1].author}
          likes={this.arr_books[1].likes}
          onshelf={this.arr_books[1].onshelf}
          sample={this.arr_books[1].sample}
        />
        <br />

        <Book
          title={this.arr_books[2].title}
          author={this.arr_books[2].author}
          likes={this.arr_books[2].likes}
          onshelf={this.arr_books[2].onshelf}
          sample={this.arr_books[2].sample}
        />
      </div>
    );
  }
}

export default App;
