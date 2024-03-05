import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import fs from "fs";

const typeDefs = `#graphql

  type Contact {
    name: String
    phone: String
  }

  type Query {
    searchContacts(name: String!): [Contact!]!
  }
`;

const contactList = JSON.parse(
  fs.readFileSync("./resources/telefonbuch.json", "utf8")
);

const resolvers = {
  Query: {
    searchContacts: (_, { name }) => {
      const searchTerm = name.toLowerCase();
      return contactList.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm)
      );
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
