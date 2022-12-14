const mongoose = require("mongoose");
const objectId = require("mongodb").ObjectId;

const Parking = mongoose.model("Parking", {
  name: String,
  address: String,
  nb: {
    type: String,
    default: 50,
  },
  idO: { type: mongoose.Schema.Types.ObjectId, ref: "ParkingOwner" },
  place: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Emplacement",
  }],
});

module.exports = Parking;
