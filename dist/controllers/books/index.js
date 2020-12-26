"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
const express_1 = require("express");
const book_1 = __importDefault(require("./../../models/book"));
const mongoose_1 = __importDefault(require("mongoose"));
class BooksController {
    constructor() {
        this.path = '/books';
        this.router = express_1.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.listBooks);
        this.router.post(this.path, this.addBook);
        this.router.get(`${this.path}/:isbn`, this.findBook);
    }
    addBook(req, res) {
        let { isbn, title, authors } = req.body;
        // isbn: string, title: string, authors: [string]
        const book = new book_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            isbn,
            title,
            authors
        });
        return book
            .save()
            .then((result) => {
            return res.status(201).json({
                book: result
            });
        })
            .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
    }
    listBooks(req, res) {
        book_1.default.find()
            .exec()
            .then((books) => {
            return res.status(200).json({
                books: books,
                count: books.length
            });
        })
            .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
    }
    findBook(req, res) {
        const isbn = req.params.isbn;
        book_1.default.find({ isbn: isbn })
            .exec()
            .then((books) => {
            return res.status(200).json({
                books: books,
                count: books.length
            });
        })
            .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
    }
}
exports.BooksController = BooksController;
//# sourceMappingURL=index.js.map