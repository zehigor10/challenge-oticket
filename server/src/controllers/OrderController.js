import * as orderService from '../services/orderService.js';


export const getOrders = async (request, response) => {
  try {
    const orders = await orderService.getAllOrders();
    response.status(200).send({
      message: 'Orders retrived successfully',
      orders
    });
  } catch (error) {
    res.status(500).message({ error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    await orderService.createOrder(req.body);
    res.status(201).send({
        message: 'Order created successfully'
    });
  } catch (error) {
    res.status(500).send({ error: error.message || 'Occurred an error on create order' });
  }
};
