import prisma from "../prisma/client.js";

export const getAllProducts = async () => {
    return await prisma.product.findMany();
}

export const createProduct = async (data) => {
    return await prisma.product.create({data})
}