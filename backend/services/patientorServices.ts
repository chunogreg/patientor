import type {
  Diagnosis,
  Patients,
  NonsensitivePatients,
  NewPatients,
} from "../types.ts";
import diagnosesData from "../data/diagnoses.ts";
import patientsData from "../data/patients.ts";
import { v1 as uuid } from "uuid";

const diagnoses: Diagnosis[] = diagnosesData;
const patients: Patients[] = patientsData as Patients[];

export const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export const getPatients = (): Patients[] => {
  return patients;
};

export const getNonsensitivePatients = (): NonsensitivePatients[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const addPatient = (newPatientData: NewPatients): Patients => {
  const newPatientEntry = { id: uuid(), ...newPatientData };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

// const isString = (text: unknown): text is string => {
//   return text instanceof String || typeof text === "string";
// };

// const parseComment = (comment: unknown): string => {
//   if (!comment || !isString(comment)) {
//     throw new Error("Comment is missing or incorrect");
//   }
//   return comment;
// };
