import { useEffect } from "react";
import { useUser } from "../../api/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../lib";
import { deleteUser } from "../../lib/features/update";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface IUserForm {
  full_name: string;
  username: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
  gender: string;
}

const schema = yup.object({
  full_name: yup.string().required("Full name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email().required("Email is required"),
  phone_number: yup.string().required("Phone number is required"),
  password: yup.string().required().min(6, "At least 6 chars"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  gender: yup.string().required("Gender is required"),
});

const Form = () => {
  const navigate = useNavigate();
  const { createUser, updateUser } = useUser();
  const dispatch = useDispatch();
  const editingUser = useSelector((state: RootState) => state.updateSlice);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<IUserForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      full_name: "",
      username: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
      gender: "",
    },
  });

  // Agar update rejimi bo‘lsa formani to‘ldirish
  useEffect(() => {
    if (editingUser?.selectedUser) {
      const u = editingUser.selectedUser;
      reset({
        full_name: u.full_name ?? "",
        username: u.username ?? "",
        email: u.email ?? "",
        phone_number: u.phone_number ?? "",
        password: u.password ?? "",
        confirm_password: u.password ?? "",
        gender: u.gender ?? "",
      });
    }
  }, [editingUser, reset]);

  const onSubmit = (data: IUserForm) => {
    const user = {
      full_name: data.full_name,
      username: data.username,
      email: data.email,
      phone_number: data.phone_number,
      password: data.password,
      gender: data.gender,
    };

    if (editingUser?.selectedUser) {
      updateUser.mutate(
        { id: editingUser.selectedUser.id, data: user },
        {
          onSuccess: () => {
            reset();
            dispatch(deleteUser());
            navigate("/");
          },
        }
      );
    } else {
      createUser.mutate(user, {
        onSuccess: () => {
          reset();
          navigate("/");
        },
      });
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-[600px] bg-white p-5 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold uppercase">Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-10">
            <div>
              {/* Full name */}
              <div className="mb-3">
                <label htmlFor="full_name">
                  <span className="text-sm inline-block mb-1 text-gray-500">
                    Full Name
                  </span>
                  <input
                    {...register("full_name")}
                    className="border w-full h-10 indent-3 border-gray-200 rounded-md focus:border-blue-400 focus:outline-2 focus:outline-blue-50"
                    id="full_name"
                    type="text"
                    placeholder="full Name"
                  />
                </label>
                {errors.full_name && (
                  <p className="text-red-500 text-sm">
                    {errors.full_name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email">
                  <span className="text-sm inline-block mb-1 text-gray-500">
                    Email
                  </span>
                  <input
                    {...register("email")}
                    className="border w-full h-10 indent-3 border-gray-200 rounded-md focus:border-blue-400 focus:outline-2 focus:outline-blue-50"
                    id="email"
                    type="email"
                    placeholder="email"
                  />
                </label>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password">
                  <span className="text-sm inline-block mb-1 text-gray-500">
                    Password
                  </span>
                  <input
                    {...register("password")}
                    className="border w-full h-10 indent-3 border-gray-200 rounded-md focus:border-blue-400 focus:outline-2 focus:outline-blue-50"
                    id="password"
                    type="text"
                    placeholder="password"
                  />
                </label>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              {/* Username */}
              <div className="mb-3">
                <label htmlFor="username">
                  <span className="text-sm inline-block mb-1 text-gray-500">
                    Username
                  </span>
                  <input
                    {...register("username")}
                    className="border w-full h-10 indent-3 border-gray-200 rounded-md focus:border-blue-400 focus:outline-2 focus:outline-blue-50"
                    id="username"
                    type="text"
                    placeholder="username"
                  />
                </label>
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Phone number */}
              <div className="mb-3">
                <label htmlFor="phone_number">
                  <span className="text-sm inline-block mb-1 text-gray-500">
                    Phone Number
                  </span>
                  <input
                    {...register("phone_number")}
                    className="border w-full h-10 indent-3 border-gray-200 rounded-md focus:border-blue-400 focus:outline-2 focus:outline-blue-50"
                    id="phone_number"
                    type="text"
                    placeholder="phone number"
                  />
                </label>
                {errors.phone_number && (
                  <p className="text-red-500 text-sm">
                    {errors.phone_number.message}
                  </p>
                )}
              </div>

              {/* Confirm password */}
              <div className="mb-3">
                <label htmlFor="confirm_password">
                  <span className="text-sm inline-block mb-1 text-gray-500">
                    Confirm Password
                  </span>
                  <input
                    {...register("confirm_password")}
                    className="border w-full h-10 indent-3 border-gray-200 rounded-md focus:border-blue-400 focus:outline-2 focus:outline-blue-50"
                    id="confirm_password"
                    type="text"
                    placeholder="confirm password"
                  />
                </label>
                {errors.confirm_password && (
                  <p className="text-red-500 text-sm">
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <h2 className="text-md font-bold mt-1 mb-2">Gender</h2>
          <div className="flex gap-20">
            <div>
              <input
                type="radio"
                id="male"
                value="male"
                {...register("gender")}
              />
              <label htmlFor="male"> Male </label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                value="female"
                {...register("gender")}
              />
              <label htmlFor="female"> Female </label>
            </div>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender.message}</p>
          )}

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

export default Form;
