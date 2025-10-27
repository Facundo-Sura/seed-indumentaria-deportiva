require('dotenv').config();
const { PORT } = process.env;
const server = require('./src/app');
const { testConnection } = require('./src/db');

// Iniciar servidor independientemente de la conexión a DB
testConnection().then((connected) => {
  server.listen(PORT, () => {
    console.log(`Servidor escuchando http://localhost:${PORT}`);
    if (!connected) {
      console.log('⚠️  Advertencia: Conexión a BD no verificada, pero servidor iniciado');
    }
  });
}).catch((error) => {
  console.log('Error:', error);
});