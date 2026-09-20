import { newZodEntrySchema, type NewPatients } from "./types.ts";
//import { Gender} from "./types.ts";

//import { z } from "zod";

export const parseNewPatientsEntry = (object: unknown): NewPatients => {
  return newZodEntrySchema.parse(object);

  // if (!object || typeof object !== "object") {
  //   throw new Error("Incorrect or missing data");
  // }

  // if (
  //   "name" in object &&
  //   "dateOfBirth" in object &&
  //   "ssn" in object &&
  //   "gender" in object &&
  //   "occupation" in object
  // ) {
  //   const newPatientData = {
  //     name: z.string().parse(object.name),
  //     dateOfBirth: z.iso.date().parse(object.dateOfBirth),
  //     ssn: z.string().parse(object.ssn),
  //     gender: z.enum(Gender).parse(object.gender),
  //     occupation: z.string().parse(object.occupation),
  //   };
  //  return newPatientData;
  // }
  // throw new Error("Your data is incomplete: missing field(s)");
};
