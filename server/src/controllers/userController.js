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
  const user = (await axios.get(`${URL}/${id}`)).data;
  return user;
};

const getUserName = async (name) => {
  const user = (await axios.get(`${URL}`)).data.filter(
    (user) => user.username === name
  );
  // const userDb = await User.findAll({
  //   where: {
  //     name: name,
  //   },
  // });//=> usuario de la base de datos con ese nombre
  return user;
};

const postUser = async (name, email, password) => {
  return await User.create({
    name,
    email,
    password,
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
  postUser,
  putUser,
  patchUser,
  deleteUser,
};
