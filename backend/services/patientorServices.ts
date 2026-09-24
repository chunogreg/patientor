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
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,

      gender,
      occupation,
      entries,
    }),
  );
};

export const addPatient = (newPatientData: NewPatients): Patients => {
  const newPatientEntry: Patients = {
    id: uuid(),
    ...newPatientData,
    entries: [],
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};
