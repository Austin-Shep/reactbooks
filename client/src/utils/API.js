import axios from "axios";

export default {
    //getBooks from Google API
    getBooks: function(q) {
        return axios.get("https://www.googleapis.com/books/v1/volumes?", 
            { params: { q: "title:" + q }}
        );
    },
    //retrieve all saved books
    getSavedBooks: function() {
        return axios.get("/api/books");
    },
    //delete book by id
    deleteBook: function(id) {
        return axios.delete("/api/books/" + id);
    },
    //save book to db
    saveBook: function(bookData) {
        return axios.post("/api/books", bookData);
    }
};