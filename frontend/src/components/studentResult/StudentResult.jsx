import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { calculateScore, determinePassOrFail } from "../result/utils";


const StudentResult = () => {
  const { studentId } = useParams();
  const [studentResult, setStudentResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.59.242:3000/api/v1/class/result/view?query=${studentId}`
        );
        setStudentResult(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  const handleDownloadPDF = () => {
    const content = document.getElementById("result-content");
    html2pdf().from(content).save("student_result.pdf");
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6">Error: {error}</p>;
  if (!studentResult) return null;

  const averagePercentage = calculateScore(studentResult.student.result.subjects);
  const passOrFailMessage = determinePassOrFail(averagePercentage);

  return (
    <div className="p-6">
      <div id="result-content" className="mx-auto w-1/2 border border-gray-300 p-6">
        <h2 className="text-center text-xl font-bold mb-6">Student Result</h2>
        <table className="w-full mb-6">
          <tr>
            <td className="text-right font-bold pr-4">Name:</td>
            <td>{studentResult.student.firstName} {studentResult.student.middleName} {studentResult.student.lastName}</td>
          </tr>
          <tr>
            <td className="text-right font-bold pr-4">Student ID:</td>
            <td>{studentResult.student._id}</td>
          </tr>
        </table>
        <h3 className="text-center text-lg font-bold mb-4">Subjects:</h3>
        <table className="w-full">
          <tr>
            <th className="border border-gray-300 p-2">Subject Name</th>
            <th className="border border-gray-300 p-2">Marks Obtained</th>
            <th className="border border-gray-300 p-2">Total Marks</th>
          </tr>
          {studentResult.student.result.subjects.map((subject, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{subject.subjectName}</td>
              <td className="border border-gray-300 p-2">{subject.marksObtained}</td>
              <td className="border border-gray-300 p-2">{subject.totalMarks}</td>
            </tr>
          ))}
        </table>
        <p className="mt-6 text-center">{`Average Percentage: ${averagePercentage.toFixed(2)}%`}</p>
        <p className="text-center font-bold">{`Result: ${passOrFailMessage}`}</p>
      </div>
      <button
        className="block mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
        onClick={handleDownloadPDF}
      >
        Download Result as PDF
      </button>
    </div>
  );
};

export default StudentResult;
