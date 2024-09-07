import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Read() {
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/read/" + id)
      .then((res) => {
        console.log(res);
        setStudent(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="d-flex vh-100 vw-100 bg-black justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3 ">
        <h2>Student Detail</h2>
        <p>{student.ID}</p>
        <p>{student.Name}</p>
        <p>{student.Email}</p>
        <Link to="/" className="btn btn-sm btn-info">
          Back
        </Link>
        <Link
          to={`/edit/${student.ID}`}
          className="btn btn-sm btn-primary mx-2"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}

export default Read;
