import { useState } from "react";
import { Button, FormControl, Container, Input } from "@chakra-ui/react";

function SearchBar({ updateQuery }) {
  // State for this component
  const [query, setQuery] = useState("");

  // Add automatic searching after 1 second delay (or on enter), setInterval
  const onSearchButtonClicked = (e) => {
    // Update the state of the app
    updateQuery(query);
  };

  return (
    <div>
      <Container mb={8} mt={4}>
        <Input
          type="text"
          placeholder="Search for movies"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? updateQuery(query) : null)}
        />
      </Container>
      {/* <div className="row">
        <div className="col-4" />
        <div className="col-4">
          <label htmlFor="search">SearchBar</label>
          <input
            className="form-control"
            name="search"
            type="text"
            placeholder="Search for a movie"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-4" />
      </div>
      <button
        className="mt-2 btn btn-primary"
        type="submit"
        onClick={onSearchButtonClicked}
      >
        Search
      </button> */}
    </div>
  );
}

export default SearchBar;
