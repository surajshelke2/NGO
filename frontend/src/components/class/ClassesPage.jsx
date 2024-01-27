import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ClassNavBar from "../navbars/ClassNavBar";
import axios from "axios";

export default function ClassesPage() {
  const [className, setClassName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [classData, setClassData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState("");
  useEffect(() => {
    setCurrentUrl(location.pathname + location.search);
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/class");
        setClassData(data.classes);
        console.log(data);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };

    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(currentUrl + `&class=${e.target.id}`);
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/class/add",
        {
          className: className,
          classCode: classCode,
        }
      );

      await setClassData([...classData, response.data]);

      setClassName("");
      setClassCode("");
      setLoading(false);
    } catch (error) {
      console.error("Error while adding class:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <ClassNavBar />
      <div className="bg-red-300 max-w-sm p-4 rounded-lg shadow-lg mx-auto mt-10">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <h3 className="font-bold text-center">Add Class</h3>
          <div className="flex flex-row items-center mt-4">
            <label htmlFor="className" className="mx-3 font-semibold">
              Class Name:
            </label>
            <input
              type="text"
              id="className"
              name="className"
              className="rounded-lg p-1 bg-red-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Class Name"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center mt-4">
            <label htmlFor="classCode" className="mx-3 font-semibold">
              Class Code:
            </label>
            <input
              type="text"
              id="classCode"
              name="classCode"
              className="rounded-lg p-1 bg-red-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Class Code"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-6 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>

      <hr className="border my-8" />

      <div className="container flex ">
        {loading ? (
          <div className="text-center mt-4">Loading...</div>
        ) : classData && classData.length > 0 ? (
          classData.map((classItem, index) => (
            <div className="flex max-w-sm">
              <div
                key={index}
                className="bg-red-300 max-w-xs p-4 rounded-lg shadow-lg mx-10 mt-10 max-auto md:mx-w-sm sm:mx-w-sm"
              >
                <h1>{classItem.className}</h1>
                <h1>{classItem.classCode}</h1>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-4">No classes have been added.</div>
        )}
      </div>
    </>
  );
}
