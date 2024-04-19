// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

//helper functions 
const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);


const addUser = (user) => {
  if (user["id"] === undefined){
    user["id"] = randomId();
  }
  
  users["users_list"].push(user);
  return user;
  };

const removeUserById = (id) =>
  users["users_list"] = users["users_list"].filter(user => user.id !== id);



const findUserByName_Job = (name, job) => {
  return users["users_list"].filter(
    (user) => (user["name"] === name && 
    user["job"] === job)
  );
};

const getRandomUppercaseChar= () => {
  const r = Math.floor(Math.random() * 26);
  return String.fromCharCode(65 + r);
}

const randomId = () => { 
  let prefix = new Array(3).fill().map(() => getRandomUppercaseChar()).join("");
  let integer = Math.floor((Math.random() * 999) * 1);
  return prefix + integer;

};

//get requests 
app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

//to-do: extend this to match name and job 
//Second, implement an additional action to get all users that match a
//given name and a given job. Hint: look at what we did in step 4 and extend it.
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name && job ) {
    let result = findUserByName_Job(name, job);
    result = { users_list: result };
    res.send(result);
  } 
  else if (name){
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  }
  else {
    res.send(users);
  }
});


//Post requests 
app.post("/users", (req, res) => {
  const userToAdd = req.body;

  //added this too 
  let newUser = addUser(userToAdd);
  res.status(201).send(newUser);
});

//delete request 
app.delete("/users/:id", (req, res) => {
  const userToDel = req.params["id"];
  let result = removeUserById(userToDel);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send("Delete Successful.");
  }
});


//database
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};