import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientServices from "../../services/patients";
import diagnosesServices from "../../services/diagnoses";
import { Diagnosis, Patient } from "../../types";
import { Male } from "@mui/icons-material";
import { Female } from "@mui/icons-material";
import PatientEntryDetails from "./PatientEntryDetails";

const PatientDetailsPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  //  console.log("==DIAGNOSE==", diagnoses[3]);

  const { id } = useParams<{ id: string }>();
  //const id = "d2773336-f723-11e9-8f0b-362b9e155667";

  useEffect(() => {
    const getPatient = async () => {
      if (!id) return;
      const patientData = await patientServices.getOne(id);
      setPatient(patientData);
      const diagnosesData = await diagnosesServices.getAll();
      setDiagnoses(diagnosesData);
    };
    getPatient();
  }, [id]);

  // console.log(" ==PATIENT=", patient);

  return (
    <div>
      {patient && (
        <>
          <div style={{ fontSize: 22, marginBottom: 12 }}>
            {patient.name} {patient.gender === "male" ? <Male /> : <Female />}
          </div>{" "}
          <div> ssn: {patient.ssn}</div>
          <div>occupation: {patient.occupation}</div>{" "}
          <div> date of birth: {patient.dateOfBirth}</div>{" "}
        </>
      )}
      {patient && (
        <PatientEntryDetails patient={patient} diagnoses={diagnoses} />
      )}
    </div>
  );
};

export default PatientDetailsPage;
