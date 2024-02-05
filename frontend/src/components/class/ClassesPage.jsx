import { useState, useEffect } from "react";
import ClassNavBar from "../navbars/ClassNavBar.jsx";
import ClassRegistereImage from "/images/classRegisteredImage.png";
import { classList } from "../../constants.js";
import ClassCard from "./ClassCard.jsx";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import CustomSpinner from "../CustomSpinner.jsx";

export default function ClassesPage() {
  const [className, setClassName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [classTeacher, setClassTeacher] = useState("");
  const [classData, setClassData] = useState([]);
  const [classAddedDialog, setClassAddedDialog] = useState("-200%");
  const [AddClassDialog, setAddClassDialog] = useState("-200%");
  const [loading,setLoading] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setAddClassDialog("-200%");
    (async (req,res) => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token')
        const jwtToken = localStorage.getItem('token')
        console.log("token : ",token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        const response = await axios.get("http://192.168.59.242:4000/api/v1/class");

        console.log(response.data.classes);
        setClassData(response.data.classes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching class data:", error);
        setLoading(false);
      }
    })();
  }, [classAddedDialog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(
        `http://192.168.59.242:4000/api/v1/class/add`,
        {
          className,
          classCode,
          classTeacher,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setLoading(false);
        console.log(res);
        setClassAddedDialog("20px");
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      });
  };


  function HandleAddClass() {
    setAddClassDialog("0");
  }

  return (
    <>
      {/* <ClassNavBar /> */}
      {loading ? <CustomSpinner/> : <>
      {location.search.split("=")[1] === "teacher" && (
        <button
          className="bg-blue-400 py-2 rounded-md mx-4 px-4 mt-2 hidden max-md:block"
          onClick={HandleAddClass}
        >
          Add Class
        </button>
      )}
      <div className="flex">
        <div
          className={
            location.search.split("=")[1] === "teacher"
              ? "w-2/3 p-4 grid grid-cols-4 gap-2 h-fit max-md:w-full max-sm:grid-cols-2"
              : "w-full p-4 grid grid-cols-4 gap-2 h-fit max-md:w-full max-sm:grid-cols-2"
          }
        >
          {classData ? (
            classData.map((classItem, index) => (
              <ClassCard
                classItem={classItem}
                key={index}
                role={location.search.split("=")[1]}
              />
            ))
          ) : (
            <div className="text-center text-3xl text-gray-300 w-full">
              No Classes Available Yet!!
            </div>
          )}
        </div>

        {location.search.split("=")[1] === "teacher" && (
          <div
            className="w-1/3 p-4 rounded-lg mx-auto max-md:absolute max-md:h-screen max-md:bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-200 max-md:w-full max-md:z-50"
            style={{ top: AddClassDialog }}
          >
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col max-md:w-2/3 max-md:m-auto max-md:p-4 max-md:rounded-lg max-md:m-50px max-sm:w-full"
            >
              <div
                className="text-end m-2 text-xl hidden max-md:block cursor-pointer"
                onClick={() => setAddClassDialog("-200%")}
              >
                X
              </div>
              <button
                className="bg-teal-500 p-2 w-full rounded-md text-white"
                onClick={(e) => e.preventDefault()}
              >
                Add Class Here!
              </button>
              <div className="flex flex-row items-center mt-4">
                <select
                  type="number"
                  placeholder="className"
                  autoFocus
                  value={className}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-blue-400  focus:ring-1 focus:blue-500"
                  onChange={(e) => setClassName(e.target.value)}
                >
                  <option value="0">Select class</option>
                  {classList.classes.map((classItem, index) => (
                    <option value={classItem} key={index}>
                      class {classItem}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="class code"
                  value={classCode}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-blue-400  focus:ring-1 focus:blue-500"
                  onChange={(e) => setClassCode(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="class teacher name"
                  value={classTeacher}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-transparent border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-blue-400  focus:ring-1 focus:blue-500"
                  onChange={(e) => setClassTeacher(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="mt-6 px-4 py-2 text-sm font-medium text-white rounded-lg focus:ring-4 focus:ring-blue-300 focus:outline-none bg-gradient-to-r from-green-400 to-blue-500 hover:from-teal-500 hover:to-teal-500"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
      </>}
    </>
  );
}
