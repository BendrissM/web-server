const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const app = express();
const PORT = 3000;

// App Middlewares
app.use((req, res, next) => {
  var now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to load log file");
    }
  });
  next();
});

/* app.use((req, res, next) => {
  res.render("maintenance.hbs");
}); */

app.use(express.static(__dirname + "/public"));

// App view engine
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());
hbs.registerHelper("screamIt", text => text.toUpperCase());

// App routes
app.get("/", (req, res) => {
  res.render("home.hbs", {
    title: "Home Page",
    welcomeMessage: "Welcome to my website"
  });
});
app.get("/about", (req, res) => {
  res.render("about.hbs", {
    title: "About Page",
    welcomeMessage: "Welcome to my About"
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
