'use strict';
import React from "react";
import ReactDOM from "react-dom";
import gql from "graphql-tag";
import {InMemoryCache} from "apollo-cache-inmemory";
import {HttpLink} from "apollo-link-http";
import {ApolloClient} from "apollo-client";
import {ApolloProvider, Query} from 'react-apollo';

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

    return (<div>
        <Query query={GET_USERS}>
            {
                // @ts-ignore
                ({data, loading, error}) => {
                if (error) return (<h1>Error: {JSON.stringify(error)}</h1>);
                if (loading) return (<h1>Loading...</h1>);
                return (<h1>Data: {JSON.stringify(data)}</h1>);
            }}
        </Query>
    </div>)
};

ReactDOM.render(<ApolloProvider client={client}><Test/></ApolloProvider>, document.getElementById("app"));
