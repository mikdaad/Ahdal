import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Filter } from "lucide-react";

// Define prop types
interface SortFilterProps {
  onSortSelect: (sortOption: string) => void;
  onFilterSelect: (filterOption: string) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ onSortSelect, onFilterSelect }) => {
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const handleSortSelect = (sortOption: string) => {
    setSelectedSort(sortOption);
    onSortSelect(sortOption);
  };

  const handleFilterSelect = (filterOption: string) => {
    setSelectedFilter(filterOption);
    onFilterSelect(filterOption);
  };

  return (
    <div className="flex gap-2 ">
    {/* Sort Button with Popover */}
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="font-glancyr font-thin border-gray-300 shadow-yellow-400 shadow-sm">
          <ArrowUpDown className="h-4 w-4  font-thin opacity-90" />
          
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <div className="flex flex-col">
          <Button
            onClick={() => handleSortSelect("asc")}
            className={`p-2 bg-white hover:bg-yellow-400 text-black text-xs font-glancyr ${
              selectedSort === "price-asc" ? "bg-gray-200" : ""
            }`}
          >
            Price: Low to High
          </Button>
          <Button
            onClick={() => handleSortSelect("desc")}
            className={`p-2 bg-white hover:bg-yellow-400 text-black text-xs  font-glancyr ${
              selectedSort === "price-desc" ? "bg-gray-200" : ""
            }`}
          >
            Price: High to Low
          </Button>
        </div>
      </PopoverContent>
    </Popover>

    {/* Filter Button with Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="font-glancyr font-thin border-gray-300 shadow-yellow-400 shadow-sm">
            <div className="h-4 w-4 " >
            <svg width="18" height="18" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.7136 2.95736H5.05413C4.89571 2.95736 4.76782 2.82948 4.76782 2.67106C4.76782 2.51263 4.89571 2.38475 5.05413 2.38475H11.7136C11.872 2.38475 11.9999 2.51263 11.9999 2.67106C11.9999 2.82948 11.872 2.95736 11.7136 2.95736Z" fill="black"/>
<path d="M1.94878 2.95736H0.286305C0.127883 2.95736 0 2.82948 0 2.67106C0 2.51263 0.127883 2.38475 0.286305 2.38475H1.94878C2.10721 2.38475 2.23509 2.51263 2.23509 2.67106C2.23509 2.82948 2.10721 2.95736 1.94878 2.95736Z" fill="black"/>
<path d="M3.50429 4.50915C2.48886 4.50915 1.66431 3.68459 1.66431 2.67107C1.66431 1.65564 2.48886 0.831085 3.50429 0.831085C4.51781 0.831085 5.34237 1.65564 5.34237 2.67107C5.34046 3.68459 4.51781 4.50915 3.50429 4.50915ZM3.50429 1.4037C2.80571 1.4037 2.23692 1.97249 2.23692 2.67107C2.23692 3.36966 2.80571 3.93654 3.50429 3.93654C4.20288 3.93654 4.76976 3.36966 4.76976 2.67107C4.76785 1.97249 4.20097 1.4037 3.50429 1.4037Z" fill="black"/>
<path d="M11.7137 7.28629H9.25335C9.09492 7.28629 8.96704 7.15841 8.96704 6.99999C8.96704 6.84157 9.09492 6.71368 9.25335 6.71368H11.7137C11.8721 6.71368 12 6.84157 12 6.99999C12 7.15841 11.8721 7.28629 11.7137 7.28629Z" fill="black"/>
<path d="M6.14793 7.28629H0.286305C0.127883 7.28629 0 7.15841 0 6.99999C0 6.84157 0.127883 6.71368 0.286305 6.71368H6.14793C6.30635 6.71368 6.43423 6.84157 6.43423 6.99999C6.43423 7.15841 6.30635 7.28629 6.14793 7.28629Z" fill="black"/>
<path d="M7.70351 8.83807C6.68808 8.83807 5.86353 8.01351 5.86353 6.99999C5.86353 5.98456 6.68808 5.16 7.70351 5.16C8.71703 5.16 9.54159 5.98456 9.54159 6.99999C9.53968 8.01351 8.71512 8.83807 7.70351 8.83807ZM7.70351 5.73261C7.00493 5.73261 6.43614 6.30141 6.43614 6.99999C6.43614 7.69858 7.00493 8.26546 7.70351 8.26546C8.4021 8.26546 8.96898 7.69858 8.96898 6.99999C8.96707 6.30141 8.40019 5.73261 7.70351 5.73261Z" fill="black"/>
<path d="M11.7138 11.6152H5.8178C5.65938 11.6152 5.53149 11.4874 5.53149 11.3289C5.53149 11.1705 5.65938 11.0426 5.8178 11.0426H11.7138C11.8722 11.0426 12.0001 11.1705 12.0001 11.3289C12.0001 11.4874 11.8722 11.6152 11.7138 11.6152Z" fill="black"/>
<path d="M2.71226 11.6152H0.286305C0.127883 11.6152 0 11.4874 0 11.3289C0 11.1705 0.127883 11.0426 0.286305 11.0426H2.71226C2.87069 11.0426 2.99857 11.1705 2.99857 11.3289C2.99857 11.4874 2.87069 11.6152 2.71226 11.6152Z" fill="black"/>
<path d="M4.26797 13.1689C3.25254 13.1689 2.42798 12.3425 2.42798 11.3289C2.42798 10.3154 3.25254 9.49086 4.26797 9.49086C5.28149 9.49086 6.10605 10.3154 6.10605 11.3289C6.10414 12.3444 5.28149 13.1689 4.26797 13.1689ZM4.26797 10.0635C3.56938 10.0635 3.00059 10.6304 3.00059 11.3289C3.00059 12.0275 3.56938 12.5963 4.26797 12.5963C4.96655 12.5963 5.53343 12.0275 5.53343 11.3289C5.53153 10.6304 4.96464 10.0635 4.26797 10.0635Z" fill="black"/>
</svg>
 </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40">
          <div className="flex flex-col font-glancyr">
          {["Men", "Women", "Kids", "Unisex"].map((filterOption) => (
  <Button
    key={filterOption}
    onClick={() => handleFilterSelect(filterOption)} // Removed .toLowerCase()
    className={`p-2 bg-white hover:bg-yellow-400 text-black text-xs ${
      selectedFilter === filterOption ? "bg-gray-200" : ""
    }`}
  >
    {filterOption}
  </Button>
))}
        </div>
        </PopoverContent>
      </Popover>
    </div>

  );
};

export default SortFilter;
