import { Schema, model, models } from "mongoose";

const itemSchema = new Schema(
  {
    _id: { type: String, required: true },
    category: { type: String, required: true },
    colors: { type: [String], required: true },
    pattern: String,
    photoUrl: { type: String, required: true },
    ref: { type: Schema.Types.ObjectId, ref: "User" },
    rotationDegree: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Item = models.Item || model("Item", itemSchema);

export default Item;
