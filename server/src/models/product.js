const { supabase } = require('../db');

const Product = {
  // Solo métodos básicos - la lógica compleja va en el controller
  async insert(productData) {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();
    return { data, error };
  },

  async selectAll() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
    return { data, error };
  },

  async selectByBarcode(codigoDeBarras) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('codigoDeBarras', codigoDeBarras)
      .single();
    return { data, error };
  },

  async update(codigoDeBarras, updateData) {
    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('codigoDeBarras', codigoDeBarras)
      .select()
      .single();
    return { data, error };
  },

  async delete(codigoDeBarras) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('codigoDeBarras', codigoDeBarras);
    return { error };
  }
};

module.exports = Product;