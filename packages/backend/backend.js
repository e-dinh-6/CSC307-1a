// backend.js
import express, { response } from "express";
import Users from  "./user-services.js";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});



//get requests 
//get by id
app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  Users
    .findUserById(id)
    .then(user => res.send({users_list: user}))
    .catch(err => res.status(500).send("An error occurred: " + err));
});


//get by name,job, and whole list
app.get("/users", (req, res) => {
  const { name, job } = req.query;
  Users
    .getUsers(name, job)
    .then((result) =>{
      res.send(result);})
    .catch(err => res.status(500).send("An error occurred: " + err));
});


app.post("/users", (req, res) => {
  const userToAdd = req.body;
  Users
    .addUser(userToAdd)
    .then((newUser) => {
      const responseUser = { ...userToAdd, _id: newUser._id };
      res.status(201).send(responseUser);
    })
    .catch((err) => res.status(500).send("An error occurred: " + err));
});

//delete request 
app.delete("/users/:id", (req, res) => {
  const userToDel = req.params["id"];
  Users
    .deleteByID(userToDel)
    .then(result => {
			res.status(204).send("Deleted User");
		})
		.catch( error =>{
			res.status(400).send(`cannot delete`);
		});
  });
