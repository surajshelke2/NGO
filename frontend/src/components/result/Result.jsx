import React, { useEffect, useState } from "react";
import axios from "axios";
import { calculateScore, determinePassOrFail } from "./utils";
import StudentDetails from "./StudentDetails";
import { useParams } from "react-router-dom";

const ResultSection = () => {
  const [subjects, setSubjects] = useState([
    { srNo: 1, subjectName: "", marksObtained: 0, totalMarks: 100 },
  ]);
  const [totalScore, setTotalScore] = useState(0);
  const [passOrFail, setPassOrFail] = useState("");

  const [student, setStudent] = useState(null);
  const { studentId } = useParams();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data } = await axios.get(
          `http://192.168.59.242:3000/api/v1/class/result/get?query=${studentId}`
        );
        setStudent(data.student);
      } catch (error) {
        console.log("Error :", error.message);
      }
    };
    fetchStudent();
  }, [studentId]);

  const handleAddSubject = () => {
    const newSubject = {
      srNo: subjects.length + 1,
      subjectName: "",
      marksObtained: 0,
      totalMarks: 100,
    };
    setSubjects([...subjects, newSubject]);
  };

  const handleRemoveSubject = () => {
    if (subjects.length > 1) {
      const updatedSubjects = [...subjects];
      updatedSubjects.pop();
      setSubjects(updatedSubjects);
    }
  };

  const handleClearFields = () => {
    setSubjects([
      { srNo: 1, subjectName: "", marksObtained: 0, totalMarks: 100 },
    ]);
    setTotalScore(0);
    setPassOrFail("");
  };

  const handleSubjectChange = (index, key, value) => {
    const updatedSubjects = [...subjects];
    if (key === "marksObtained" && value > updatedSubjects[index].totalMarks) {
      alert("Marks obtained cannot be greater than total marks");
      return;
    }
    updatedSubjects[index][key] = value;
    setSubjects(updatedSubjects);
  };

  const handleCalculateResult = () => {
    const score = calculateScore(subjects);
    setTotalScore(score);
    const result = determinePassOrFail(score);
    setPassOrFail(result);
  };

  useEffect(() => {
    handleCalculateResult();
  }, [subjects]); 


  const handleSubmitResult = async () => {
    try {
      const response = await axios.post(
        "http://192.168.59.242:3000/api/v1/class/result/submit",
        { student, subjects }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting result:", error.message);
    }
  };

  return (
    <>
      <StudentDetails student={student} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Teacher Result Template</h1>
        <div className="overflow-x-auto">
          <table className="w-full mb-8 shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="py-2">Sr. No.</th>
                <th className="py-2">Subject Name</th>
                <th className="py-2">Obtained</th>
                <th className="py-2">Total Marks</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index}>
                  <td className="py-2">{subject.srNo}</td>
                  <td className="py-2">
                    <input
                      type="text"
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      value={subject.subjectName}
                      onChange={(e) =>
                        handleSubjectChange(
                          index,
                          "subjectName",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      value={subject.marksObtained}
                      onChange={(e) =>
                        handleSubjectChange(
                          index,
                          "marksObtained",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </td>
                  <td className="py-2">
                    <input
                      type="number"
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      value={subject.totalMarks}
                      onChange={(e) =>
                        handleSubjectChange(
                          index,
                          "totalMarks",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded shadow-md mr-2"
            onClick={handleAddSubject}
          >
            Add Subject
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded shadow-md mr-2"
            onClick={handleRemoveSubject}
          >
            Remove Subject
          </button>
          <button
            className="bg-yellow-500 text-white py-2 px-4 rounded shadow-md mr-2"
            onClick={handleClearFields}
          >
            Clear Fields
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded shadow-md"
            onClick={handleCalculateResult}
          >
            Calculate Result
          </button>
        </div>
        <p className="mt-4">Total Score: {totalScore}</p>
        <p>Result: {passOrFail}</p>
      </div>
      <button
        type="submit"
        onClick={handleSubmitResult}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Declare result
      </button>
    </>
  );
};

export default ResultSection;
