import {
  SyntheticEvent,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import entriesServices from "../../services/entries";
import { useParams } from "react-router-dom";
import type { Diagnosis, Entry, HealthCheckRating, Patient } from "../../types";
import { TextField, Button, Grid, Select, FormControl } from "@mui/material";
import { isAxiosError } from "axios";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

interface PatientEntryFormProps {
  patients: Patient;
  setPatient: Dispatch<SetStateAction<Patient | undefined>>;
  diagnoses: Diagnosis[];
}

const PatientEntryForm2 = ({
  patients,
  setPatient,
  diagnoses,
}: PatientEntryFormProps) => {
  const [form, setForm] = useState({
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [] as Diagnosis["code"][],
    type: "HealthCheck" as Entry["type"],
    employerName: "",
    sickLeavStartDate: "",
    sickLeaveEndDate: "",
    dischargeDate: "",
    dischargeCriteria: "",
    healthCheckRating: 0,
  });

  const [errorMsg, setErrorMsg] = useState("");

  const { id } = useParams<{ id: string }>();

  const addEntries = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!id) return;

    let patientEntries;

    const baseEntries = {
      description: form.description,
      date: form.date,
      specialist: form.specialist,
      diagnosisCodes: form.diagnosisCodes,
    };
    switch (form.type) {
      case "HealthCheck":
        patientEntries = {
          ...baseEntries,
          type: "HealthCheck" as const,
          healthCheckRating: form.healthCheckRating as HealthCheckRating,
        };
        break;
      case "Hospital":
        patientEntries = {
          ...baseEntries,
          type: "Hospital" as const,
          discharge: {
            date: form.dischargeDate,
            criteria: form.dischargeCriteria,
          },
        };
        break;
      case "OccupationalHealthcare":
        patientEntries = {
          ...baseEntries,
          type: "OccupationalHealthcare" as const,
          employerName: form.employerName,
          sickLeave: {
            startDate: form.sickLeavStartDate,
            endDate: form.sickLeaveEndDate,
          },
        };
        break;
      default:
        return;
    }

    try {
      const addedEntries = await entriesServices.create(id, patientEntries);
      setPatient({
        ...patients,
        entries: patients.entries.concat(addedEntries),
      });
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMsg(
          `${error.response?.data.field} :  ${error.response?.data.error} `,
        );
        setTimeout(() => {
          setErrorMsg("");
        }, 7000);
      } else {
        setErrorMsg("Entry failed");
      }
    }
  };

  return (
    <div
      style={{
        margin: 20,
        border: "1px dashed black ",
        padding: "10px 10px",

        borderRadius: 7,
      }}
    >
      <form onSubmit={addEntries}>
        {errorMsg && (
          <div style={{ backgroundColor: "#fae0e0", height: 27, padding: 8 }}>
            ⚠️ {errorMsg}
          </div>
        )}

        <h3> New Entry</h3>
        <FormControl fullWidth>
          <InputLabel id="entryType">Entry type</InputLabel>
          <Select
            fullWidth
            variant="outlined"
            labelId="entryType"
            label="Entry type"
            size="small"
            value={form.type}
            onChange={({ target }) =>
              setForm({
                ...form,
                type: target.value,
              })
            }
          >
            <MenuItem value="HealthCheck">HealthCheck</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational Health care
            </MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="description"
          fullWidth
          value={form.description}
          size="small"
          sx={{ marginTop: 2 }}
          onChange={({ target }) =>
            setForm({ ...form, description: target.value })
          }
        />
        <TextField
          label="date"
          type="date"
          fullWidth
          value={form.date}
          onChange={({ target }) => setForm({ ...form, date: target.value })}
          sx={{ marginTop: 1 }}
          size="small"
        />
        <TextField
          label="specialist"
          fullWidth
          value={form.specialist}
          sx={{ marginTop: 1, marginBottom: 2 }}
          size="small"
          onChange={({ target }) =>
            setForm({ ...form, specialist: target.value })
          }
        />

        <FormControl fullWidth>
          <InputLabel id="diagnosisCode">diagnosis codes</InputLabel>
          <Select
            labelId="diagnosisCode"
            multiple
            label="diagnosis codes"
            variant="outlined"
            fullWidth
            size="small"
            // sx={{ marginTop: 1 }}
            value={form.diagnosisCodes}
            onChange={({ target }) =>
              setForm({
                ...form,
                diagnosisCodes: Array.from(target.value),
              })
            }
          >
            {diagnoses.map((d) => (
              <MenuItem value={d.code} key={d.code}>
                {d.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {form.type === "HealthCheck" && (
          <>
            <FormControl fullWidth>
              <InputLabel id="healthCheck">health Check Rating</InputLabel>
              <Select
                labelId="healthCheck"
                value={form.healthCheckRating}
                label="health check rating"
                fullWidth
                sx={{ marginTop: 1 }}
                size="small"
                onChange={({ target }) =>
                  setForm({ ...form, healthCheckRating: Number(target.value) })
                }
              >
                <MenuItem value="0">Healthy</MenuItem>
                <MenuItem value="1">Low risk</MenuItem>
                <MenuItem value="2">High risk</MenuItem>
                <MenuItem value="3">Critica risk</MenuItem>
              </Select>
            </FormControl>
          </>
        )}
        {form.type === "Hospital" && (
          <>
            {" "}
            <TextField
              value={form.dischargeDate}
              label="discharge date"
              type="date"
              fullWidth
              sx={{ marginTop: 1 }}
              size="small"
              onChange={({ target }) =>
                setForm({ ...form, dischargeDate: target.value })
              }
            />
            <TextField
              value={form.dischargeCriteria}
              label="discharge criteria"
              fullWidth
              sx={{ marginTop: 1 }}
              size="small"
              onChange={({ target }) =>
                setForm({ ...form, dischargeCriteria: target.value })
              }
            />
          </>
        )}

        {form.type === "OccupationalHealthcare" && (
          <>
            {" "}
            <TextField
              value={form.employerName}
              label="employer name"
              fullWidth
              sx={{ marginTop: 1 }}
              size="small"
              onChange={({ target }) =>
                setForm({ ...form, employerName: target.value })
              }
            />{" "}
            <TextField
              value={form.sickLeavStartDate}
              label="sick-leave start date"
              fullWidth
              sx={{ marginTop: 1 }}
              type="date"
              size="small"
              onChange={({ target }) =>
                setForm({ ...form, sickLeavStartDate: target.value })
              }
            />
            <TextField
              value={form.sickLeaveEndDate}
              label="sick-leave end date"
              fullWidth
              type="date"
              sx={{ marginTop: 1 }}
              size="small"
              onChange={({ target }) =>
                setForm({ ...form, sickLeaveEndDate: target.value })
              }
            />
          </>
        )}

        <Grid container justifyContent={"space-around"} sx={{ marginTop: 3 }}>
          <Grid>
            <Button variant="contained" type="submit">
              Add
            </Button>
          </Grid>

          <Grid>
            <Button
              variant="contained"
              sx={{ bgcolor: "#ab8636" }}
              type="button"
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default PatientEntryForm2;
