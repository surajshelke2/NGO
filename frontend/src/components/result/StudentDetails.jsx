import React  from "react";


const StudentDetails = ({ student }) => {
  return (
    <div className="container mx-auto mt-2 p-4 bg-gray-200 rounded-lg shadow-lg">
      {student && (
        <div className="flex flex-col">
          <div className="mb-4">
            <label className="text-sm font-semibold">Full Name:</label>
            <h2 className="text-lg font-semibold">{`${student.firstName} ${student.middleName} ${student.lastName}`}</h2>
          </div>
          <div>
            <label className="text-sm font-semibold">Roll No:</label>
            <h2 className="text-lg font-semibold">{student.rollNo}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
