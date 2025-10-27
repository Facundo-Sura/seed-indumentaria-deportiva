const { Router } = require('express');
const productRouter = require('./productRoutes');
const router = Router();

// Define your routes
router.get('/', (req, res) => {
  res.json({ message: 'Hola desde Express en Vercel!' });
});

router.use('/products', productRouter);

module.exports = router;