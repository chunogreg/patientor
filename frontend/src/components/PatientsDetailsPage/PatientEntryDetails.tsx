import { Diagnosis, Entry, Patient } from "../../types";
import { HealthTypeIcons, Rating } from "../HealthIcons";

interface Props {
  patient: Patient;
  diagnoses: Diagnosis[];
}

const PatientEntryDetails = ({ patient, diagnoses }: Props) => {
  console.log("==DIAGNOSE==", diagnoses[0]);

  const entryDetails = (entry: Entry) => {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <div
            style={{
              border: "1px solid black",
              borderRadius: 6,
              padding: 6,
              marginBottom: 12,
            }}
          >
            <div>
              {entry.date} <HealthTypeIcons type={entry.type} />
            </div>{" "}
            <div>
              {" "}
              <i>{entry.description} </i>{" "}
            </div>
            <div>
              {" "}
              <Rating rating={entry.healthCheckRating} />{" "}
            </div>
            {/* {rating(entry.healthCheckRating)} </div> */}
            <div>Diagnosed by: {entry.specialist} </div>
          </div>
        );
      case "Hospital":
        return (
          <div
            style={{
              border: "1px solid black",
              borderRadius: 6,
              padding: 6,
              marginBottom: 12,
            }}
          >
            <div>
              {entry.date} <HealthTypeIcons type={entry.type} />
            </div>
            <div>
              <i>{entry.description} </i>{" "}
            </div>
            <div>
              {entry.diagnosisCodes?.map((d) => (
                <ul key={d}>
                  <li>
                    {d} {diagnoses.find((diag) => diag.code == d)?.name}
                  </li>
                </ul>
              ))}
            </div>
            <div>
              <div>Discharge date: {entry.discharge.date} </div>
              <div> Criteria: {entry.discharge.criteria}</div>
            </div>{" "}
            <br />
            <div>Diagnosed by: {entry.specialist}</div>
          </div>
        );
      case "OccupationalHealthcare":
        return (
          <div
            style={{
              border: "1px solid black",
              borderRadius: 6,
              padding: 6,
              marginBottom: 12,
            }}
          >
            <div>
              {entry.date} <HealthTypeIcons type={entry.type} />{" "}
              {entry.employerName}
            </div>{" "}
            <div>
              <i>{entry.description} </i>
            </div>
            <div>
              {entry.diagnosisCodes?.map((d) => (
                <ul key={d}>
                  <li>
                    {d} {diagnoses.find((diag) => diag.code === d)?.name}
                  </li>
                </ul>
              ))}
            </div>
            <div>
              Sick leave: {entry.sickLeave?.startDate} to{" "}
              {entry.sickLeave?.endDate}
            </div>
            <br />
            <div>Diagnosed by: {entry.specialist}</div>
          </div>
        );
    }
  };

  return (
    <div>
      {/* <h3>{patient.entries.length === 0 ? "no entry" : "Entries"}</h3>
      {patient.entries.map((e) => (
        <div key={e.id}>
          <div>
            {e.date} {e.type} {e.} {e.description}
          </div>
          <br />
          <div style={{ marginLeft: 22 }}>
            {e.diagnosisCodes?.map((d) => (
              <li>
                {d} {diagnoses.find((diag) => diag.code === d)?.name}
              </li>
            ))}
          </div> <div>{e.specialist}</div>
        </div>
      ))} */}{" "}
      <h3>{patient.entries.length === 0 ? "no entry" : "Entries"}</h3>
      {patient.entries.map((e) => (
        <div key={e.id}>{entryDetails(e)}</div>
      ))}
    </div>
  );
};

export default PatientEntryDetails;
