const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");

const route = require("./routes");
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

hbs.handlebars.registerHelper("dateFormat", require("handlebars-dateformat"));
hbs.handlebars.registerHelper("limit", function (arr, limit) {
  if (!Array.isArray(arr)) {
    return [];
  }
  return arr.slice(0, limit);
});

const port = 3000;
const app = express();

// Use static folder
app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(methodOverride("_method"));

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./public/views");

//route
route(app);

app.listen(port, () => {
  console.log(`Listen at http://localhost:${port}`);
});
