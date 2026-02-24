require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middlewares/auth");

const { HoldingsModel } = require("./model/HoldingsModel");
const { UsersModel } = require("./model/UsersModel");

const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.post("/signup", async (req, res) => {
  try {
      const { username, email, password } = req.body;

      // validation
      if (!username || !email || !password)
          return res.status(400).json({ msg: "All fields required" });

      const existingUser = await UsersModel.findOne({ email });
if (existingUser)
  return res.status(400).json({ msg: "User already exists" });


      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newUser = new UsersModel({ username, email, password: hash });
      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      
      // res.status(201).json({
      //   token,
      //   user: {
      //     id: newUser._id,
      //     email: newUser.email
      //   }
      // });
      

      res.status(201).json({ msg: "User created" });
  } catch (err) {
      res.status(500).json(err);
  }
});


app.post("/login", async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await UsersModel.findOne({ email });

      if (!user) return res.status(404).json({ msg: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Wrong credentials" });

      const token = jwt.sign(
          { id: user._id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
      );

      res.json({ token, user: { id: user._id, username: user.username } });

  } catch (err) {
      res.status(500).json(err);
  }
});


app.get("/dashboard", auth, (req, res) => {
  res.json({ msg: `Welcome ${req.user.username}` });
});

app.get("/funds", auth, async (req, res) => {
  try {
    const user = await UsersModel.findById(req.userId).select("totalFunds fundTransactions");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      totalFunds: user.totalFunds || 0,
      transactions: user.fundTransactions || [],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/funds/add", auth, async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    if (!amount || amount < 500) {
      return res.status(400).json({ message: "Minimum add amount is 500 INR" });
    }

    await UsersModel.findByIdAndUpdate(
      req.userId,
      {
        $inc: { totalFunds: amount },
        $push: {
          fundTransactions: {
            transactionType: "ADD",
            amount,
            createdAt: new Date(),
          },
        },
      },
      { new: false }
    );

    const updatedUser = await UsersModel.findById(req.userId).select("totalFunds fundTransactions");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const latestTransaction =
      updatedUser.fundTransactions[updatedUser.fundTransactions.length - 1];

    return res.json({
      message: "Funds added successfully",
      totalFunds: updatedUser.totalFunds || 0,
      transactions: updatedUser.fundTransactions || [],
      latestTransaction: latestTransaction || null,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/funds/withdraw", auth, async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    const password = req.body.password;

    if (!amount || amount < 500) {
      return res.status(400).json({ message: "Minimum withdraw amount is 500 INR" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await UsersModel.findById(req.userId).select(
      "password totalFunds fundTransactions"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    if (amount > Number(user.totalFunds || 0)) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    await UsersModel.findByIdAndUpdate(req.userId, {
      $inc: { totalFunds: -amount },
      $push: {
        fundTransactions: {
          transactionType: "WITHDRAW",
          amount,
          createdAt: new Date(),
        },
      },
    });

    const updatedUser = await UsersModel.findById(req.userId).select("totalFunds fundTransactions");
    const latestTransaction =
      updatedUser?.fundTransactions?.[updatedUser.fundTransactions.length - 1] || null;

    return res.json({
      message: "Withdrawal successful",
      totalFunds: updatedUser?.totalFunds || 0,
      transactions: updatedUser?.fundTransactions || [],
      latestTransaction,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done!");
// });

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done!");
// });

app.get("/allHoldings", auth, async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", auth, async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.get("/myOrders", auth, async (req, res) => {
  try {
    const orders = await OrdersModel.find({
      userId: req.userId,
      mode: "BUY",
    }).sort({ _id: -1 });

    return res.json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/newOrder", auth, async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    const parsedQty = Number(qty);
    const parsedPrice = Number(price);
    const buyAmount = parsedQty * parsedPrice;

    if (!name || !parsedQty || !parsedPrice || !mode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (mode !== "BUY") {
      return res.status(400).json({ message: "Invalid order mode" });
    }

    const user = await UsersModel.findById(req.userId).select("totalFunds fundTransactions");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (buyAmount > Number(user.totalFunds || 0)) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    const newOrder = new OrdersModel({
      name,
      qty: parsedQty,
      price: parsedPrice,
      mode,
      userId: req.userId,
    });

    await newOrder.save();

    await UsersModel.findByIdAndUpdate(req.userId, {
      $inc: { totalFunds: -buyAmount },
      $push: {
        fundTransactions: {
          transactionType: "BUY",
          amount: buyAmount,
          createdAt: new Date(),
        },
      },
    });

    const updatedUser = await UsersModel.findById(req.userId).select("totalFunds fundTransactions");
    const latestTransaction =
      updatedUser?.fundTransactions?.[updatedUser.fundTransactions.length - 1] || null;

    return res.status(201).json({
      message: "Order placed successfully",
      totalFunds: updatedUser?.totalFunds || 0,
      latestTransaction,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});


app.post("/sellOrder", auth, async (req, res) => {
  try {
    const { name, qty } = req.body;
    const sellQty = Number(qty);

    if (!name || !sellQty || sellQty <= 0) {
      return res.status(400).json({ message: "Invalid sell request" });
    }

    const buyOrders = await OrdersModel.find({
      name,
      mode: "BUY",
      userId: req.userId,
    }).sort({ _id: 1 });

    if (!buyOrders.length) {
      return res.status(404).json({ message: "Stock not in your holdings" });
    }

    const totalOwnedQty = buyOrders.reduce(
      (sum, order) => sum + Number(order.qty || 0),
      0
    );

    if (totalOwnedQty < sellQty) {
      return res.status(400).json({ message: "Not enough quantity to sell" });
    }

    let remainingQty = sellQty;
    let sellAmount = 0;
    for (const order of buyOrders) {
      if (remainingQty <= 0) break;

      const qtyToSellFromThisOrder = Math.min(order.qty, remainingQty);
      sellAmount += qtyToSellFromThisOrder * Number(order.price || 0);

      if (order.qty <= remainingQty) {
        remainingQty -= order.qty;
        await OrdersModel.deleteOne({ _id: order._id });
      } else {
        order.qty -= remainingQty;
        remainingQty = 0;
        await order.save();
      }
    }

    await UsersModel.findByIdAndUpdate(req.userId, {
      $inc: { totalFunds: sellAmount },
      $push: {
        fundTransactions: {
          transactionType: "SELL",
          amount: sellAmount,
          createdAt: new Date(),
        },
      },
    });

    const updatedUser = await UsersModel.findById(req.userId).select("totalFunds fundTransactions");
    const latestTransaction =
      updatedUser?.fundTransactions?.[updatedUser.fundTransactions.length - 1] || null;

    return res.json({
      message: "Stock sold successfully",
      totalFunds: updatedUser?.totalFunds || 0,
      latestTransaction,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});


mongoose.connect(uri)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log("Server started");
    });
  })
  .catch(err => console.log(err));



// app.listen(PORT, () => {
//   console.log("App started!");
//   mongoose.connect(uri);
//   console.log("DB started!");
// });
