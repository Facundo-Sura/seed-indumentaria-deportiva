const { User } = require("../db");
const axios = require("axios");
const URL = "https://fakestoreapi.com/users";

const getAllUsers = async () => {
  // const usersDb = await User.findAll(); //=> usuarios de la base de datos
  const response = await axios.get(URL);
  const users = response.data;
  return users;
};

const getUserId = async (id) => {
  // const user = await User.findByPk(id); //=> usuario de la base de datos con ese id;
  const  user = await axios.get(`${URL}/${id}`);
  return user.data;
};

const getUserName = async (name) => {
  const user = (await axios.get(`${URL}`)).data.filter(
    (user) => user.username === name
  );

  if (!user) {
    const user = await User.findAll({
      where: {
        name: name,
      },
    });//=> usuario de la base de datos con ese nombre;
}
  return user;
};

const getEmail = async (email) => {
  const user = (await axios.get(`${URL}?email=${email}`)).data.filter(
    (user) => user.email === email
  );

  if (user.length === 0) {
    // Intentar buscar en la base de datos
    const dbUser = await User.findAll({
      where: {
        email: email,
      },
    });
    
    if (dbUser.length === 0) {
      throw Error("Email not found");
    }
    return dbUser;
  }
  
  return user;
};

const postUser = async (email, name, password) => {
  return await User.create({
    email,
    name,
    password,
  });
};

const postAdmin = async (name, email, password, role, phone, image) => {
  return await User.create({
    name,
    email,
    password,
    role,
    phone,
    image
  });
};

const putUser = async (id, name, email, password) => {
  return await User.update(
    {
      name,
      email,
      password,
    },
    {
      where: {
        id,
      },
    }
  );
};

const patchUser = async (id, name, email, password) => {
  return await User.update(
    {
      name,
      email,
      password,
    },
    {
      where: {
        id,
      },
    }
  );
};

const deleteUser = async (id) => {
  return await User.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAllUsers,
  getUserId,
  getUserName,
  getEmail,
  postUser,
  postAdmin,
  putUser,
  patchUser,
  deleteUser,
}