const users = [];

const addUser = ({ id, username, room }) => {
  // data clearen
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //Validatie
  if (!username || !room) {
    return {
      error: "Username en room zijn verplicht"
    };
  }

  //kijken of user bestaat
  const existingUser = users.find(user => {
    return user.room === room && user.username === username;
  });

  //Validatie username
  if (existingUser) {
    return {
      error: "Username bestaat al "
    };
  }

  //store user
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = id => {
  const index = users.findIndex(user => {
    return user.id === id;
  });

  if (index !== 1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = id => {
  return users.find(u => u.id === id);
};

const getUsersInRoom = room => {
  room = room.trim().toLowerCase();
  return users.filter(user => user.room === room);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
};
