import React from "react";
import { render } from "react-dom";

import {ApolloClient} from "apollo-client";
import gql from "graphql-tag";
import {InMemoryCache} from "apollo-cache-inmemory";
import {HttpLink} from "apollo-link-http";
import {ApolloProvider, Query} from 'react-apollo';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: "https://48p1r2roz4.sse.codesandbox.io"
});

const client = new ApolloClient({
    cache,
    link
});

function ExchangeRates() {
    return (<Query query={gql`
      {
          rates(currency: "USD") {
              currency
              rate
          }
      }
  `}>
        {
            // @ts-ignore
            ({data, loading, error}) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                // @ts-ignore
                return data.rates.map(({ currency, rate }) => (
                    <div key={currency}>
                        <p>
                            {currency}: {rate}
                        </p>
                    </div>
                ));
            }}
    </Query>);
}

// @ts-ignore
const App = () => (
    <ApolloProvider
        // @ts-ignore
        client={client}>
        <div>
            <h2>My first Apollo app 🚀</h2>
            <ExchangeRates />
        </div>
    </ApolloProvider>
);

render(<App />, document.getElementById("app"));
