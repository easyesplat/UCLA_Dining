import React, { useEffect, useState } from 'react'

export function UserInput() {
    const [name, setname] = useState("");
    
    function NameChange(e) {
        setname(e.target.value);
        console.log(name);
    }
    
    return (
      <input 
        value = {name}
        onChange = {NameChange}
      />
    )
}
