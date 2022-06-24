const shopRouter = require("./shop");

function route(app) {
  app.use("/", shopRouter);
}
module.exports = route;
