const axios = require("axios")
const db = require("../models")
//here we will assemble the googlebooks api routes

module.exports = {
    findBook: function (req, res) {
        const { query: params } = req;
        axios
            .get(`https://www.googleapis.com/books/v1/volumes?`, { params })
            .then((res) => {
                res.data.items.filter(
                    res =>
                        res.volumeInfo.title &&
                        res.volumeInfo.infoLink &&
                        res.volumeInfo.authors &&
                        res.volumeInfo.description &&
                        res.volumeInfo.imageLinks &&
                        res.volumeInfo.imageLinks.thumbnail
                )
            }).then(apiBooks =>
                db.Book.find().then(dbBooks =>
                    apiBooks.filter(apiBook =>
                        dbBooks.every(dbBook => dbBook.google.Id.toString() !== apiBook.id)
                    )
                )
            ).then(books => res.json(books))
            .catch(err => res.status(422).json(err));
    }

}