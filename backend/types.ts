import { z } from "zod";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

// /* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
//export interface Entry {}

export interface Patients {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export type NonsensitivePatients = Omit<Patients, "ssn" | "entries">;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}
type SickLeave = {
  startDate: string;
  endDate: string;
};

type Discharge = {
  date: string;
  criteria: string;
};

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating =
  (typeof HealthCheckRating)[keyof typeof HealthCheckRating];

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave: SickLeave;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | OccupationalHealthcareEntry
  | HospitalEntry
  | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type EntryWithoutId = UnionOmit<Entry, "id">;

export const newZodEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
  // entries: z.array(z.unknown()),
});
export type NewPatients = z.infer<typeof newZodEntrySchema>;

export const zodForEntriesField = z.object({});

//===================================================

const baseEntrySchema = z.object({
  // id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const sickLeaveSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

const dischargeSchema = z.object({
  date: z.string(),
  criteria: z.string(),
});

const healthCheckRatingSchema = z.union([
  z.literal(HealthCheckRating.CriticalRisk),
  z.literal(HealthCheckRating.Healthy),
  z.literal(HealthCheckRating.HighRisk),
  z.literal(HealthCheckRating.LowRisk),
]);

const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: sickLeaveSchema,
});

const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: dischargeSchema,
});

const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: healthCheckRatingSchema,
});

export const entrySchema = z.discriminatedUnion("type", [
  occupationalHealthcareEntrySchema,
  hospitalEntrySchema,
  healthCheckEntrySchema,
]);
