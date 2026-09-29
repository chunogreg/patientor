import express from "express";
import cors from "cors";
import { parseNewPatientsEntry } from "./utils.ts";
import z from "zod";
import {
  getDiagnoses,
  getNonsensitivePatients,
  addPatient,
  getPatients,
  addEntry,
} from "./services/patientorServices.ts";
import { entrySchema } from "./types.ts";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.get("/api/patients", (_req, res) => {
  return res.json(getNonsensitivePatients()); // Return the patients data
});

app.get("/api/diagnoses", (_req, res) => {
  return res.json(getDiagnoses()); // Return the diagnoses data
});

app.post("/api/patients", (req, res) => {
  try {
    const { name, dateOfBirth, ssn, gender, occupation, entries } =
      parseNewPatientsEntry(req.body);
    const addedEntry = addPatient({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
      entries,
    });
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMsg = "Something went wrong";
    if (error instanceof Error) {
      errorMsg += "Error: " + error;
    }
    res.status(400).send(errorMsg);
  }
});

app.get("/api/patients/:id", (req, res) => {
  const id = req.params.id;
  const patient = getPatients().find((p) => p.id === id);
  return res.json(patient); // Return single patient data
});

app.post("/api/patients/:id/entries", (req, res) => {
  const id = req.params.id;
  try {
    const newEntry = entrySchema.parse(req.body);
    const addedEntry = addEntry(id, newEntry);
    //===============================
    console.log("POST patient ID:", id);
    console.log("Added entry:", addedEntry);
    //=========================

    res.status(201).json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError)
      res.status(400).send({
        error: error.issues[0].message,
        field: error.issues[0].path[0],
      });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
