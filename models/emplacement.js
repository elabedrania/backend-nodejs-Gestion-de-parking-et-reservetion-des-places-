const mongoose = require("mongoose");
const objectId = require("mongodb").ObjectId;
const Emplacement = mongoose.model("Emplacement", {
  name: {
    type: String,
  },
  state: {
    type: Boolean,
    default: false,
  },
  idP: objectId,
  parking: [{ type: mongoose.Schema.Types.ObjectId, ref: "Parking" }],
});

module.exports = Emplacement;
