import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  // Check to see if values already exist in session storage and set hooks
  const [details, setDetails] = useState<string>(
    localStorage.getItem("details") ?? ""
  );
  const [assignee, setAssignee] = useState<string>(
    localStorage.getItem("assignee") ?? ""
  );
  const [dueDate, setDueDate] = useState<string>(
    localStorage.getItem("dueDate") ?? ""
  );

  useEffect(() => {
    // On change of any value update local storage
    localStorage.setItem("details", details);
    localStorage.setItem("assignee", assignee);
    localStorage.setItem("dueDate", dueDate);
  }, [details, assignee, dueDate]);

  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    // Check if date input is in correct format
    if (!dateRegex.test(dueDate)) {
      // Stop submit
      return;
    }

    // Clear storage on form submit (Save)
    localStorage.removeItem("details");
    localStorage.removeItem("assignee");
    localStorage.removeItem("dueDate");

    // Reload page to clear controls
    window.location.reload();
  };

  return (
    <div className="app">
      <form className="form" onSubmit={onSave}>
        <legend>Create new task</legend>

        <div>
          <label htmlFor="details">Details</label>
          <input
            type="text"
            name="details"
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="assignee">Assignee</label>
          <select
            name="assignee"
            id="assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          >
            <option value=""></option>
            <option value="Joep">Joep</option>
            <option value="Raymon">Raymon</option>
          </select>
        </div>

        <div>
          <label htmlFor="dueDate">Due date</label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
