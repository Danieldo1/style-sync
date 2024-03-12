import { Schema, model, models } from "mongoose";

const itemSchema = new Schema({
    category: { type: String, required: true },
    colors: { type: [String], required: true },
    pattern: String,
    photoUrl: { type: String, required: true },
    ref: { type: Schema.Types.ObjectId, ref: "Users" },
  });

const Item = models.Item || model("Item", itemSchema);

export default Item;
