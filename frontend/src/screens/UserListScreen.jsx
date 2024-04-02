import React from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button, Table } from "react-bootstrap";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../slices/usersApiSlice";
import { toast } from "react-toastify";

function UserListScreen() {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const deleteHandler = async (id) => {
    if (window.confirm("delete User")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      }
    }
  };
  return (
    <div>
      <h1>Users</h1>
      {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>IsAdmin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }}></FaCheck>
                  ) : (
                    <FaTimes style={{ color: "red" }}></FaTimes>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button className="btn-sm" variant="light">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                </td>
                <td>
                  <Button
                    className="btn-sm"
                    variant="light"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default UserListScreen;
