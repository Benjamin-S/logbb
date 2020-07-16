const mongoose = require("mongoose");
const router = require("express").Router();
const passport = require("passport");

const Baby = mongoose.model("Baby");
const Family = mongoose.model("Family");
const auth = require("../auth");

router.get("/", (req, res, next) => {
  Baby.findOne()
    .then((baby) => {
      if (!baby) {
        return res.sendStatus(401);
      }
      return res.json({ baby: baby.toAuthJSON() });
    })
    .catch(next);
});

router.post("/", auth.required, async function (req, res, next) {
  var userId = req.payload.id;

  var userFamily = await Family.findOne({ users: userId }).exec();

  const baby = new Baby();

  baby.name = req.body.baby.name;
  baby.gender = req.body.baby.gender;
  baby.birthDate = req.body.baby.birthDate;
  baby.dueDate = req.body.baby.dueDate;

  baby
    .save()
    .then(() => res.json({ baby: baby.toAuthJson }))
    .then((doc) => {
      if (userFamily) userFamily.update({ $push: { babies: doc._id } }).save();
    })
    .catch(next);
});

module.exports = router;
