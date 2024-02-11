import express from "express";
import { listsItem, getItem } from "../controllers/item_controller.js";
const router = express.Router();

router.get("/items", (req, res) => ListsItem(req, res));
router.get("/items/:id", (req, res) => getItem(req, res));

export default router;
