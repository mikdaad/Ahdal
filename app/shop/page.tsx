'use client';
import React, { useState, useEffect } from 'react';
import { FilterCard } from '@/app/components/newcomponents/filtercard';
import HeaderNavigation from "@/app/components/newcomponents/homeheader";
import ProductList from '../components/storefront/Productlist2';
import Footer from "@/app/components/newcomponents/footer";
import { useSearchParams, useRouter } from 'next/navigation';
import { FiFilter, FiX } from 'react-icons/fi'; 


export default function Shop() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // --- State for Mobile Filter Sidebar ---
    const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
    // --- End State ---

    const category1= searchParams.get("category1") || "none";
    const category2= searchParams.get("category2") || "none";
    const category3= searchParams.get("category3") || "none";
    const category4= searchParams.get("category4") || "none";
    const categoryParam = searchParams.get("category") || "";
    const ispremium = searchParams.get("ispremium") || "";
    const minPriceParam = searchParams.get("minPrice") || "999";
    const maxPriceParam = searchParams.get("maxPrice") || "99999";

    // Keep existing priceRange state logic
    const [priceRange, setPriceRange] = useState({ min: parseInt(minPriceParam), max: parseInt(maxPriceParam) });

    // Keep existing filters state logic
    const [filters, setFilters] = useState({
        price: { min: parseInt(minPriceParam), max: parseInt(maxPriceParam) }, // Initialize with params
        category: categoryParam,
        category1: category1,
        category2: category2,
        category3: category3,
        category4: category4,
    });

    // Effect to scroll top on load (no change)
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Effect to update URL when filters change (no change to core logic)
    useEffect(() => {
        const hasPriceChanged = 
            priceRange.min !== filters.price.min || 
            priceRange.max !== filters.price.max;
    
        if (hasPriceChanged) {
            setPriceRange(filters.price);
        }
    
        const params = new URLSearchParams(window.location.search);
        params.set("minPrice", filters.price.min.toString());
        params.set("maxPrice", filters.price.max.toString());
        params.set("category", filters.category);
        params.set("category1", filters.category1);
        params.set("category2", filters.category2);
        params.set("category3", filters.category3);
        params.set("category4", filters.category4);
        params.set("ispremium", ispremium);
    
        const newUrl = `${window.location.pathname}?${params.toString()}`;
    
        if (window.location.search !== `?${params.toString()}`) {
            window.history.replaceState({}, '', newUrl);
        }

        if (isFilterSidebarOpen) {
            // Find the element that triggered the filter change (e.g., Apply button in FilterCard)
            // If that element exists, blur it to remove focus state after sidebar closes.
             if (document.activeElement instanceof HTMLElement) {
                 document.activeElement.blur();
             }
             // Note: Closing sidebar here assumes setFilters is ONLY called on 'Apply'
             // If setFilters is called elsewhere, this might close the sidebar unexpectedly.
             //setIsFilterSidebarOpen(false); // --> Moved filter application logic below to handle this better
        }
    
    }, [filters, ispremium]);
    


    // Effect to update internal state when URL params change (e.g., browser back/forward)
    useEffect(() => {
        const newMin = parseInt(searchParams.get("minPrice") || "999");
        const newMax = parseInt(searchParams.get("maxPrice") || "99999");
        const newcategory = searchParams.get("category") || "Doors";
        const newcategory1 = searchParams.get("category1") || "none";
        const newcategory2 = searchParams.get("category2") || "none";
        const newcategory3 = searchParams.get("category3") || "none";
        const newcategory4 = searchParams.get("category4") || "none";

        const newFilters = { 
            price: { min: newMin, max: newMax }, 
            category: newcategory, 
            category1: newcategory1, 
            category2: newcategory2, 
            category3: newcategory3, 
            category4: newcategory4 
        };
        
        // Simple comparison (might need deep compare for nested objects like price)
        // Note: This basic check won't prevent re-renders if the objects are different instances
        // but contain the same values. A deep compare library might be needed for robustness.
        if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
            console.log("Shop: URL values differ from state. Updating state.");
            setPriceRange({ min: newMin, max: newMax }); // Update priceRange too if needed
            setFilters(newFilters); 
        } else {
           console.log("Shop: URL values match current state. Skipping state update.");
        }

    }, [searchParams]); // Re-run when searchParams object changes


    // --- Function to handle filter application AND sidebar closing ---
    const applyFiltersAndCloseSidebar = (newFilters: typeof filters) => {
        setFilters(newFilters); // Update the filters state (triggers the useEffect above)
        setIsFilterSidebarOpen(false); // Close the sidebar
    };


    return (
        <>
            {/* --- Header (No Change) --- */}
            <header className="w-full shadow-md bg-transparent mb-0">
        <HeaderNavigation />
      </header>

            {/* --- Filter Trigger Button (Mobile Only) --- */}
            <div className="lg:hidden px-4 pt-4 flex justify-end sticky top-[calc(var(--header-height,60px)+1rem)] z-10"> {/* Adjust top based on actual header height */}
                 <button
                    onClick={() => setIsFilterSidebarOpen(true)}
                    className="p-2 bg-gray-800 text-white rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    aria-label="Open filters"
                    aria-controls="filter-sidebar"
                    aria-expanded={isFilterSidebarOpen}
                 >
                     <FiFilter size={20} />
                 </button>
            </div>

            {/* --- Main Content Area --- */}
            <main className="flex flex-col lg:flex-row gap-x-8 mt-4 min-h-screen px-4 lg:px-8 relative"> {/* Added relative positioning context */}

                {/* --- Overlay (Mobile Only) --- */}
                {isFilterSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                        onClick={() => setIsFilterSidebarOpen(false)}
                        aria-hidden="true"
                    />
                )}

                {/* --- Filter Container (Conditionally Styled) --- */}
                {/*
                    Mobile: Fixed position, slides in/out, covers part of screen, has background
                    Desktop: Static position, specific width, normal flow
                */}
                <div
                    id="filter-sidebar" // For aria-controls
                    className={`
                        /* --- Mobile Styles (Default) --- */
                        fixed inset-y-0 left-0 z-40
                        w-72 sm:w-80 /* Mobile Width */
                        h-screen /* Full height */
                        bg-black /* Dark background for the sidebar itself */
                        shadow-xl
                        transform transition-transform duration-300 ease-in-out
                        ${isFilterSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                        overflow-y-auto /* Allow scrolling within sidebar */

                        /* --- Desktop Styles (lg:) --- */
                        lg:static lg:translate-x-0 /* Reset positioning */
                        lg:w-[305px] /* Original requested width area - adjust if needed */
                        lg:h-auto /* Auto height */
                        lg:bg-transparent /* No background needed */
                        lg:shadow-none /* No shadow */
                        lg:overflow-y-visible /* Reset overflow */
                        lg:ml-4 /* Desktop margin */
                        lg:z-auto /* Reset z-index */
                        lg:block /* Ensure it's visible */
                        flex-shrink-0 /* Prevent shrinking on desktop */
                    `}
                     aria-label="Filter options"
                 >
                    {/* --- Close Button (Mobile Only, inside sidebar) --- */}
                     <button
                        onClick={() => setIsFilterSidebarOpen(false)}
                        className="absolute top-2 right-2 p-1 text-white lg:hidden hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label="Close filters"
                     >
                         <FiX size={24} />
                     </button>

                     {/* --- FilterCard Component --- */}
                     {/* Pass the new handler to FilterCard IF you modify FilterCard to accept it */}
                     {/* Otherwise, FilterCard's apply button will just call setFilters, and the sidebar won't auto-close */}
                     <div className='sticky mt-4 inset-0'>
                        <FilterCard
                         // Use the original setFilters prop if you CANNOT change FilterCard:
                         setFilters={setFilters}
                         // OR use the new handler IF you CAN change FilterCard slightly:
                         // setFilters={applyFiltersAndCloseSidebar}
                         initialCategory={filters.category} // Pass current filter state
                        initialCategoryone={filters.category1} // Pass current filter state
                        initialCategorytwo={filters.category2} // Pass current filter state
                        initialCategorythree={filters.category3} // Pass current filter state
                        initialCategoryfour={filters.category4} // Pass current filter state
                         priceRange={priceRange} // Pass current price range state
                     />
                     </div>
                 </div>

                {/* --- Product List Section (Adjust margin potentially) --- */}
                {/* Added margin-top for mobile when filter button is present */}
                <section className="flex-1 mt-8 lg:mt-10 space-y-12">
                    <ProductList
                        category1={filters.category1 } // Use filters state
                        category2={filters.category2 }
                        category3={filters.category3 }
                        category4={filters.category4 }
                        category={categoryParam}
                        ispremium={ispremium}
                        priceRange={filters.price} // Use filters state
                    />
                </section>
            </main>

            {/* --- Footer (No Change) --- */}
            <Footer />
        </>
    );
}