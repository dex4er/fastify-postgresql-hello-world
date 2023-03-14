const { SERVER_HOST = "localhost", SERVER_PORT = "3000" } = process.env;

// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

// Declare a route
fastify.get("/", async () => {
  return { hello: "world" };
});

fastify.get("/healthz", async () => {
  return "";
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ host: SERVER_HOST, port: Number(SERVER_PORT) });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
