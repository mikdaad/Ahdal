'use client';
import React, { useState ,useEffect } from "react";
import { FilterCategory } from "./filtercategory";
import { CustomButton } from "./custombutton";
import SliderComponent from "./moneyslider";

interface FilterCardProps {
  setFilters: React.Dispatch<React.SetStateAction<{
    price: { min: number; max: number };
    category: string;
    category1: string;
    category2: string;
    category3: string;
    category4: string;
  }>>;
  initialCategory: string; 
  initialCategoryone?: string;
  initialCategorytwo?: string;
  initialCategorythree?: string;
  initialCategoryfour?: string;
  priceRange?: { min: number; max: number };
}

export const FilterCard: React.FC<FilterCardProps> = ({ setFilters , initialCategory ,initialCategoryone,initialCategorytwo,initialCategorythree,initialCategoryfour, priceRange }) => {
  const [childData, setChildData] = useState<number>(priceRange?.max ?? 999);
  const [selectedCategory, setSelectedCategory] =  useState<string>(initialCategory);
  const [selectedCategoryone, setSelectedCategoryone] =  useState<string>(initialCategoryone ?? "none");
  const [selectedCategorytwo, setSelectedCategorytwo] =  useState<string>(initialCategorytwo ?? "none");
  const [selectedCategorythree, setSelectedCategorythree] =  useState<string>(initialCategorythree ?? "none");
  const [selectedCategoryfour, setSelectedCategoryfour] =  useState<string>(initialCategoryfour ?? "none");

  const handleChildData = (dataFromChild: number) => {
    setChildData(dataFromChild);
  };

  const handleToggleCategory = (category: string) => {
    if (category === "All") {
      setSelectedCategory("none"); // Reset to "none" if "All" is selected
    }
    setSelectedCategory(category);
  };
  const handleToggleCategoryone = (category: string) => {
    if (category === "All") {
      setSelectedCategoryone("none"); // Reset to "none" if "All" is selected
    }
    setSelectedCategoryone(category);
  };
  const handleToggleCategorytwo = (category: string) => {
    if (category === "All") {
      setSelectedCategorytwo("none"); // Reset to "none" if "All" is selected
    }
    setSelectedCategorytwo(category);
  };
  const handleToggleCategorythree = (category: string) => {
    if (category === "All") {
      setSelectedCategorythree("none"); // Reset to "none" if "All" is selected
    }
    setSelectedCategorythree(category);
  };
  const handleToggleCategoryfour = (category: string) => {
    if (category === "All") {
      setSelectedCategoryfour("none"); // Reset to "none" if "All" is selected
    }
    setSelectedCategoryfour(category);
  };

  useEffect ( () => {
        setFilters({
          price: { min: priceRange?.min ?? 999, max: childData },
          category: selectedCategory,
    category1: selectedCategoryone,
    category2: selectedCategorytwo,
    category3: selectedCategorythree,
    category4: selectedCategoryfour,
        });
      }, [ selectedCategory,selectedCategoryone,selectedCategorytwo,selectedCategorythree,selectedCategoryfour, setFilters]); // Add setFilters to the dependency array

 

  // In filtercard.tsx
    const handleApply = () => {
        setFilters({
          price: { min: priceRange?.min ?? 999, max: childData },
          category: selectedCategory,
    category1: selectedCategoryone,
    category2: selectedCategorytwo,
    category3: selectedCategorythree,
    category4: selectedCategoryfour,
        });
      };

  return (
    <div className="bg-gradient-to-r from-[#5de9f9] via-blue-500 to-[#0808d7] hover:bg-gradient-to-l inset-3 p-[2px] text-white duration-300 hover:shadow-2xl hover:shadow-purple-600/30 rounded-xl m-0 max-w-[305px] text-base font-light font-['Blauer_Nue']">
      <div className="shadow-[0px_1px_0px_0px_rgba(255,255,255,0.08)_inset] inset-1 bg-black w-full overflow-hidden pt-[50px] pb-[29px] px-4 rounded-lg border-solid" aria-label="Price filter card">
        <div className="absolute w-[512px] h-[512px] left-[-6px] top-[128px] opacity-15 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,_#F9BF00_0%,_rgba(252,_232,_3,_0)_100%)] blur-3xl -z-10"></div>

        <div className="flex items-stretch gap-5 justify-between">
          <div className="flex flex-col items-stretch">
            <h2 className="text-xl font-semibold m-2">Filter by Price</h2>
            <SliderComponent valb={childData} onDataUpdate={handleChildData} minm={999} />
          </div>
        </div>

        <div className="whitespace-nowrap my-4">
          <CustomButton onClick={handleApply}>Apply</CustomButton>
        </div>

        <FilterCategory
          name="Doors or Windows"
          subcategories={["Doors", "Windows","All"]}
          onToggle={handleToggleCategory}
          selectedCategory={selectedCategory}
        />
        { selectedCategory=="Doors" && <>
         <FilterCategory
          name="Door Type"
          subcategories={["singledoor", "doubledoor", "fourfolding", "motherandson","All"]}
          onToggle={handleToggleCategoryone}
          selectedCategory={selectedCategoryone}
        />
 <FilterCategory
          name="Handle Type"
          subcategories={["normalhandle", "fridgehandle", "barhandle","All"]}
          onToggle={handleToggleCategorytwo}
          selectedCategory={selectedCategorytwo}
        />
   <FilterCategory
          name="Lock Type"
          subcategories={["singlelock", "multilock", "smartlock","All"]}
          onToggle={handleToggleCategorythree}
          selectedCategory={selectedCategorythree}
        />
        </>
       }

  { selectedCategory=="Windows" &&       <FilterCategory
          name="Window Type"
          subcategories={["GI", "SS304","All"]}
          onToggle={handleToggleCategoryfour}
          selectedCategory={selectedCategoryfour}
        /> }
      </div>
    </div>
  );
};
