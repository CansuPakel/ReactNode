const express = require("express");
import mongooseDb from "../../utils/mongooseDb";
import Book from "../../models/Book";

mongooseDb();

export default async (req, res) => {
  const books = await Book.find();
  res.status(200).json(books);
};
