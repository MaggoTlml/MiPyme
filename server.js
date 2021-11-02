const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect("mongodb+srv://Dbo-MiPyme:Test1234.@mipyme.sbemc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// ruta simple
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a MiPyme" });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "Cliente"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'Cliente' to roles collection");
        });
  
        new Role({
          name: "Empresa"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'Empresa' to roles collection");
        });
  
        new Role({
          name: "Admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }


