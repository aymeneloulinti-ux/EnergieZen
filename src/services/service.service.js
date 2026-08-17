import prisma from "../config/prisma.js";

console.log("Prisma:", prisma);

console.log("Prisma service:", prisma.service);

export const getAllServices = async () => {
    return prisma.service.findMany({
        where : {
            active : true
        },
        orderBy : {
            name : "asc"
        }
    })
}

export const getServiceBySlug = async (slug) => {
    return prisma.service.findUnique({
        where : {
            slug
        }
    })
}