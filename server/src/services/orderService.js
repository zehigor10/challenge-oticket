import prisma from '../prisma/client.js';

export const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: { customer: true, 
      products: {          
      include: {
        product: true,   
      },
    },
    },
  });
};
 
export const createOrder = async (data) => {
  return await prisma.order.create({ 
    data: {
      customerId: data.customerId,
      status: data.status,
      products: {
        create: data.products.map((productId) => ({
          product: { connect: { id: productId } },
        })),
      },
    },
  });
};
