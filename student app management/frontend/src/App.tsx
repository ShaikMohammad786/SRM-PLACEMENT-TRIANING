import { Card } from "./card";
import { Form } from "./form";
import { useState } from "react";
import axios from "axios";

export function App() {
  const [students, setStudents] = useState<any[]>([]);

  async function getDetails() {
    const res = await axios.get(
      "http://localhost:5000/students/getdetails"
    );

    setStudents(res.data.students);
  }

  return (
    <div>
      <Form />

      <button onClick={getDetails}>
        Get Details
      </button>

      <div className="flex flex-wrap gap-4 justify-center">
        {students.map((student: any) => (
          <Card
            key={student.roll_no}
            name={student.name}
            id={student.roll_no}
            dept={student.dept}
            age={student.age}
            image={student.image}
          />
        ))}
      </div>
    </div>
  );
}

export default App;