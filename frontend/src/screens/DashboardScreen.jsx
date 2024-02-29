import React from "react";
import { useGetUsersQuery } from "../slices/usersApiSlice";
import { Container } from "react-bootstrap";

function DashboardScreen() {
  const { data: users, isLoading, error } = useGetUsersQuery();
  console.log(users);

  return <Container></Container>;
}

export default DashboardScreen;
