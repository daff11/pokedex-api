const express = require("express");
const sequelize = require("./config/db");
const routes = require("./routes/pokeRoutes");

const app = express();

app.use(express.json());
app.use(express.static("src/frontend"));
app.use("/uploads", express.static("uploads"));
app.use("/", routes);


async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");

    await sequelize.sync();
    console.log("DB Ready");

    app.listen(process.env.PORT, () => {
      console.log(`Running on ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

startServer();