// src/MyApp.jsx
import React, {useState, useEffect} from "react";
import Table from "./Table"; 
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );


    function deleteUser(index){
      const charact = characters.filter((character, i) => {
        return i === index;
      });

      let url = "http://localhost:8000/users/" + charact[0].id;
      console.log("url: " + url)
      const promise = fetch(url, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
        },
      }); 
      return promise; 
    }

    function removeOneCharacter(index) {
      deleteUser(index)
      .then((res) => {
        if (res.status != 204)
          throw new Error("Not Successful Delete");
        })
      .then(() => filter_out(index))
      .catch((error) => {
        console.log(error);
      })
        
      }
      
    function filter_out(index){
      const updated = characters.filter((character, i) => {
        return i !== index;
      });
      setCharacters(updated);
      
    }
      return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
          />
          <Form handleSubmit={updateList} />
        </div>
      );

    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }

    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      return promise;
    }

    function updateList(person) { 
      postUser(person)
        .then((res) => {
          if (res.status != 201)
            throw new Error("Did not return status code 201. ERROR!");
          return res.json();
        })
        
        .then((newPer) => setCharacters([...characters, newPer])) 
        .catch((error) => {
          console.log(error);
        })
  }
    
}

export default MyApp;