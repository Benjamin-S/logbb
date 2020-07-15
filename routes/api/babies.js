const mongoose = require("mongoose");
const router = require("express").Router();
const passport = require("passport");

const Baby = mongoose.model("Baby");
const auth = require("../auth");

router.get("/", auth.required, (req, res, next) => {
  Baby.findById(req.payload.id)
    .then((baby) => {
      if (!baby) {
        return res.sendStatus(401);
      }
      return res.json({ baby: baby.toAuthJson() });
    })
    .catch(next);
});

router.post("/", auth.required, function (req, res, next) {
  const baby = new Baby();

  baby.name = req.body.baby.name;
  baby.gender = req.body.baby.gender;
  baby.birthDate = req.body.baby.birthDate;
  baby.dueDate = req.body.baby.dueDate;

  baby
    .save()
    .then(() => res.json({ baby: baby.toAuthJson }))
    .catch(next);
});

module.exports = router;
