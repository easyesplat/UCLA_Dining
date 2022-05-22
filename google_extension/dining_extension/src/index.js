import React, { useEffect, useRef, useState, Component } from 'react'
import ReactDOM from 'react-dom'
//import { ... FUNCTIONS ... } from './main.js';

// A function for basic interactive stuff
function WindowSize() {
  const [count, setCount] = useState(0);
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  return (
    <div>
      <div>{`Window width = ${width}`}</div>
      <div>{`Window height = ${height}`}</div>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <p>You clicked {count} times</p>
    </div>
  );
}

// Main rendering class component
class App extends Component {
    render() {      
    return (
      <div className="App">
        <h1>Hello, React!</h1>
        <button onClick={function() { console.log('click'); }}>
          Push to console log sth...
        </button>
        <h1>Hello again... </h1>
        <WindowSize />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
