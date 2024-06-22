import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const authorController = {
  getAllAuthors: async (req: Request, res: Response) => {
    try {
      const authors = await prisma.author.findMany({
        include: {
          books: true,
        },
      });
      return res.status(200).json({ data: authors });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }
    }
  },

  getAuthorById: async (req: Request, res: Response) => {
    const authorId = req.params!.id;
    try {
      const author = await prisma.author.findUnique({
        where: {
          id: authorId,
        },
        include: {
          books: true,
        },
      });
      return res.status(200).json({ data: author });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }
    }
  },

  createAuthor: async (req: Request, res: Response) => {
    const authorData = req.body;
    try {
      const author = await prisma.author.create({ data: authorData });
      return res.status(201).json({ data: author });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }
    }
  },

  updateAuthor: async (req: Request, res: Response) => {
    const authorId = req.params!.id;
    const authorData = req.body;

    try {
      const author = await prisma.author.update({
        where: {
          id: authorId,
        },
        data: {
          name: authorData.name,
        },
      });
      return res.status(200).json({ data: author });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }
    }
  },

  deleteAuthor: async (req: Request, res: Response) => {
    const authorId = req.params!.id;

    try {
      const deleteAuthor = await prisma.author.delete({
        where: {
          id: authorId,
        },
      });
      return res.status(204).send();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }
    }
  },
};
