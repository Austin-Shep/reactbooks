import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import API from "../utils/API";

class Search extends Component {

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>Search Google Books</h1>
                        </Jumbotron>
                        <form>
                            <Input name="title" placeholder="Title (required)" onChange={this.inputHandle} />
                            <Input name="author" placeholder="Author (required)" onChange={this.inputHandle} />
                            <TextArea name="synopsis" placeholder="Synopsis (Optional)" onChange={this.inputHandle} />
                            <FormBtn>Submit Book</FormBtn>
                        </form>
                    </Col>
                </Row>
            </Container>
        )
    }

}