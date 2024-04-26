// src/MyApp.jsx
import React, {useState, useEffect} from "react";
import Table from "./Table.jsx"; 
import Form from "./Form.jsx";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
      fetchUsers()
        .then((users) => setCharacters(users))
        .catch((error) => { console.log(error); });
    }, [] );


    function deleteUser(index){
      const charact = characters.filter((character, i) => {
        return i === index;
      });
      let url = "http://localhost:8000/users/" + charact[0]._id;
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
          if (res.status !== 204)
            throw new Error("Not Successful Delete");
          return filter_out(index);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function filter_out(index){
      const updated = characters.filter((character, i) => {
        return i !== index;
      });
      setCharacters(updated);
      
    }

      
      function fetchUsers() {
        return fetch("http://localhost:8000/users")
          .then((res) => {
            console.log("Response status:", res.status);
            return res.json();
          })
          .then((user) => {
    
            if (!Array.isArray(user)) {
              throw new Error("Invalid response data");
            }
            return user;
          })
          .catch((err) => {
            console.error("Error fetching users:", err);
            throw err;
          });
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

    return (
      <div className="container">
        <Table
          characterData={characters}
          removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList} />
      </div>
    );

    
}

export default MyApp;