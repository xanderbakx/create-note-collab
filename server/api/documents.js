const router = require("express").Router();
const { Document } = require("../db/models");
module.exports = router;

// GET all documents
router.get("/", async (req, res, next) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    next(error);
  }
});

// GET ONE document
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const document = await Document.findOne({
      _id: id,
    });
    res.json(document);
  } catch (error) {
    next(error);
  }
});

// CREATE document
router.post("/", async (req, res, next) => {
  try {
    const document = await Document.create(req.body);
    res.json(document);
  } catch (error) {
    next(error);
  }
});

// UPDATE ONE document
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const document = await Document.findOne({
      _id: id,
    });
    if (!document) {
      res.sendStatus(404);
    } else {
      await Document.updateOne(
        {
          _id: id,
        },
        req.body
      );
      res.json(document);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE ONE document
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Document.deleteOne({
      _id: id,
    });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});
