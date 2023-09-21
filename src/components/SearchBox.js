import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const SearchBox = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Form>
      <FormControl
        type="text"
        placeholder="Search"
        className="mr-sm-2"
        value={searchText}
        onChange={handleSearchChange}
      />
    </Form>
  );
};

export default SearchBox;
