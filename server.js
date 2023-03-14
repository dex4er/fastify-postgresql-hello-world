const { Client } = require("pg");

const {
  POSTGRES_HOST = "127.0.0.1",
  POSTGRES_PORT = "5432",
  POSTGRES_DB = "",
  POSTGRES_PASSWORD = "",
  POSTGRES_USER = "",
  SERVER_HOST = "localhost",
  SERVER_PORT = "3000",
} = process.env;

const pg = new Client({
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

// Declare a route
fastify.get("/", async () => {
  const res = await pg.query("SELECT $1::text as message", ["world"]);
  const { message } = res.rows[0];
  return { hello: message };
});

fastify.get("/healthz", async () => {
  return "";
});

// Run the server!
const start = async () => {
  try {
    await pg.connect();
    await fastify.listen({ host: SERVER_HOST, port: Number(SERVER_PORT) });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
