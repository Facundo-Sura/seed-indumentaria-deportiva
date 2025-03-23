const {
  getAllUsers,
  getUserId,
  getUserName,
  postUser,
} = require("../controllers/userController");
const getUsersHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      // const userByName = await getUserName(name);
      res.status(200).json(await getUserName(name));
    } else {
      const response = await getAllUsers();
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDetailHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getUserId(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postUserHandler = (req, res) => {
  const { name, email, password } = req.body;
  try {
    const response = postUser(name, email, password);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putUserHandler = (req, res) => {
  res.status(200).send("Usuario modificado completamente");
};

const patchUserHandler = (req, res) => {
  res.status(200).send("Usuario modificado parcialmente");
};

const deleteUserHandler = (req, res) => {
  res.status(200).send("Usuario eliminado");
};

module.exports = {
  getUsersHandler,
  getDetailHandler,
  postUserHandler,
  putUserHandler,
  patchUserHandler,
  deleteUserHandler,
};
