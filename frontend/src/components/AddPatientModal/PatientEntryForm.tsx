import {
  SyntheticEvent,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import entriesServices from "../../services/entries";
import { useParams } from "react-router-dom";
import type { HealthCheckRating, Patient } from "../../types";
import { TextField, Button, Grid } from "@mui/material";
import { isAxiosError } from "axios";

interface PatientEntryFormProps {
  patient: Patient;
  setPatient: Dispatch<SetStateAction<Patient | undefined>>;
}

const PatientEntryForm = ({ patient, setPatient }: PatientEntryFormProps) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(0);

  // const [employerName, setEmployerName] = useState("");
  // const [sickLeaveStart, setSickLeaveStart] = useState("");
  // const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // const [entries, setEntries] = useState();

  const { id } = useParams<{ id: string }>();

  const addEntries = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!id) return;
    const patientEntries = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.split(",").map((code) => code.trim()),
      //  type: "OccupationalHealthcare" as const,
      type: "HealthCheck" as const,
      //employerName,
      // sickLeave: {
      //   startDate: sickLeaveStart,
      //   endDate: sickLeaveEnd,
      // },
      healthCheckRating,
    };
    try {
      const addedEntries = await entriesServices.create(id, patientEntries);
      setPatient({
        ...patient,
        entries: patient.entries.concat(addedEntries),
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

    console.log("===== ERROR MSG=000 ========", errorMsg);

    const addedEntries = await entriesServices.create(id, patientEntries);
    setPatient({
      ...patient,
      entries: patient.entries.concat(addedEntries),
    });
  };
  const onCancel = () => {
    setDate("");
    setDescription("");
    setDiagnosisCodes("");
    // setEmployerName("");
    // setSickLeaveEnd("");
    // setSickLeaveStart("");
    setSpecialist("");
  };

  // const onDiagnosisCodes = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   //const codes = [].concat(value)
  // //   setDiagnosisCodes(
  // //     value
  // //       .split(",")
  // //       .map((code) => code.trim())
  // //       .filter(Boolean),
  // //   );
  // // };

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
        <h3> New HealthCheck Entry</h3>
        <TextField
          label="description"
          fullWidth
          value={description}
          size="small"
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          sx={{ marginTop: 1 }}
          size="small"
        />
        <TextField
          label="specialist"
          fullWidth
          value={specialist}
          sx={{ marginTop: 1 }}
          size="small"
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          sx={{ marginTop: 1 }}
          size="small"
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />{" "}
        <TextField
          label="healthCheckRating"
          fullWidth
          value={healthCheckRating}
          sx={{ marginTop: 1 }}
          size="small"
          onChange={({ target }) =>
            setHealthCheckRating(Number(target.value) as HealthCheckRating)
          }
        />
        {/* <TextField
          label="employer name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
        />{" "}
        <TextField
          label="sick leave start"
          fullWidth
          value={sickLeaveStart}
          onChange={({ target }) => setSickLeaveStart(target.value)}
        />
        <TextField
          label="sick leave end"
          fullWidth
          value={sickLeaveEnd}
          onChange={({ target }) => setSickLeaveEnd(target.value)}
        /> */}
        <Grid container justifyContent={"space-around"} sx={{ marginTop: 3 }}>
          <Grid>
            <Button variant="contained" type="submit">
              Add entries
            </Button>
          </Grid>

          <Grid>
            <Button
              variant="contained"
              sx={{ bgcolor: "#ab8636" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default PatientEntryForm;
