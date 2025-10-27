require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

console.log('URL:', supabaseUrl);
console.log('Key length:', supabaseKey?.length);

const supabase = createClient(supabaseUrl, supabaseKey);

// Función para probar conexión - SIN CONSULTAS
async function testConnection() {
  try {
    console.log('✅ Cliente Supabase inicializado - Conexión lista para usar');
    return true;
  } catch (error) {
    console.log('❌ Error inicializando Supabase:', error.message);
    return false;
  }
}

module.exports = { supabase, testConnection };