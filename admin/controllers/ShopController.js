const shop = require("../model/ShopModel");
const user = require("../model/UserModel");
class ShopController {
  getAllContract(req, res, next) {
    const usercr = user.getUserLocal();
    if (!usercr) {
      res.redirect("/user/login");
      return;
    }
    Promise.all([shop.getAllContract()])
      .then(([contracts]) =>
        res.render("shop/show_all", {
          layout: "main",
          contracts: contracts,
          user: usercr,
          title: "TẤT CẢ HỢP ĐỒNG",
        })
      )
      .catch(next);
  }
  getAllContractWaitAccept(req, res, next) {
    const usercr = user.getUserLocal();
    if (!usercr) {
      res.redirect("/user/login");
      return;
    }
    Promise.all([shop.getAllContractWaitAccept()])
      .then(([contracts]) =>
        res.render("shop/show", {
          layout: "main",
          contracts: contracts,
          user: usercr,
          title: "HỢP ĐỒNG CHỜ DUYỆT",
        })
      )
      .catch(next);
  }

  acceptContract(req, res, next) {
    const usercr = user.getUserLocal();
    if (!usercr) {
      res.redirect("/user/login");
      return;
    }
    Promise.all([shop.acceptContract(req.params.id)])
      .then(([contracts]) => res.redirect("/"))
      .catch(next);
  }
  revokeContract(req, res, next) {
    const usercr = user.getUserLocal();
    if (!usercr) {
      res.redirect("/user/login");
      return;
    }
    Promise.all([shop.revokeContract(req.params.id)])
      .then(([contracts]) => res.redirect("/"))
      .catch(next);
  }
}

module.exports = new ShopController();
