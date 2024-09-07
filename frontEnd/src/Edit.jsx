import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Edit() {
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:8080/read/" + id)
      .then((res) => {
        console.log(res);
        setValues({
          ...values,
          name: res.data[0].Name,
          email: res.data[0].Email,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  const [values, setValues] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleEditSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8080/edit/" + id, values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex vh-100 vw-100 bg-black justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3 ">
        <form onSubmit={handleEditSubmit}>
          <h2>Add New Student</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter your Name "
              className="form-control"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter your Email "
              className="form-control"
              value={values.email}
              onChange={(e) =>
                setValues({
                  ...values,
                  email: e.target.value,
                })
              }
            />
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
