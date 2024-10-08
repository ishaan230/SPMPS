import express from "express";
import bodyParser from "body-parser";
import { loginUser, registerUser, updateUser } from "../controller/user";
import { bookSlot, getSlots, getSlotsByLocation, updateSlot, createSlot} from "../controller/parking";
import {createSession, endSession} from '../controller/devices'

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("Welcome to SPMS");
});

// User APIs
app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const response = await registerUser(username, password, db)
  res.json(response)
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const loginPassword = req.body.password;
  const data = await loginUser(username, loginPassword)
  res.json(data)
});

app.put("/update", authenticateToken, async (req, res) => {
  const username = req.body.username;
  const loginPassword = req.body.password;
  const newPassword = req.body.newPassword;

  const data = await updateUser(username, loginPassword, newPassword)
  res.json(data)
});

app.post("/bookslot", authenticateToken, async (req, res) => {
  const parkingId = req.body.parkingId;
  const userId = req.body.userId;
  const data = await bookSlot(parkingId, userId)
  res.json(data)
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});


// ---------------------------------------------------------------------------

app.get("/get_all_slots", authenticateToken, async(req, res) => {
    const data = await getSlots();
    res.json(data)
})

app.get("/get_slot_by_location", authenticateToken, async(req, res) => {
    const data = getSlotsByLocation(req.body.locationID)
    res.json(data)
})

app.put("/updateslot", authenticateToken, async(req, res) => {
    const data = updateSlot(req)
    res.json(data)
})

app.post("/createslot", authenticateToken, async(req, res) => {
    const data = createSlot(req)
    res.json(data)
})

// -----------------------------------
// Parking Session APIs

app.post("/createSession", authenticateToken, async(req, res) => {
    const data = await createSession(req)
    res.json(data)
})


app.put("/endSession", authenticateToken, async(req, res) => {
    const data = await endSession(req)
    res.json(data)
})


// -----------------------------------

app.post("/addedMasterDevice", authenticateToken, async(req, res) => {
    const data = await addMasterDevice(req)
    res.json(data)
})


app.post("/addedSlaveDevice", authenticateToken, async(req, res) => {
  const data = await addSlaveDevice(req)
  res.json(data)
})
