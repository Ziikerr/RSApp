const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const http = require("http");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Server } = require("socket.io");

const hostname = "127.0.0.1";
const port = 8800;

const app = express();

app.use(
  cors({
    credentials: true,
    origin: { localhost: 5173 },
  })
);
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    credentials: true,
    origin: { localhost: 5173 },
  },
});

io.listen(4000);
io.on("connection", (socket) => {
  console.log("connected");

  socket.on("join_room", (data) => {
    console.log("connected to room ");
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("complete_request", (data) => {
    socket.to(data.room).emit("request_completed", true);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "rsAppDB",
});

// Registration of a new user with hashing of the password
app.post("/users", async (req, res) => {
  const q =
    "INSERT INTO users (`firstName`,`lastName`,`email`,`password`,`address`) VALUES(?)";
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    hashPass,
    req.body.address,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});
//Registration of an RSP
app.post("/RSP", async (req, res) => {
  const q =
    "INSERT INTO RSP (`firstName`,`lastName`,`email`,`password`,`address`,`companyName`,`phoneNumber`,`minPrice`) VALUES(?)";
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    hashPass,
    req.body.address,
    req.body.cName,
    req.body.phoneNum,
    req.body.minPrice,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json("200");
  });
});

//Retrieving RSP's info
app.get("/RSP", (req, res) => {
  const q =
    "SELECT RSP.rspID, companyName, IFNULL(AVG(reviews.rating),0) as rating, IFNULL(AVG(pricing),0) as pricingRating FROM reviews RIGHT JOIN RSP ON reviews.rspID=RSP.rspID GROUP BY rspID, companyName;";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json("Error");
    }
    return res.json(data);
  });
});

//Updating user's profile
app.post("/users/UPDATE", async (req, res) => {
  const q = "UPDATE users SET email= ?, address= ?, password= ? WHERE userID=?";
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);
  const values = [req.body.email, req.body.address, hashPass, req.body.userID];
  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.json("Error");
    }
    return res.json(data);
  });
});

//Updating RSP's profile
app.post("/RSP/UPDATE", async (req, res) => {
  const q =
    "UPDATE RSP SET email= ?, address= ?, password= ?, companyName= ?, phoneNumber= ?, minPrice= ?, description=? WHERE rspID=?";
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);
  const values = [
    req.body.email,
    req.body.address,
    hashPass,
    req.body.cName,
    req.body.phoneNum,
    req.body.minPrice,
    req.body.description,
    req.body.rspID,
  ];
  db.query(q, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.json("Error");
    }
    return res.json(data);
  });
});

//Handling login
app.post("/login", async (req, res) => {
  const q = "SELECT userID, password FROM users WHERE `email`= ?";
  //check if credentials exist in users table
  db.query(q, req.body.email, async (err, data) => {
    if (err) {
      return res.json(401);
    }
    if (typeof data[0] === "undefined") {
      return res.json(402);
    }
    if (data[0].password.length <= 0) return res.json(401);
    validate = await bcrypt.compare(req.body.password, data[0].password);
    if (validate) {
      const accessToken = jwt.sign(data[0].userID, "secretKey");

      return res.json({ userID: data[0].userID, accessToken });
    } else return res.json(401);
  });
});

//Called if email is not found in users table
app.post("/login2", async (req, res) => {
  const q = "SELECT rspID, password FROM RSP WHERE `email`= ?";
  //check if credentials exist in RSP table
  db.query(q, req.body.email, async (err, data) => {
    if (err) {
      return res.json(401);
    }
    if (typeof data[0] === "undefined") {
      return res.json(402);
    }
    if (data[0].password.length <= 0) return res.json(401);
    validate = await bcrypt.compare(req.body.password, data[0].password);
    if (validate) {
      const accessToken = jwt.sign(data[0].rspID, "secretKey");
      return res.json({ rspID: data[0].rspID, accessToken });
    } else return res.json(402);
  });
});

//Loading placeholder values into user's profile page
app.post("/users/get", async (req, res) => {
  const q =
    "SELECT firstName, lastName, email, address FROM users WHERE `userID`= ?";
  db.query(q, req.body.userID, async (err, data) => {
    if (err) {
      return res.json(401);
    }
    return res.json(data[0]);
  });
});

//Loading placeholder values into RSP's profile page
app.post("/RSP/get", async (req, res) => {
  const q =
    "SELECT firstName, lastName, email, address, companyName, minPrice, phoneNumber, description FROM rsp WHERE `rspID`= ?";
  db.query(q, req.body.rspID, async (err, data) => {
    if (err) {
      console.log(err);
      return res.json(401);
    }
    return res.json(data[0]);
  });
});

//Adding a new review
app.post("/review", async (req, res) => {
  const q =
    "INSERT INTO reviews (`userID`,`rspID`,`rating`,`pricing`,`comment`) VALUES(?)";
  const values = [
    req.body.userID,
    req.body.rspID,
    req.body.rating,
    req.body.priceRating,
    req.body.comment,
  ];
  db.query(q, [values], async (err, data) => {
    if (err) {
      console.log(err);
      return res.json(401);
    }
    return res.json(data);
  });
});

//Loads user reviews
app.post("/review/get", async (req, res) => {
  const q =
    "SELECT reviewID, comment, firstName as user FROM reviews INNER JOIN users ON reviews.userID=users.userID WHERE comment!='' AND rspID=?";
  const commentCheck = "";
  values = [req.body.rspID];
  db.query(q, [values], async (err, data) => {
    if (err) {
      console.log(err);
      return res.json(401);
    }
    return res.json(data);
  });
});

//Adds a request into the database
app.post("/requests/add", async (req, res) => {
  const q = "INSERT INTO requests (userID,rspID,rText) VALUES(?)";
  values = [req.body.userID, req.body.rspID, req.body.description];
  db.query(q, [values], async (err, data) => {
    if (err) {
      console.log(err);
      return res.json(401);
    }
    return res.json(data);
  });
});

app.post("/requests/add2", async (req, res) => {
  const q =
    "SELECT requestID FROM requests WHERE userID=? AND rspID=? AND completed=false";
  db.query(q, values, async (err, data) => {
    if (err) {
      console.log(err);
      return res.json(401);
    }
    return res.json(data[0]);
  });
});

//Retrieves requests
app.post("/requests/get", async (req, res) => {
  const q =
    "SELECT requestID, users.userID, firstName as userName, lastName as userLastName FROM requests INNER JOIN users ON requests.userID=users.userID WHERE rspID=?";

  values = [req.body.rspID];
  db.query(q, [values], async (err, data) => {
    if (err) {
      console.log(err);
      return res.json(401);
    }
    return res.json(data);
  });
});

//Retrieves specific request
app.post("/requests/getONE", async (req, res) => {
  const q =
    "SELECT requestID, users.userID, rspID, rText as description, firstName as userName, lastName as userLastName, completed FROM requests INNER JOIN users ON requests.userID=users.userID WHERE users.userID=? AND rspID=? AND requestID=?";
  const splitString = req.body.id.split("u");
  const userID = splitString[0];
  const rspID = splitString[1].split("r")[0];
  const requestID = splitString[1].split("r")[1];
  db.query(q, [userID, rspID, requestID], async (err, data) => {
    if (err) {
      console.log(err);
      return res.json(401);
    }
    return res.json(data[0]);
  });
});

//Marks request as complete
app.post("/requests/complete", async (req, res) => {
  const q = "UPDATE requests SET completed=true WHERE requestID=?";

  db.query(q, [req.body.requestID], async (err, data) => {
    if (err) {
      console.log(err);
      return res.json(401);
    }
    return res.json(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
