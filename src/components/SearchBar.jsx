import { useState } from "react";

{
  /* SearchBar
  Insert an array to search through and a placeholder text and a handleSelect function */
}
export default function SearchBar(
  { searchArr, placeholderText, handleSelect }
  
) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const handleSearch = (value) => {
    setInput(value);
    if (value === "") {
      setResults([]);
      return;
    }
    const search = value.toLowerCase();
    const searchFilter = searchArr.filter((searchCategory) =>
      searchCategory.name.toLowerCase().includes(search),
    );
    if (searchFilter.length === 0) {
      setResults([{ name: "No results", id: 0 }]);
      return;
    }
    setResults(searchFilter);
  };

  return (
    <>
      <div className="search">
        <input
          type="text"
          value={input}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholderText}
        />
      </div>
      <div className="results">
        {results.map((results) => (
          <div
            className="result"
            key={results.id}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(results.id);
            }}
          >
            {results.icon} {results.name}
          </div>
        ))}
      </div>
    </>
  );
}
