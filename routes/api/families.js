const mongoose = require("mongoose");
const router = require("express").Router();
const passport = require("passport");

const Family = mongoose.model("Family");
const auth = require("../auth");

router.get("/families", (req, res, next) => {
  Family.find()
    .then((family) => {
      if (!family) {
        return res.sendStatus(401);
      }

      return res.json(family);
    })
    .catch(next);
});

router.get("/family", auth.required, (req, res, next) => {
  Family.findOne({ users: req.payload.id })
    .then((family) => {
      if (!family) {
        return res.sendStatus(401);
      }

      return res.json(family);
    })
    .catch(next);
});

router.post("/family", auth.required, (req, res, next) => {
  const family = new Family();

  family.name = req.body.family.name;
  family.users = [req.payload.id];

  family
    .save()
    .then(() => res.json())
    .catch(next);
});

module.exports = router;
