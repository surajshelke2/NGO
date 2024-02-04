import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FindStudents = () => {
  const [student, setStudent] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (student) {
        try {
          const { data } = await axios.get(
            `http://localhost:4000/api/v1/class/result/search?query=${student}`
          );
          setSearchResult(data);
          setError(null); 
        } catch (error) {
          setError(error.response);
          setSearchResult([]);
        }
      } else {
        setSearchResult([]);
        setError(null); 
      }
    }, 300); 

    return () => clearTimeout(delayDebounceFn);
  }, [student]);

  const handleNavigate = (student) => {
    navigate(`/user/result/${student._id}`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-4/5 md:w-1/2 lg:w-1/3 p-4 mx-auto bg-white shadow-md rounded-lg">
        <div className="search-student">
          <label htmlFor="name" className="block mb-2 text-lg font-semibold text-gray-800">
            Search Student by Name or ID:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 w-full"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Search Results:</h2>
          {error && <p className="text-red-500">Error: {error.message}</p>}
          {searchResult.length > 0 ? (
            <ul>
              {searchResult.map((student, index) => (
                <li key={student._id} className="border-b border-gray-300 py-2 flex items-center">
                  <div className="w-3/4">
                    <p className="mb-1 text-sm">
                      <strong>Name:</strong> {student.firstName + " " + student.lastName}
                    </p>
                    <p className="mb-1 text-sm">
                      <strong>ID:</strong> {student.rollNo}
                    </p>
                    <p className="mb-1 text-sm">
                      <strong>Email:</strong> {student.email}
                    </p>
                  </div>
                  <div className="w-1/4">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleNavigate(student)}
                    >
                      Navigate
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4">No User Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindStudents;
