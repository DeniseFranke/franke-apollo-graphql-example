# franke-apollo-graphql-example
Re-acquaint with GraphQL by setting up an Apollo basic Endpoint and Client Example

## Prerequisites MacOSX
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew update
brew doctor
export PATH="/usr/local/bin:$PATH"
brew install node
node -v
npm -v
brew update
brew upgrade node
npm install -g grunt-cli
```

## Use npm to initialize new project
```
npm init --yes
```

## Install two dependencies for this project: apollo-server and graphql
```
npm install --save apollo-server graphql
```

## The Apollo Server
The ApolloServer constructor requires two parameters: the schema definition and a set of resolvers.  The Apollo Server can fetch data from a variety of sources (i.e., SQL,  NoSQL database, REST API, GraphQL APIs,  static JSON, etc)

## Schema
The Schema defines the API structures. 
The `Book` type defines the queryable fields: `title` and `author`

## Query
The "Query" type lists all available queries that clients can execute, and their return types
The `books` query returns an array of zero or more Books

## Resolvers
Resolvers define the technique for fetching the types defined in the schema
This resolver retrieves books from the "books" array above
The `listen` method launches an Apollo web server

## How to test
Clone this repo or vi index.js

```
#!/usr/bin/env node
/*jslint browser, node*/
/*global caches, indexedDb*/

const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    title: String
    author: String
    year: Int
  }

  type Query {
    books: [Book]
  }
`;

const books = [
  {
    author: "Christopher Alexander",
    title: "The Timeless Way of Building",
    year: 1979
  },
  {
    author: "Robert C. Martin",
    title: "Clean Code",
    year: 2009
  }
];

const resolvers = {
  Query: {
    books: () => books
  }
};

const server = new ApolloServer({ resolvers, typeDefs });
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

## Run the Apollo Graphql Server
```
node index.js
```
The server is up/listening when you see:
```
🚀 Server ready at http://localhost:4000/
```

## Test Query with Curl
```
curl -X POST \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-H "Accept-Charset: utf-8" \
-d '{"query": "{ books { author, title, year } }"}' \
http://localhost:4000
```

## Response JSON
The Response JSON will look like:

```
{"data":{"books":[{"author":"Christopher Alexander","title":"The Timeless Way of Building","year":1979},{"author":"Robert C. Martin","title":"Clean Code","year":2009}]}}
```

## Or Test with a GUI client 
```
npx create-react-app express-graphql --template typescript
cd express-graphql
rm -rf node_modules
npm config set legacy-peer-deps true
npm install
npm install express express-graphql graphql --save
```

## TODO: 
- Create JWT
- Create Unit Tests - valid user 
- Add JWT Validation 401 - https://www.apollographql.com/docs/apollo-server/schema/creating-directives/
-- Create Unit Test - auth-provider error
-- Add rule: claim auth-provider == SSO else 401 && logging && observability
-- Create Unit Test - invalid email domain
-- Add rule: validate email domain else 401 && logging && observability
- Add RBAC and other schema endpoint for getUser();
- Automate JWT Creation
