import React, { useState } from "react";

interface ProductDescriptionProps {
  description: string;  
  warranty: string;
  weight: string;
  dimensions: string;
  material: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  description,
  warranty,
  weight,
  dimensions,
  material,
}) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="border border-[color:var(--Button-color,#E8AF52)] shadow-[0px_1px_0px_0px_rgba(255,255,255,0.08)_inset] bg-[rgba(255,255,255,0.02)] z-10 flex  flex-col text-base pt-[10px] pb-[10px] px-20 rounded-lg border-solid ">
      <div className="flex items-stretch gap-6 ml-6 max-md:ml-2.5">
        <button
          className={`${activeTab === "description" ? "text-[rgba(232,175,82,1)]" : "text-white"} font-medium focus:outline-none`}
          onClick={() => setActiveTab("description")}
        >
          <div>Product Description</div>
          {activeTab === "description" && (
            <div className="bg-[rgba(232,175,82,1)] shrink-0 h-0.5 border-[rgba(232,175,82,1)] border-solid border-2" />
          )}
        </button>
        <button
          className={`${activeTab === "additional" ? "text-[rgba(232,175,82,1)]" : "text-white"} font-normal basis-auto focus:outline-none`}
          onClick={() => setActiveTab("additional")}
        >
          Additional information
        </button>
      </div>

      {activeTab === "description" && (
        <div className="text-white font-light self-stretch ml-6 mt-4 max-md:max-w-full">
          {description}
        </div>
      )}

      {activeTab === "additional" && (
        <div className="text-white font-light self-stretch ml-6 mt-4 max-md:max-w-full">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className="py-2 pr-4 font-medium">Dimensions</td>
                <td className="py-2">{dimensions}</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Material</td>
                <td className="py-2">{material}</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Weight</td>
                <td className="py-2">{weight}</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Warranty</td>
                <td className="py-2">{warranty}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      
    </div>
  );
};

export default ProductDescription;
