import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [search, setSearch] = useState(urlKeyword || "");
  const searchHandler = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setSearch("");
      navigate(`/search/${search}`);
    } else navigate("/");
  };
  return (
    <Form onSubmit={searchHandler} className="d-flex">
      <Form.Control
        type="text"
        className="mr-sm-2 ml-sm-5"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></Form.Control>
      <Button variant="outline-success" type="submit" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
}

export default Search;
