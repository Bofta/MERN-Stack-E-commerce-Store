import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
    useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../../redux/api/usersApiSlice.js";







const UserList = () => {
    
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();


  const [deleteUser] = useDeleteUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState('');
  const [editableUserEmail, setEditableUserEmail] = useState('');

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);


  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
        <div className="flex flex-col md:flex-row">
          {/* <AdminMenu /> */}
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead> 
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2"> </td>
                </tr>
              ))}
            </tbody>
         </table>
        </div>
  </div>    
  );
};

export default UserList;