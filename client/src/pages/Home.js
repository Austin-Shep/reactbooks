import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form";
import Book from "../components/Book";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

class Home extends Component {
    state = {
        books: [],
        q: "",
        message: "Search For A Book Now!"
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    getBooks = () => {
        API.getBooks(this.state.q)
            .then(res => {
                console.log(res)
                this.setState({ books: res.data })
            })
            .then(response => response.json())
            .then((data) => {
                data.items.forEach((item, i) => {
                    let element = {};
                    if (typeof item.volumeInfo.title != 'undefined') {
                        element.title = item.volumeInfo.title;
                    } else {
                        element.title = null;
                    }
                    if (typeof item.volumeInfo.authors != 'undefined') {
                        element.authors = item.volumeInfo.authors[0];
                    } else {
                        element.authors = null;
                    }
                    if (typeof item.volumeInfo.averageRating != 'undefined') {
                        element.rating = item.volumeInfo.averageRating;
                    } else {
                        element.rating = null;
                    }
                    if (typeof item.volumeInfo.ratingsCount != 'undefined') {
                        element.ratingsCount = item.volumeInfo.ratingsCount;
                    } else {
                        element.ratingsCount = null;
                    }
                    if (typeof item.volumeInfo.publisher != 'undefined') {
                        element.publisher = item.volumeInfo.publisher;
                    } else {
                        element.publisher = null;
                    }
                    if (typeof item.volumeInfo.publishedDate != 'undefined') {
                        element.publishedDate = item.volumeInfo.publishedDate;
                    } else {
                        element.publishedDate = null;
                    }
                    if (typeof item.volumeInfo.description != 'undefined') {
                        element.description = item.volumeInfo.description;
                    } else {
                        element.description = null;
                    }
                    if (typeof item.volumeInfo.imageLinks != 'undefined' &&
                        typeof item.volumeInfo.imageLinks.thumbnail != 'undefined') {
                        element.thumbnail = item.volumeInfo.imageLinks.thumbnail.replace(/http:/i, 'https:');

                    } else {
                        element.thumbnail = null;
                    }
                    if (typeof item.saleInfo.listPrice != 'undefined') {
                        element.price = item.saleInfo.listPrice.amount;
                    } else {
                        element.price = null;
                    }
                    if (typeof item.saleInfo.buyLink != 'undefined') {
                        element.purchase = item.saleInfo.buyLink;
                    } else {
                        element.price = null;
                    }
                    if (typeof item.volumeInfo.description != 'undefined') {
                        element.description = item.volumeInfo.description;
                    } else {
                        element.description = null;
                    }
                    this.setState({ books: data.items.splice(i, 1, element)});
                })
            })
            .catch(() =>
                this.setState({ books: [], message: "No New Books Found, Try Again!" }));
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.getBooks();
    };

    handleBookSave = id => {
        const book = this.state.books.find(book => book.id === id);

        API.saveBook({
            googleId: book.id,
            title: book.volumeInfo.title,
            subtitle: book.volumeInfo.subtitle,
            link: book.volumeInfo.infoLink,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks.thumbnail
        }).then(() => this.getBooks());
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1 className="text-center">
                                <strong>(React) Google Books Search</strong>
                            </h1>
                            <h2 className="text-center">Search and Save Books of Interest</h2>
                        </Jumbotron>
                    </Col>
                    <Col size="md-12">
                        <Card title="Book Search" icon="far fa-book">
                            <Form
                                handleInputChange={this.handleInputChange}
                                handleFormSubmit={this.handleFormSubmit}
                                q={this.state.q}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col size="md-12">
                        <Card title="Results">
                            {this.state.books.length ? (
                                <List>
                                    {this.state.books.map(book => (
                                        <Book
                                            key={book.id}
                                            title={book.volumeInfo.title}
                                            subtitle={book.volumeInfo.subtitle}
                                            link={book.volumeInfo.infoLink}
                                            authors={book.volumeInfo.imageLinks.thumbnail}
                                            Button={() => (
                                                <button
                                                    onClick={() => this.handleBookSave(book.id)}
                                                    className="btn btn-primary ml-2"
                                                >Save
                                                </button>
                                            )}
                                        />
                                    ))}
                                </List>
                            ) : (
                                    <h2 className="text-center">{this.state.message}</h2>
                                )}
                        </Card>
                    </Col>
                </Row>
                <Footer />
            </Container>
        );
    }
}

export default Home;