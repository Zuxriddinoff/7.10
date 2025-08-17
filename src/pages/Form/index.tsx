import { memo, useEffect, useState, type FormEvent } from "react";
import type { IUser } from "../../types";
import { useUser } from "../../api/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../lib";
import { deleteUser } from "../../lib/features/update";

const initialState: IUser = {
  full_name: "",
  username: "",
  email: "",
  phone_number: "",
  password: "",
  confirm_password: "",
  gender: "",
};

const Form = () => {
  const navigate = useNavigate();
  const { createUser, updateUser } = useUser();
  const [formData, setFormData] = useState<IUser>(initialState);
  const dispatch = useDispatch();

  
  const editingUser = useSelector((state:RootState) => state.updateSlice)


  useEffect(() => {
  if (editingUser) {
    setFormData({
      full_name: editingUser.selectedUser?.full_name ?? "",
      username: editingUser.selectedUser?.username ?? "",
      email: editingUser.selectedUser?.email ?? "",
      phone_number: editingUser.selectedUser?.phone_number ?? "",
      password: editingUser.selectedUser?.password ?? "",
      confirm_password: editingUser.selectedUser?.password ?? "",
      gender: editingUser.selectedUser?.gender ?? "",
    });
  }
}, [editingUser]);

  
  console.log(editingUser);
  

  const {
    full_name,
    username,
    email,
    phone_number,
    password,
    confirm_password,
    gender,
  } = formData;

  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let user = {
      full_name,
      username,
      email,
      phone_number,
      password,
      gender,
    };
    if(editingUser){
      console.log(545);
      
      updateUser.mutate(
        {id: editingUser.selectedUser?.id, data:user}, 
        {onSuccess:() => {
          setFormData(initialState)
          dispatch(deleteUser())
          navigate("/")
        }}
      )
    }else{
      console.log(111111);
      
      createUser.mutate(user, {
      onSuccess: () => {
        setFormData(initialState);

        navigate("/");
      },
    });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-[600px] bg-white p-5 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold uppercase">Registration</h2>
        <form onSubmit={handelSubmit} action="">
          <div className="grid grid-cols-2 gap-10">
            <div>
              <div className="mb-3">
                <label htmlFor="full_name">
                  <span className="text-sm inline-block mb-1 text-gray-500">
                    Full Name
                  </span>
                  <input
                    value={full_name}
                    name="full_name"
                    onChange={handleChange}
                    className={`border w-full h-10 indent-3 border-gray-200 rounded-md  focus:border-blue-400 focus:outline-2 focus:outline-blue-50`}
                    id="full_name"
                    type="text"
                    placeholder="full Name"
                  />
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="email">
                  <span className="text-sm inline-block mb-1 text-gray-500">
                    Email
                  </span>
                  <input
                    value={email}
                    name="email"
                    onChange={handleChange}
                    className={`border w-full h-10 indent-3 border-gray-200 rounded-md  focus:border-blue-400 focus:outline-2 focus:outline-blue-50`}
                    id="email"
                    type="email"
                    placeholder="email"
                  />
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="password">
                  <span className="text-sm inline-block mb-1 text-gray-500">
                    Password
                  </span>
                  <input
                    value={password}
                    name="password"
                    onChange={handleChange}
                    className={`border w-full h-10 indent-3 border-gray-200 rounded-md  focus:border-blue-400 focus:outline-2 focus:outline-blue-50`}
                    id="password"
                    type="text"
                    placeholder="password"
                  />
                </label>
              </div>
            </div>
            <div>
              <div className="mb-3">
                <label htmlFor="username">
                  <span className="text-sm inline-block mb-1 text-gray-500">
                    Username
                  </span>
                  <input
                    value={username}
                    name="username"
                    onChange={handleChange}
                    className={`border w-full h-10 indent-3 border-gray-200 rounded-md  focus:border-blue-400 focus:outline-2 focus:outline-blue-50`}
                    id="username"
                    type="text"
                    placeholder="username"
                  />
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="phone_number">
                  <span className="text-sm inline-block mb-1 text-gray-500">
                    Phone Number
                  </span>
                  <input
                    value={phone_number}
                    name="phone_number"
                    onChange={handleChange}
                    className={`border w-full h-10 indent-3 border-gray-200 rounded-md  focus:border-blue-400 focus:outline-2 focus:outline-blue-50`}
                    id="phone_number"
                    type="text"
                    placeholder="phone number"
                  />
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="Confirm_Password">
                  <span className="text-sm inline-block mb-1 text-gray-500">
                    Confirm Password
                  </span>
                  <input
                    value={confirm_password}
                    name="confirm_password"
                    onChange={handleChange}
                    className={`border w-full h-10 indent-3 border-gray-200 rounded-md  focus:border-blue-400 focus:outline-2 focus:outline-blue-50`}
                    id="Confirm_Password"
                    type="text"
                    placeholder="confirm password"
                  />
                </label>
              </div>
            </div>
          </div>
          <h2 className="text-md font-bold mt-1 mb-2">Gender</h2>
          <div className="flex gap-20">
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value={"male"}
                onChange={handleChange}
                checked={gender === "male"}
              />
              <label htmlFor="male"> Male </label>
            </div>
            <div>
              <input
                type="radio"
                id="famale"
                name="gender"
                value={"female"}
                onChange={handleChange}
                checked={gender === "female"}
              />
              <label htmlFor="female"> Female </label>
            </div>
          </div>
          <button
            className="w-full py-2 mt-5 text-white rounded-lg"
            style={{
              background:
                "linear-gradient(125deg, rgba(113,182,230,1) 0%, rgba(154,93,188,1) 100%)",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default memo(Form);
