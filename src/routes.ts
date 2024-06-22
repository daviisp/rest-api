import express, { Request, Response } from "express";
import { authorController } from "./controllers/author.controller";
import { bookController } from "./controllers/book.controller";

const router = express.Router();

router.get("/authors", authorController.getAllAuthors);
router.post("/author", authorController.createAuthor);
router.get("/author/:id", authorController.getAuthorById);
router.put("/author/:id", authorController.updateAuthor);
router.delete("/author/:id", authorController.deleteAuthor);

router.get("/books", bookController.getAllBooks);
router.post("/book", bookController.createBook);
router.get("/books/:id", bookController.getBookById);
router.put("/book/:id", bookController.updateBook);
router.delete("/book/:id", bookController.deleteBook);

export { router };
