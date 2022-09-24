import { randomUUID } from "crypto";

import { model, Schema } from "mongoose";

const itemProperties = {
    _id: { type: String, default: randomUUID },

    name: { type: String, required: true },
    isVegan: { type: Boolean, required: true },
    isVegetarian: { type: Boolean, required: true },

    weightGrams: Number,
    co2ProKg: Number,
};
const itemModel = new Schema(itemProperties);

const Item = model("item", itemModel);

export default Item;
export { itemProperties, itemModel };


