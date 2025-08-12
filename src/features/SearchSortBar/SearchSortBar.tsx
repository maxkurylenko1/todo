import "./searchSortBar.scss";
import { RxCross2 } from "react-icons/rx";
import { useToDoContext } from "../../context/ToDoContext";
import { useDebounce } from "../../hooks/useDebounce";
useDebounce;

export const SearchSortBar = () => {
  const { setSearchQuery, sortOption, setSortOption } = useToDoContext();
  const debounce = useDebounce((value: string) => setSearchQuery(value), 300);

  const sortReset = () => {
    setSortOption("non");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="searchSortBar">
      <input
        type="text"
        className="searchInput"
        placeholder="Search todos..."
        // value={searchQuery}
        onChange={handleSearchChange}
      />
      {sortOption !== "non" && <RxCross2 className="sortReset" size={15} onClick={sortReset} />}
      <select className="sortSelect" value={sortOption} onChange={handleSortChange}>
        <option value="non" hidden defaultChecked>
          Sort By
        </option>
        <option value="dateAsc">Due Date</option>
        <option value="priority">Priority</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};
