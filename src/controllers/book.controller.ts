import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const bookController = {
  getAllBooks: async (req: Request, res: Response) => {
    try {
      const books = await prisma.book.findMany();
      return res.status(200).json({ data: books });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }
    }
  },

  getBookById: async (req: Request, res: Response) => {
    const bookId = req.params!.id;

    try {
      const book = await prisma.book.findUnique({
        where: {
          id: bookId,
        },
      });
      return res.status(200).json({ data: book });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }
    }
  },

  createBook: async (req: Request, res: Response) => {
    try {
      const bookData = req.body;
      const book = await prisma.book.create({ data: bookData });
      return res.status(201).json({ data: book });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }
    }
  },

  updateBook: async (req: Request, res: Response) => {
    const bookId = req.params!.id;
    const bookData = req.body;

    try {
      const book = await prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          name: bookData.name,
          authorId: bookData.authorId,
        },
      });
      return res.status(200).json({ data: book });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }
    }
  },

  deleteBook: async (req: Request, res: Response) => {
    const bookId = req.params!.id;

    try {
      const book = await prisma.book.delete({
        where: {
          id: bookId,
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
