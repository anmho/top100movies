import { useState } from "react";

function SearchBar(props) {
  // State for this component
  const [query, setQuery] = useState("");

  const onSearchButtonClicked = () => {
    // Update the state of the app
    props.updateQuery(query);
  };

  return (
    <div>
      <div className="row">
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
      </button>
    </div>
  );
}

export default SearchBar;
