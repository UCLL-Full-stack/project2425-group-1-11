import AppointmentService from "@services/AppointmentService";
import DoctorService from "@services/DoctorService";
import { User } from "@types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { mutate } from "swr";

const MakeAppointment: React.FC = () => {
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [doctor, setDoctor] = useState<string>("");
  const [doctors, setDoctors] = useState<{ id: number; user: User; department: string; }[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");


  const [startError, setStartError] = useState<string>("");
  const [endError, setEndError] = useState<string>("");
  const [doctorError, setDoctorError] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await DoctorService.getAllDoctors();
        const doctors = await response.json();
        setDoctors(doctors);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };
  
    fetchDoctors();
  }, []);

  const validate = () => {
    let valid = true;
    setStartError("");
    setEndError("");
    setDoctorError("");

    const startDate = new Date(start);
    const endDate = new Date(end);
    const now = new Date();

    if (start === "" || start.trim() === "") {
      setStartError("Start date is required.");
      valid = false;
    } else if (startDate <= now) {
      setStartError("Start date must be in the future.");
      valid = false;
    }

    if (end === "" || end.trim() === "") {
      setEndError("End date is required.");
      valid = false;
    } else if (endDate <= startDate) {
      setEndError("End date must be after the start date.");
      valid = false;
    }

    if (doctor === "" || doctor.trim() === "") {
      setDoctorError("Doctor is required.");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(e)

    if (!validate()) {
      return;
    }

    const appointment = {
      startDate: start,
      endDate: end,
      comment: comments,
      doctorId: parseInt(doctor),
    };

    try {
      const response = await AppointmentService.makeAppointment(appointment);

      if (response.ok) {
        mutate('appointments');

        setSuccessMessage("Appointment successfully created!");

        router.push("/appointments");
      } else {
        const errorData = await response.json();
        if (errorData.message === "Doctor unavailable") {
          setDoctorError("The selected doctor is unavailable.");
        } else {
          console.error("Failed to create appointment");
        }
      }
    } catch (error) {
      console.error("An error occurred while creating the appointment", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Start Date</label>
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        {startError && <p>{startError}</p>}
      </div>
      <div>
        <label>End Date</label>
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        {endError && <p>{endError}</p>}
      </div>
      <div>
        <label>Comments</label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>
      <div>
        <label>Doctor</label>
        <select value={doctor} onChange={(e) => setDoctor(e.target.value)}>
          <option value="">Select a doctor</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {`${doc.user.firstName} ${doc.user.lastName}`}
            </option>
          ))}
        </select>
        {doctorError && <p>{doctorError}</p>}
      </div>
      <button onClick={handleSubmit}>Book now</button>
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
};

export default MakeAppointment;