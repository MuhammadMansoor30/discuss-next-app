import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

// CReating a new Db object to access database across our application.