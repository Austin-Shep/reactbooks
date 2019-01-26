import React from "react";

// Container component
export function Container({ fluid, children }) {
    return <div className={`container${fluid ? "-fluid" : ""}`}>{children}</div>;
}

// Row component
export function Row({ fluid, children }) {
    return <div className={`row${fluid ? "-fluid" : ""}`}>
    {children}</div>;
}

// Col component
// does this= <Col size="md-12">
export function Col({ size, children }) {
    return (
        <div
            className={size
                .split(" ")
                .map(size=> "col-" + size)
                .join(" ")}
        >{children}</div>
    );
}