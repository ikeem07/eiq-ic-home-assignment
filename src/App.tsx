import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const controls = ["details", "assignee", "dueDate"];

  // Check to see if values already exist in session storage and set hooks
  const [details, setDetails] = useState<string>(
    localStorage.getItem(controls[0]) ?? ""
  );
  const [assignee, setAssignee] = useState<string>(
    localStorage.getItem(controls[1]) ?? ""
  );
  const [dueDate, setDueDate] = useState<string>(
    localStorage.getItem(controls[2]) ?? ""
  );

  useEffect(() => {
    // On change of any value update local storage
    localStorage.setItem(controls[0], details);
    localStorage.setItem(controls[1], assignee);
    localStorage.setItem(controls[2], dueDate);
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
    controls.forEach(function (control) {
      localStorage.removeItem(control);
    });

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
