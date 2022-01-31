const express = require("express");
const app = express();
const sequelize = require("./sequelize");

const { application } = require("express");
const Ship = require("./models/ship");
const CrewMember = require("./models/crewmember");

Ship.hasMany(CrewMember);

  // Endpoint SYNC

  app.get("/create", async (req, res, next) => {
    try {
      await sequelize.sync({ force: true });
      res.status(201).json({ message: "Database created with the models." });
    } catch (err) {
      next(err);
    }
  });

  //CREATE SHIP 

  app.post("/ship", async (req, res, next) => {
    try {
      await Ship.create(req.body);
      res.status(201).json({ message: "Ship ready for sail!" });
    } catch (err) {
      next(err);
    }
  });


  //GET ALL SHIPS

app.get("/ships", async (req, res, next) => {
    try {
      const ships = await ships.findAll();
      res.status(200).json(ships);
    } catch (error) {
      next(error);
    }
  });


  //UPDATE SHIP

  app.put("/ship/:id", async (req, res) => {
    try {
      const ship = await Ship.findByPk(req.params.id);
      if (ship) {
        await ship.update(req.body, {
          fields: ["name", "displacement"],
        });
        res.status(202).json({ message: "Ship was updated!" });
      } else {
        res.status(404).json({ message: "Ship couldn't be found" });
      }
    } catch (err) {
      next(err)
    }
  });
  

  //DELETE SHIP

app.delete("/ships/:id", async (req, res) => {
    try {
      const ship = await Ship.findByPk(req.params.id);
      if (ship) {
        await ship.destroy();
        res.status(202).json({ message: "Ship Destroyed!" });
      } else {
        res.status(404).json({ message: "Ship couldn't be found" });
      }
    } catch (err) {
      next(err)
    }
  });



  //CREATE CREW MEMBER

app.post("/ships/:id/crewmembers", async (req, res, next) => {
    try {
      const ship = await Ship.findByPk(req.params.id);
      if (ship) {
        const crewmember = new CrewMember(req.body);
        crewmember.id = ship.id;
        await crewmember.save();
        res.status(201).json({ message: "New Member joined Crew!" });
      } else {
        res.status(404).json({ message: "404 - Member Not Found!" });
      }
    } catch (err) {
      next(err);
    }
  });

  //GET ALL CREW MEMBERS
  app.get("/crewmembers", async (req, res, next) => {
    try {
      const crewmembers = await CrewMember.findAll();
      res.status(200).json(crewmembers);
    } catch (err) {
      next(err);
    }
  });

  //GET SHIP'S CREW MEMBERS

  app.get("/ships/:id/crewmembers", async (req, res, next) => {
    try {
      const ship = await Ship.findByPk(req.params.id, {
        include: [CrewMember],
      });
      if (ship) {
        res.status(200).json(ship.crewmembers);
      } else {
        res.status(404).json({ message: "The ship is sunken." });
      }
    } catch (err) {
      next(err);
    }
  });


  //UPDATE CREW

  app.put("/ships/:id/crewmembers/:id", async (req,res,next)=>{
    try {
      const ship = await Ship.findByPk(req.params.id);
      console.log("Ship:")
      console.log(ship)
      if(ship){
        const crewmembers = await ship.getCrewMembers({ id: req.params.id });
        console.log("Ship's Crew:");
        console.log(crewmembers);
        const crewmember = Object.keys(crewmembers).filter(e=>crewmembers[e].id == req.params.id);
        console.log(crewmember)
        if(crewmember){
          crewmember.name = req.body.name;
          crewmember.role = req.body.role;
          await crewmember.save();
          res.status(202).json("Crewmember Edited");
        }else{
          res.status(404).json({message: '404 - Crew Member Overboard.'});
        }
      }else{
        res.status(404).json({message: '404 - Ship is sunken.'});
      }
    }catch(error){
      console.log(error.message)
    }
  });

  //DELETE CREW

  app.delete("/ships/:id/crewmembers/:id", async (req, res) => {
    try {
      const ship = await Ship.findByPk(req.params.id);
      if (ship) {
        const crewmembers = await ship.getCrewMembers({
          where: {
            id: req.params.id,
          },
        });
        const crewmember = crewmembers.shift();
  
        if (crewmember) {
          await crewmember.destroy();
          res.status(200).json({ message: "Crew Member left!" });
        } else {
          res.status(404).json({ message: "Member not found!" });
        }
      } else {
        res.status(404).json({ message: "Ship not found!" });
      }
    } catch (err) {
      next(err)
    }
  });


  // FILTER 

  app.get("/ships", async (req, res, next) => {
    try {
      const { QueryTypes } = require('sequelize');
      const filteredship = await sequelize.query("SELECT * FROM ship WHERE displacement <= 500 AND LEN(name) > 5;", { type: QueryTypes.SELECT } );
    } catch (err) {
      next(err);
    }
  });

  // SORT 

  app.get("/ships", async (req, res, next) => {
    try {
      const { QueryTypes } = require('sequelize');
      const sortedShips = await sequelize.query("SELECT * FROM ship ORDER BY displacement ASC;", { type: QueryTypes.SELECT } );
    } catch (err) {
      next(err);
    }
  });

// middleware
app.use(express.json());

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
}); 

