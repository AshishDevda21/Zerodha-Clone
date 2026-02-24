const { Schema } = require("mongoose");

const UsersSchema = new  Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    totalFunds: { type: Number, default: 0 },
    fundTransactions: [
      {
        transactionType: {
          type: String,
          enum: ["BUY", "SELL", "ADD", "WITHDRAW"],
          required: true,
          default: "ADD",
        },
        amount: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
});

module.exports = { UsersSchema };
