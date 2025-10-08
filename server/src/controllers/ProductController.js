import * as productService from '../services/productService.js';


export const getProducts = async (request, response) => {
  try {
    const products = await productService.getAllProducts();
    response.status(200).send({
      message: 'Products retrived successfully',
      products
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    await productService.createProduct(req.body);
    res.status(201).send({
        message: 'Product created successfully'
    });
  } catch (error) {
    res.status(500).send({ error: error.message || 'Occurred an error on create product' });
  }
};
