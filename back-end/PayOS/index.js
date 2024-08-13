const express = require("express");
const cors = require("cors");
const axios = require("axios");
const PayOS = require("@payos/node");
require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const API_KEY = process.env.API_KEY;
const CHECKSUM_KEY = process.env.CHECKSUM_KEY;
const CLIENT_HOST = process.env.CLIENT_HOST;
const BACK_END = process.env.BACK_END;

const app = express();

const port = 3000;

const payos = new PayOS(CLIENT_ID, API_KEY, CHECKSUM_KEY);

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DOMAIN = CLIENT_HOST;

const resObj = {
  code: 2000,
  result: "Verified",
};

app.post("/create-payment-link", async (req, res) => {
  try {
    const order = {
      description: "LowLand thanh toan",
      returnUrl: `${DOMAIN}/`,
      cancelUrl: `${DOMAIN}/payment-cancel`,
    };
    order.amount = req.body.amount;
    order.orderCode = req.body.orderCode;
    order.items = req.body.items;
    const paymentLink = await payos.createPaymentLink(order);
    resObj.code = 2000;
    resObj.result = paymentLink.checkoutUrl;
    res.send(resObj);
  } catch (error) {
    res.status(400);
    resObj.code = 4000;
    resObj.result = "Error";
    res.send(resObj);
  }
});

app.post("/receive-payment", async (req, res) => {
  console.log(req.body);
  axios
    .post(BACK_END, req.body)
    .then((response) => {
      console.log(response);
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.send(error);
    });
});

app.post("/verify-payment", async (req, res) => {
  console.log(req.body);
  try {
    const webhookData = payos.verifyPaymentWebhookData(req.body);
    resObj.code = 2000;
    resObj.result = webhookData;
    res.send(resObj);
  } catch (error) {
    res.status(400);
    resObj.code = 4000;
    resObj.result = "Invalid payment";
    res.send(resObj);
  }
});

app.post("/cancel-payment", async (req, res) => {
  try {
    const cancelledPaymentLink = await payos.cancelPaymentLink(
      req.body.orderCode,
      req.body.reason
    );
    resObj.code = 2000;
    resObj.result = cancelledPaymentLink;
    res.send(resObj);
  } catch (error) {
    res.status(400);
    resObj.code = 4000;
    resObj.result = "Error";
    res.send(resObj);
  }
});

app.listen(port, () => {
  console.log("Listenning at port " + port);
});
