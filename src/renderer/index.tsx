'use strict';
import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-exp.min.css';
import 'spectre.css/dist/spectre-icons.min.css';
import React from "react";
import ReactDOM from "react-dom";
import {ApolloProvider, useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import {InMemoryCache} from "apollo-cache-inmemory";
import {HttpLink} from "apollo-link-http";
import {ApolloClient} from "apollo-client";

const {ipcRenderer} = require('electron');

ipcRenderer.on('check-for-update-reply', (_event: any, arg: any) => {
    console.log(arg);
});
ipcRenderer.on('update-downloaded', (event: any, arg: any) => {
    console.log("Client update downloaded:", event, arg);
});

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:9001/'
});

const client = new ApolloClient({
    cache,
    link
});

const GET_USERS = gql`
    query GetUsers {
        getUsers {
            id
        }
    }
`;

const Test = () => {
    const {data} = useQuery(GET_USERS);
    console.log(data);
    return null
};

ReactDOM.render(<ApolloProvider client={client}><Test/></ApolloProvider>, document.getElementById("app"));
