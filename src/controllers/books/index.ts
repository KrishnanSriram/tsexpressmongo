import BaseController from "../BaseController";
import {Request, Response, Router} from "express";
import Book from "./../../models/book";
import mongoose from "mongoose";

export class BooksController implements BaseController {
    public path: string = '/books';
    public router: Router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.listBooks);
        this.router.post(this.path, this.addBook);
        this.router.get(`${this.path}/:isbn`, this.findBook);
    }

    private addBook(req: Request, res: Response) {
        let {isbn, title, authors} = req.body;
        // isbn: string, title: string, authors: [string]
        const book = new Book({
            _id: new mongoose.Types.ObjectId(),
            isbn,
            title,
            authors
        });
        return book
            .save()
            .then((result: any) => {
                return res.status(201).json({
                    book: result
                })
            })
            .catch((error: any) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    }

    private listBooks(req: Request, res: Response) {
        Book.find()
            .exec()
            .then((books: any) => {
                return res.status(200).json({
                    books: books,
                    count: books.length
                });
            })
            .catch((error: any) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    }

    private findBook(req: Request, res: Response) {
        const isbn = req.params.isbn;
        Book.find({isbn: isbn})
            .exec()
            .then((books: any) => {
                return res.status(200).json({
                    books: books,
                    count: books.length
                });
            })
            .catch((error: any) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    }
}