import React, { useEffect, useState } from 'react'

// For user to download something off the web
const downloadTxtFile = () => {
  const element = document.createElement("a");
  const file = new Blob(["hello world"], {
    type: "text/plain"
  });
  element.href = URL.createObjectURL(file);
  element.download = "myFile.txt";
  document.body.appendChild(element);
  element.click();
};

export function UserInput() {
    const [name, setname] = useState("");
    
    function NameChange(e) {
        setname(e.target.value);
        console.log(name);
    }
    
    return (
      <dir>
      <input 
        value = {name}
        onChange = {NameChange}
      />
      <button onClick={downloadTxtFile}>Download txt</button>
      </dir>
    )
}
