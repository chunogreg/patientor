# Patientor 🩺

Patientor is a full-stack, type-safe medical record management application designed to handle complex, polymorphic clinical data.

---

## 🚀 Key Features

- **Polymorphic Entry Parsing:** Extensible data architecture engineered to safely type-narrow, validate, and render distinct clinical variants (`HealthCheck`, `Hospital`, and `OccupationalHealthcare`).
- **Asynchronous Server State:** Leveraged **TanStack Query** to isolate async operations, introducing robust data caching, background syncing, and request retries.
- **Network Boundary Validation:** Powered by **Zod** schema parsing to enforce strict data constraints at the runtime API boundary.

---

## 🛠️ Tech Stack & State Architecture

- **Frontend:** React, TypeScript, Material UI (MUI), Axios
- **Backend:** Node.js, Express, TypeScript, Zod

---

## 📐 Data Domain & Schema Validation

### 1. Discriminating Union Data Model (TypeScript)

```typescript
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
```

### 2. Runtime Schema Enforcement (Zod Backend)

```typescript
import { z } from "zod";

export const newZodEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(), // Validates YYYY-MM-DD format
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});
```

---

## 📦 Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org) (LTS Version)

### 1. Provision Environments

```bash
# Clone the repository
git clone https://github.com && cd patientor

# Install dependencies for both layers
cd backend && npm install
cd ../frontend && npm install
```

### 2. Local Execution

Run each command in a separate terminal shell from your root folder:

```bash
# Run API Engine (Port 3001)
cd backend && npm run dev

# Run UI Client Dashboard (Port 5173)
cd frontend && npm run dev
```
