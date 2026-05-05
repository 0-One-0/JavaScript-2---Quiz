import { useState } from "react";
import "../css/searchBar.css";

export default function SearchBar({
  searchArr,
  placeholderText,
  handleSelect,
  displayKey = "name",
  iconKey = "icon",
  searchKeys = ["name"],
}) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const handleSearch = (value) => {
    setInput(value);
    if (value === "") {
      setResults([]);
      return;
    }
    const search = value.toLowerCase();
    const searchFilter = searchArr?.filter((item) =>
      searchKeys.some((key) =>
        item[key]?.toString().toLowerCase().includes(search),
      ),
    );
    if (searchFilter?.length === 0) {
      setResults([{ [displayKey]: "No results", id: 0 }]);
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
          onClick={(e) => {
            e.stopPropagation();
          }}
          placeholder={placeholderText}
        />
      </div>
      <div className="results">
        {results?.map((item, index) => {
          const iconValue = item[iconKey];
          return (
            <div
              className="result"
              key={item.id || `${item[displayKey]}-${index}`}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(item.id);
              }}
            >
              {iconValue &&
                (typeof iconValue === "string" && iconValue.startsWith("http") ?
                  <img src={iconValue} alt="icon" className="result-icon" />
                : iconValue)}
              {iconValue ? " " : ""}
              {item[displayKey] || "Unknown"}
            </div>
          );
        })}
      </div>
    </>
  );
}
