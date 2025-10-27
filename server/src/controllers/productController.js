const Product = require("../models/Product");
const uploadToCloudinary = require("../middlewares/cloudinaryUpload");

const createProduct = async (req, res) => {
  try {
    let imageUrls = [];
    
    // Si hay archivos, subirlos a Cloudinary
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);
        imageUrls.push(result.secure_url);
      }
    }

    const productData = {
      ...req.body,
      imagenes: imageUrls.length > 0 ? imageUrls : req.body.imagenes || []
    };

    const { data, error } = await Product.insert(productData);

    if (error) throw error;
    res.status(201).json({
      message: "Producto creado",
      product: data,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const { data, error } = await Product.selectAll();

    if (error) throw error;
    res.json({ products: data, count: data.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductByBarcode = async (req, res) => {
  try {
    const { barcode } = req.params;
    const { data, error } = await Product.selectByBarcode(barcode);

    if (error) throw error;
    res.json({ product: data });
  } catch (error) {
    res.status(404).json({ error: "Producto no encontrado" });
  }
};

const getProductByName = async (req, res) => {
  try {
    const { name } = req.params;
    const { data, error } = await Product.selectByName(name);

    if (error) throw error;
    res.json({ product: data });
  } catch (error) {
    res.status(404).json({ error: "Producto no encontrado" });
  }
}

const updateProduct = async (req, res) => {
  try {
    const { barcode } = req.params;
    let updateData = { ...req.body };

    // Si hay nuevas imágenes, subirlas a Cloudinary
    if (req.files && req.files.length > 0) {
      let newImageUrls = [];
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer);
        newImageUrls.push(result.secure_url);
      }
      
      // Combinar imágenes existentes con nuevas si es necesario
      const existingImages = req.body.existingImages ? 
        JSON.parse(req.body.existingImages) : [];
      
      updateData.imagenes = [...existingImages, ...newImageUrls];
    }

    const { data, error } = await Product.update(barcode, updateData);

    if (error) throw error;
    res.json({ message: "Producto actualizado", product: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { barcode } = req.params;
    const { error } = await Product.delete(barcode);

    if (error) throw error;
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductByBarcode,
  updateProduct,
  deleteProduct,
};
