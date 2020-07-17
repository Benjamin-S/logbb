const mongoose = require("mongoose");
const router = require("express").Router();
const passport = require("passport");

const Baby = mongoose.model("Baby");
const auth = require("../auth");

router.get("/", auth.required, (req, res, next) => {
  Baby.find({ family: req.payload.family })
    .then((baby) => {
      if (!baby) {
        return res.sendStatus(401);
      }
      return res.json({ baby: baby });
    })
    .catch(next);
});

router.get("/:id", auth.required, (req, res, next) => {
  Baby.findById(req.params.id).then(function (baby) {
    if (!baby) {
      res.sendStatus(401);
    }

    return res.json({ baby: baby.toAuthJSON() });
  });
});

router.put("/:id", auth.required, (req, res, next) => {
  Baby.findById(req.params.id)
    .then((baby) => {
      if (!baby) {
        return res.sendStatus(401);
      }

      // only update fields that were actually passed...
      if (typeof req.body.baby.name !== "undefined") {
        baby.name = req.body.baby.name;
      }
      if (typeof req.body.baby.gender !== "undefined") {
        baby.gender = req.body.baby.gender;
      }
      if (typeof req.body.baby.birthDate !== "undefined") {
        baby.birthDate = req.body.baby.birthDate;
      }
      if (typeof req.body.baby.dueDate !== "undefined") {
        baby.dueDate = req.body.baby.dueDate;
      }

      return baby.save().then(function () {
        return res.json({ baby: baby.toAuthJSON() });
      });
    })
    .catch(next);
});

router.post("/", auth.required, function (req, res, next) {
  const baby = new Baby();

  baby.name = req.body.baby.name;
  baby.gender = req.body.baby.gender;
  baby.birthDate = req.body.baby.birthDate;
  baby.dueDate = req.body.baby.dueDate;
  baby.family = req.payload.family;

  baby
    .save()
    .then(() => res.json({ baby: baby.toAuthJSON() }))
    .catch(next);
});

router.delete("/:id", auth.required, function (req, res, next) {
  Baby.findByIdAndDelete(req.params.id).then((baby) => {
    if (!baby) {
      return res.setStatus(401);
    }

    return res.json({ baby: `${baby.name} deleted` });
  });
});

module.exports = router;
