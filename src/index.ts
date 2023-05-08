import pkg from "mongoose";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";

const { set, connect, connection } = pkg;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

set("strictQuery", true);
connect("mongodb://localhost:27017/eCommerceDemo")
  .then(async () => {
    console.log(
      "\n-------------------------- database connected --------------------------\n"
    );
    const { url } = await startStandaloneServer(server, {
      listen: {
        port: 5200,
      },
    });
    console.log(
      "------------------------------------------------------------------------\n" +
        "|                                                                      |\n" +
        `|                app starting on ${url}                |\n` +
        "|                                                                      |\n" +
        "------------------------------------------------------------------------"
    );
  })
  .catch((err) =>
    console.log(
      "\n-------------------------- error --------------------------\n",
      err
    )
  );
// to catch error after mongoose initialization
connection.on("error", (err) => {
  console.log(
    "\n-------------------------- error --------------------------\n",
    err
  );
});
