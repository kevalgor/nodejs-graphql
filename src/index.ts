import pkg from "mongoose";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";
import { jwtHelper, errorHelper } from "./helpers";

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
      context: async ({ req, res }) => {
        let user = null;
        // Get the user token from the headers.
        const token = req.headers.authorization
          ? req.headers.authorization.replace("Bearer ", "")
          : "";
        if (token) {
          // Try to retrieve a user details from the token
          try {
            // Add the user to the context
            user = jwtHelper.decodeUserData(token);
            return { user };
          } catch (err) {
            errorHelper.throwCustomError(
              err.message,
              errorHelper.errorTypes.UNAUTHORIZED
            );
          }
        }
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

// import http, { Server } from "http";
// import pkg from "mongoose";
// import express, { Application } from "express";
// import { ApolloServer } from "@apollo/server";
// import { expressMiddleware } from "@apollo/server/express4";
// import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
// import { typeDefs } from "./schema/typeDefs";
// import { resolvers } from "./schema/resolvers";

// const app: Application = express();
// const httpServer: Server = http.createServer(app);

// // Set up Apollo Server
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
// });

// server
//   .start()
//   .then(() => app.use(express.json(), expressMiddleware(server)))
//   .catch((err) => console.log(err));

// const { set, connect, connection } = pkg;

// set("strictQuery", true);
// connect("mongodb://localhost:27017/eCommerceDemo")
//   .then(async () => {
//     console.log(
//       "\n-------------------------- database connected --------------------------\n"
//     );
//     httpServer.listen({ port: 5200 });
//     console.log(
//       "------------------------------------------------------------------------\n" +
//         "|                                                                      |\n" +
//         `|                app starting on http://localhost:5200/                |\n` +
//         "|                                                                      |\n" +
//         "------------------------------------------------------------------------"
//     );
//   })
//   .catch((err) =>
//     console.log(
//       "\n-------------------------- error --------------------------\n",
//       err
//     )
//   );
// // to catch error after mongoose initialization
// connection.on("error", (err) => {
//   console.log(
//     "\n-------------------------- error --------------------------\n",
//     err
//   );
// });
