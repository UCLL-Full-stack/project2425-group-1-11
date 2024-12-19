import RecordService from "@services/RecordService";
import useCurrentPatient from "hook/useCurrentPatient";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { mutate } from "swr";

type Props = {
  onRecordCreated: (record: any) => void; 
};

const AddRecord: React.FC<Props> = ({ onRecordCreated }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [titleError, setTitleError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");

  const router = useRouter();
  const patient = useCurrentPatient();

  useEffect(() => {
    const interval = setInterval(() => {
      mutate('records');
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const validate = () => {
    let valid = true;
    setTitleError("");
    setDescriptionError("");

    if (title === "" || title.trim() === "") {
      setTitleError("Title is required.");
      valid = false;
    }

    if (description === "" || description.trim() === "") {
      setDescriptionError("Description is required.");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validate()) {
      return;
    }
  
    if (!patient || typeof patient.id !== "number") {
      console.error("Patient ID is invalid");
      return;
    }
  
    const record = {
      title,
      description,
    };
  
    try {
      const response = await RecordService.addRecord(record, patient.id);
  
      if (response.ok) {
        const newRecord = await response.json();
        onRecordCreated(newRecord); // Call the callback function
        //mutate('records'); // Optimistic update
        mutate('records', (data: any) => [...(data || []), newRecord], false); // Optimistic update
        setTitle(""); // Clear the form
        setDescription("");
        router.push("/records"); // Navigate to records page
      } else {
        console.error("Failed to add record");
      }
    } catch (error) {
      console.error("An error occurred while adding the record", error);
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {titleError && <p>{titleError}</p>}
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {descriptionError && <p>{descriptionError}</p>}
      </div>
      <button type="submit">Add Record</button>
    </form>
  );
};

export default AddRecord;