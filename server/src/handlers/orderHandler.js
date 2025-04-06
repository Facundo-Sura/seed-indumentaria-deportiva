const getOrderHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getOrder(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const postOrderHandler = async (req, res) => {
  const { userId, product_id, quantity } = req.body;
  try {
    const response = await postOrder(userId, product_id, quantity);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOrderHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteOrder(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}