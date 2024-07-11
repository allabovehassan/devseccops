const { connect } = require("mongoose");
require("dotenv").config();

const connection = connect(process.env.MONGO_URL);

module.export = { connection };