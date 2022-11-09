const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const { MONGO_URL } = require("./config/database");
const { COOKIE_SECRET } = require("./config/keys");
const passport = require("passport");
const apiRoutes = require("./routes/apiRoutes");
const videoRoutes = require("./routes/videoRoutes");
const cvRoutes = require("./routes/cvRoutes");
const contactRoutes = require("./routes/contactRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const mainRoutes = require("./routes/mainRoutes");
const path = require("path");
require("./config/passport");

// General Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware with mongodbstore
app.use(
  session({
    secret: COOKIE_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //1 Day (Change to suit project)
    },
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// Routes

app.use("/main", mainRoutes);
app.use("/api", apiRoutes);
app.use("/video", videoRoutes);
app.use("/cv", cvRoutes);
app.use("/contact", contactRoutes);
app.use("/upload", uploadRoutes);

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static(path.join(__dirname, "client/build")));

  // Express serve up index.html file if it doesn't recognize route

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
  });
}

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
