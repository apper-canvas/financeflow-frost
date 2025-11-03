import { useState } from "react";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SearchBar = ({ placeholder = "Search...", onSearch, className }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <ApperIcon 
        name="Search" 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
      />
      <Input
        value={query}
        onChange={handleSearch}
        placeholder={placeholder}
        className="pl-10"
      />
    </div>
  );
};

export default SearchBar;