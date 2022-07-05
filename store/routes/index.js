const shopRouter = require("./shop");
const userRouter = require("./user");

function route(app) {
  app.use("/user", userRouter);
  app.use("/", shopRouter);
}
module.exports = route;
