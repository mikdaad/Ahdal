'use client'
import React, { useState } from "react";
import ProductDescription from "./productcarddescription";
import ProductDetails from "./productdetails";
import ProductGallery from "./productgallery";
import { Breadcrumb } from "../ui/breadcrumb";
import Footer from "./footer";
import ProductList from "../storefront/Productlist2";
import HeaderNavigation from "./homeheader";

export default function NewProductPage ({ data }: { data: any })  {


  const {
    id,
    name,
    originalprice,
    discountprice,
    stars,
    colors,
    isstock,
    longdescription,
    description,
    images,
    warranty,
    weight,
    dimensions,
    material,
  } = data;

   
  
    // Breadcrumb data
    const breadcrumbItems = [
      { label: "Home", path: "/" },
      { label: "Primium Sofa" },
    ];
  
  
    return (
      <div><HeaderNavigation/>
      <div className="border overflow-hidden pt-[60px] border-[rgba(255,255,255,0.1)] border-solid bg-black m-6">
       
  
      <div className="flex w-[190px] max-w-full items-center gap-[5px] text-white font-normal mt-[0px] max-md:mt-0">
  {/*<div className="flex w-full items-center gap-[5px] text-white font-normal">
    <Breadcrumb>
      <ul className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="breadcrumb-separator">&gt;</span>}
            {item.path ? (
              <li>
                <a href={item.path} className="breadcrumb-link">
                  {item.label}
                </a>
              </li>
            ) : (
              <li>
                <span className="breadcrumb-page">{item.label}</span>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </Breadcrumb>
  </div> */}

</div>

          <main className="w-full max-w-[1183px] mt-[37px] max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
              <div className="w-[65%] max-md:w-full max-md:ml-0">
                <ProductGallery
                  mainImage={images[0]}
                  thumbnails={images.slice(1)}
                />
              </div>
              <div className="w-[35%]  max-md:w-full max-md:ml-0">
                <ProductDetails
                id={data.id}
                  title={name}
                  rating={stars}
                  reviewCount={150}
                  inStock={isstock}
                  price={discountprice}
                  originalPrice={originalprice}
                  description={description}
                  colors={colors}
                />
              </div>
             
            </div>

              {/* Description Section */}
        <div className="w-[82%] max-md:w-full my-5">
          <ProductDescription
            description={longdescription}
            warranty={warranty}
            weight={weight}
            dimensions={dimensions}
            material={material}
          />
        </div>


            <h2 className="text-white text-2xl font-semibold mt-16 max-md:mt-10">
        Similar Products
      </h2>
            <ProductList/>
            <Footer />
          </main>
        
  
        <section className="z-10 mt-[-153px] w-full max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
            
            <div className="w-[18%] ml-5 max-md:w-full max-md:ml-0">
             {/*} <div className="border border-[color:var(--Button-color,#E8AF52)] shadow-[0px_1px_0px_0px_rgba(255,255,255,0.08)_inset] bg-[rgba(255,255,255,0.02)] flex w-full flex-col overflow-hidden items-stretch mt-[452px] mx-auto pt-[11px] pb-[25px] px-2 rounded-2xl border-solid max-md:mt-10">
                <ProductCard
                  images={"https://cdn.builder.io/api/v1/image/assets/9e14ec760a13409cba0be5c570ba1763/a743745de574bdcd2d9afc39d0bed77c7c069ca0?placeholderIfAbsent=true"}
                  title="Primium Sofa"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do."
                  price="₹1999"
                  originalPrice="₹1999"
                />
              </div>
              */}
            </div>
          </div>
        </section>
  
        {/*<section className="border border-[color:var(--Button-color,#E8AF52)] shadow-[0px_1px_0px_0px_rgba(255,255,255,0.08)_inset] bg-[rgba(255,255,255,0.02)] z-10 flex w-full flex-col pl-8 pr-20 pb-[199px] rounded-2xl border-solid max-md:max-w-full max-md:pb-[100px] max-md:px-5">
          
     
        </section>
        */}
  
       
      </div>
      </div>
    );
  };