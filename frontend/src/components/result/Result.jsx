import React, { useState } from 'react';
import { calculateScore, determinePassOrFail } from './utils'; 

const ResultSection = () => {
  const [subjects, setSubjects] = useState([{ srNo: 1, subjectName: '', marksObtained: 0, totalMarks: 0 }]);
  const [totalScore, setTotalScore] = useState(0);
  const [passOrFail, setPassOrFail] = useState('');
   
  const handleAddSubject = () => {
    const newSubject = { srNo: subjects.length + 1, subjectName: '', marksObtained: 0, totalMarks: 0 };
    setSubjects([...subjects, newSubject]);
  };

  const handleSubjectChange = (index, key, value) => {
    const updatedSubjects = [...subjects];
    
    if (key === 'marksObtained' && value > updatedSubjects[index].totalMarks) {
      alert('Marks obtained cannot be greater than total marks');
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

  return (
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
                    onChange={(e) => handleSubjectChange(index, 'subjectName', e.target.value)}
                  />
                </td>
                <td className="py-2">
                  <input
                    type="number"
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                    value={subject.marksObtained}
                    onChange={(e) => handleSubjectChange(index, 'marksObtained', parseInt(e.target.value))}
                  />
                </td>
                <td className="py-2">
                  <input
                    type="number"
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                    value={subject.totalMarks}
                    onChange={(e) => handleSubjectChange(index, 'totalMarks', parseInt(e.target.value))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        <button className="bg-blue-500 text-white py-2 px-4 rounded shadow-md mr-2" onClick={handleAddSubject}>Add Subject</button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded shadow-md" onClick={handleCalculateResult}>Calculate Result</button>
      </div>
      <p className="mt-4">Total Score: {totalScore}</p>
      <p>Result: {passOrFail}</p>
    </div>
  );
};

export default ResultSection;
