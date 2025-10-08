import prisma from "../prisma/client.js";

export const getAllCustomers = async () => {
    return await prisma.customer.findMany();
}

export const createCustomer = async (data) => {
    return await prisma.customer.create({ data })
}