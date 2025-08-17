import { memo } from "react";
import { useUser } from "../../api/hooks/useUser";
import type { IUser } from "../../types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectUser } from "../../lib/features/update";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { getUser, deleteuser } = useUser();
  const { data } = getUser();
  const user: any = data?.data ?? [];

  const handleDelete = (id: any) => {
    deleteuser.mutate(id);
  };

  const handleUpdate = (item: IUser) => {
    navigate("/form");
    dispatch(selectUser(item))
  };

  return (
    <div className="Home mt-10">
      <table className="w-full max-w-[1000px] mx-auto shadow-[0_22px_70px_4px_rgba(0,0,0,0.20)] rounded-[10px] overflow-hidden border-b-[green]">
        <thead className="bg-[#6D7AE0] text-white ">
          <tr>
            <th className="p-[15px_10px] text-left text-[16px]">№</th>
            <th className="p-[15px_10px] text-left text-[16px]">Full name</th>
            <th className="p-[15px_10px] text-left text-[16px]">Username</th>
            <th className="p-[15px_10px] text-left text-[16px]">Email</th>
            <th className="p-[15px_10px] text-left text-[16px]">
              Phone Number
            </th>
            <th className="p-[15px_10px] text-left text-[16px]">Password</th>
            <th className="p-[15px_10px] text-left text-[16px]">Gender</th>
            <th className="p-[15px_10px] text-left text-[16px]">delete</th>
            <th className="p-[15px_10px] text-left text-[16px]">update</th>
          </tr>
        </thead>
        <tbody className="hover:bg-[#EDECFE]">
          {user.map((item: IUser, index: number) => (
            <tr
              key={item.id}
              className="bg-white text-[#333] text-[15px] hover:bg-[rgba(129,129,128,0.301)]"
            >
              <td className="p-[12px_10px] border-b border-[#ddd]">
                {index + 1}
              </td>
              <td className="p-[12px_10px] border-b border-[#ddd]">
                {item.full_name}
              </td>
              <td className="p-[12px_10px] border-b border-[#ddd]">
                {item.username}
              </td>
              <td className="p-[12px_10px] border-b border-[#ddd]">
                {item.email}
              </td>
              <td className="p-[12px_10px] border-b border-[#ddd]">
                {item.phone_number}
              </td>
              <td className="p-[12px_10px] border-b border-[#ddd]">
                {item.password}
              </td>
              <td className="p-[12px_10px] border-b border-[#ddd]">
                {item.gender}
              </td>
              <td
                onClick={() => handleDelete(item.id)}
                className="p-[12px_10px] border-b border-[#ddd] cursor-pointer"
              >
                delete
              </td>
              <td
                onClick={() => handleUpdate(item)}
                className="p-[12px_10px] border-b border-[#ddd] cursor-pointer"
              >
                update
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(Home);
