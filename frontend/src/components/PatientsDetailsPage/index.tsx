import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientServices from "../../services/patients";
import diagnosesServices from "../../services/diagnoses";
import { Diagnosis, Patient } from "../../types";
import { Male } from "@mui/icons-material";
import { Female } from "@mui/icons-material";
import PatientEntryDetails from "./PatientEntryDetails";
//import PatientEntryForm from "../AddPatientModal/PatientEntryForm";
import PatientEntryForm2 from "../AddPatientModal/PatientEntryForm2";

const PatientDetailsPage = () => {
  const [patients, setPatients] = useState<Patient | undefined>(undefined);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [showForm, setShowForm] = useState(false);

  //  console.log("==DIAGNOSE==", diagnoses[3]);

  const { id } = useParams<{ id: string }>();
  //const id = "d2773336-f723-11e9-8f0b-362b9e155667";

  useEffect(() => {
    const getPatient = async () => {
      if (!id) return;
      const patientData = await patientServices.getOne(id);
      setPatients(patientData);
      const diagnosesData = await diagnosesServices.getAll();
      setDiagnoses(diagnosesData);
    };
    getPatient();
  }, [id]);

  return (
    <div>
      {!showForm && (
        <button type="button" onClick={() => setShowForm(true)}>
          Add New Entry
        </button>
      )}
      {patients && (
        <>
          <div style={{ marginBottom: 12 }}>
            <h2>
              {patients.name}{" "}
              {patients.gender === "male" ? <Male /> : <Female />}
            </h2>
          </div>{" "}
          <div> ssn: {patients.ssn}</div>
          <div>occupation: {patients.occupation}</div>{" "}
          <div> date of birth: {patients.dateOfBirth}</div>{" "}
        </>
      )}
      {patients && (
        <PatientEntryDetails patients={patients} diagnoses={diagnoses} />
      )}
      {/* {patients && (
        <PatientEntryForm patients={patients} setPatient={setPatient} />
      )} */}{" "}
      {showForm && patients && (
        <PatientEntryForm2
          patients={patients}
          setPatient={setPatients}
          diagnoses={diagnoses}
        />
      )}
    </div>
  );
};

export default PatientDetailsPage;
