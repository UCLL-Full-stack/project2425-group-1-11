import RecordService from "@services/RecordService";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { mutate } from "swr";

const AddRecord: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [titleError, setTitleError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");

  const router = useRouter();

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

    const record = {
      title,
      description,
    };

    try {
      const response = await RecordService.addRecord(record);

      if (response.ok) {
        // Revalidate the records data
        mutate('records');
        router.push("/records");
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