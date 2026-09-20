import express from "express";
// @ts-expect-error cors has no bundled declaration file
import cors from "cors";
import { parseNewPatientsEntry } from "./utils.ts";

import {
  getDiagnoses,
  getNonsensitivePatients,
  addPatient,
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
    const { name, dateOfBirth, ssn, gender, occupation } =
      parseNewPatientsEntry(req.body);
    const addedEntry = addPatient({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
