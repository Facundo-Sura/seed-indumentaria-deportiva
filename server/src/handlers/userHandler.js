const {
  getAllUsers,
  getUserId,
  getUserName,
  postUser,
  patchUser,
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
//modificacion completa de usuario
const putUserHandler = (req, res) => {
  const {id} = req.params;
  try {
    const response = putUser(id);
    res.status(200).json(response)
    console.log("Usuario modificado completamente");
  } catch (error) {
    res.status(400).json({error: error.message})
    console.log("Error al modificar el usuario");
  }
};
//modificacion parcial de usuario
const patchUserHandler = (req, res) => {
  const {id} = req.params;
  try {
    const response = patchUser(id);
    res.status(200).json(response)
    console.log("Usuario modificado parcialmente");    
  } catch (error) {
    res.status(400).json({error: error.message})
    console.log("Error al modificar parcialmente el usuario");
  }
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
