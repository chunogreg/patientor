import express from "express";
import cors from "cors";
import { parseNewPatientsEntry } from "./utils.ts";

import {
  getDiagnoses,
  getNonsensitivePatients,
  addPatient,
  getPatients,
} from "./services/patientorServices.ts";

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
