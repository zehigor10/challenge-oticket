import * as customerService from '../services/customerService.js';


export const getCustomers = async (request, response) => {
  try {
    const customers = await customerService.getAllCustomers();
    response.status(200).send({
      message: 'Customer retrived successfully',
      customers
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    }) 
  }
};

export const createCustomer = async (request, response) => {
  try {
    await customerService.createCustomer(request.body);
    response.status(201).send({
        message: 'Customer created successfully'
    });
  } catch (error) {
    response.status(500).send({ error: error.message || 'Occurred an error on create customer' });
  }
};
