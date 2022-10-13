const express = require("express");
const cookieParser = require("cookie-parser");

const db = require("./config/db");

db.authenticate()
  .then(() => console.log("Dbye basariyla baglandi.."))
  .catch((e) => console.log("Hata Kodu: " + e));

const bookRoutes = require("./routes/Book");
const userRoutes = require("./routes/User");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is up!");

  app.use("/books", bookRoutes);
  app.use("/users", userRoutes);

  app.use((req, res, next) => {
    const error = new Error("Aradiginiz sayfa bulunamadi");
    error.status = 404;
    next(error);
  });

  app.use(errorHandler);
});
