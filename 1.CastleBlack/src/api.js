const {Router} = require("express");
const api = Router();

// This will be your data source
let players = [
  { id: 1, name: "Jon Snow", age: 23, health: 100, bag: [1] },
  { id: 2, name: "Littlefinger", age: 35, health: 100, bag: [2] },
  { id: 3, name: "Daenerys Targaryen", age: 20, health: 100, bag: [3] },
  { id: 4, name: "Samwell Tarly", age: 18, health: 100, bag: [4] }
];
let objects = [
  { id: 1, name: "spoon", value: -1 },
  { id: 2, name: "knife", value: -10 },
  { id: 3, name: "sword", value: -20 },
  { id: 4, name: "potion", value: +20 }
];

let response = {
  error: true, 
  code: 500,
  msg: ''
}

// EXAMPLE ENDPOINT: LIST ALL OBJECTS
api.get("/objects", function(req, res) {
  res.json(objects)
});

// 1. List all players.
api.get("/players", function(req, res) {
  res.json(players)
});

// 2. Create player: adds a new player to data source.
api.post('/players', function (req, res) {
  const {name, age, health, bag} = req.body
  if(!name || !age  || !health || !bag){
    response = {
      error: true,
      msg: 'Name / Age required',
      code: 404
    }
  } else{
    players.push({id: players.length+1, name, age: parseInt(age, 10), health: parseInt(health, 10), bag})
    response = {
      error: false,
      code: 200,
      msg: 'Player saved',
    }
  }
  res.send(response);
 });

// 3. Get player by id: returns the player for the given id.
 api.get('/players/:id', function (req, res) {
  const { id } = req.params
  const player = players.find(player => player.id === parseInt(id, 10))
  if(player){
    response = {
      data: player
    }
  } else{
    response = {
      data: 'Player not found'
    }
  }
  res.send(response);
 });
// 4. Arm a player with an object in its bag.
api.put('/players/arm/:id', function (req, res) {
  const { id } = req.params
  const player = players.find(player => player.id === parseInt(id, 10))
  if(player){
    player.bag[0] = player.bag[0]+1
    response = {
      data: player
    }
  } else{
    response = {
      data: 'Player not found'
    }
  }
  res.send(response);
 });

// 5. Kill a player: sets player health to 0.
 api.put('/players/kill/:id', function (req, res) {
  const { id } = req.params
  const player = players.find(player => player.id === parseInt(id, 10))
  if(player){
    player.health = 0
    response = {
      data: player
    }
  } else{
    response = {
      data: 'Player not found'
    }
  }
  res.send(response);
 });

//6. Create object: adds a new object to data source.
api.post('/objects', function (req, res) {
  const {name, value} = req.body
  if(!name || !value){
    response = {
      error: true,
      msg: 'Name / Value are required',
      code: 404
    }
  } else{
    objects.push({id: objects.length+1, name, value: parseInt(value, 10)})
    response = {
      error: false,
      code: 200,
      msg: 'Object saved',
    }
  }
  res.send(response);
 });

//7. Get object by id: returns the object for the given id.
api.get('/objects/:id', function (req, res) {
  const { id } = req.params
  const object = objects.find(object => object.id === parseInt(id, 10))
  if(object){
    response = {
      data: object
    }
  } else{
    response = {
      data: 'object not found'
    }
  }
  res.send(response);
 });

// 8. Upgrade object: increase/descrease the value of the object given by id with a new value
api.put('/objects/:id', function (req, res) {
  const { id } = req.params
  const { value } = req.body
  objects = objects.map(object => {
    if(object.id === parseInt(id, 10))
      return {...object, value: parseInt(value, 10)}
    return {...object}
  })
  if(objects){
    response = {
      data: objects
    }
  } else{
    response = {
      data: 'object not found'
    }
  }
  res.send(response);
 });

// 9. Destroy object: remove an object from available objects
api.delete('/objects/:id', function (req, res) {
  const { id } = req.params
  const obj = objects.find(object => object.id === parseInt(id, 10))
  const index = objects.indexOf(obj)
  if(index !== -1){
    objects.splice(index, 1)
    response = {
      data: objects
    }
  } else{
    response = {
      data: 'object not found'
    }
  }
  res.send(response);
 });

module.exports = api;
