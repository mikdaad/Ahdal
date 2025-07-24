import React from 'react';
import './App.css'; // Make sure this CSS file exists or remove if not needed
import { Banner } from '../components/buildercomponents/home/Banner';
import { Inter } from 'next/font/google'; // Ensure Next.js setup if using next/font
import StatsCard from '../components/newcomponents/statscard';
import HeaderNavigation from "../components/newcomponents/homeheader";
import { Vectorbanner } from '../components/buildercomponents/home/vectorbanner';
import Footer from '../components/newcomponents/footer';
import HeroSection from '../components/newcomponents/Herosection';
import styles from './homestyles.module.css'; // Ensure this CSS module file exists and paths are correct
import Link from 'next/link';
import SocialIconsBar from '../components/newcomponents/socialicons';
import { InfiniteSlider } from '../components/ui/infiniteslider';

// Optional: Initialize font if using Next.js Font Optimization
// const inter = Inter({ subsets: ["latin"] });
// If not using Next.js, you'd typically load fonts via CSS imports or <link> tags.

function App() {

  return (
    // Using React Fragment <>...</> is fine here
    <>
      {/* Removed the outer redundant relative flex flex-col div */}

      <div
  className="relative z-0 bg-no-repeat bg-center  sm:bg-[length:100%_100%] bg-[length:auto_100%] min-h-screen"
  style={{
    backgroundImage:
      'linear-gradient(rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.78)), url("/background.jpg")',
  }}
> {/* Changed z-10 to z-0, header will be above */}

        

        {/* NEW: Clipping Container for Ellipses and Content */}
        <div className='relative overflow-hidden'> {/* Key additions: relative and overflow-hidden */}

          {/* Sticky Header */}
        <header className="sticky top-0 w-full h-16 bg-transparent shadow-md my-4 z-20"> {/* z-20 to be above everything */}
          <HeaderNavigation />
        </header>

          {/* Background Ellipses - Placed first, low z-index */}
          {/* These are now direct children of the clipping container */}
          <div className={`${styles.Ellipse_2_176_209} absolute hidden lg:block z-0 right-3/4 bottom-[5%] overflow-hidden pointer-events-none`}></div> {/* Adjusted position slightly, added pointer-events-none */}
          <div className={`${styles.Ellipse_2_176_210} absolute  hidden lg:block z-0 bottom-1/4 left-3/4 overflow-hidden pointer-events-none`}></div> {/* Adjusted position slightly, added pointer-events-none */}
          {/* NOTE: Adjusted ellipse positions (top-0, bottom-1/4) as examples, fine-tune based on desired visual placement relative to the clipping container */}

          <div className={`${styles.Ellipse_2_176_209} absolute block lg:hidden z-0 left-0 bottom-[1%] overflow-hidden pointer-events-none`}></div> {/* Adjusted position slightly, added pointer-events-none */}

         <div className={`${styles.Ellipse_2_176_210} absolute z-0  block lg:hidden bottom-0 left-3/4 overflow-hidden pointer-events-none`}></div>  

          {/* Content Row 1: Main Text and SVG */}
          {/* Added relative and z-10 to ensure this content is above the z-0 ellipses */}
          <div className="flex flex-col-reverse md:flex-row justify-between relative z-10 px-4 md:px-24">


            {/* Left Side: Text Content */}
            <div className='flex flex-col ml-4 lg:ml-24 mt-8 mb-8'> {/* Added mb-8 for spacing */}
           
           
           <div className='flex flex-row '>
            <div className='flex flex-col'> <Link href="/dashboard"><span className="
  inline-block  w-[200px] lg:w-[640px]  mt-[30px]  lg:mt-[85px] font-['Serena'] text-[25px]  lg:text-[44px]  not-italic  font-normal leading-[121.6%] bg-gradient-to-t  from-white
  to-[#0DE3F6]
  bg-clip-text     text-transparent  whitespace-normal overflow-visible      break-words           ">
  Modern Living Starts with the Right Elements
</span></Link>
              <p className="hidden lg:block text-[rgba(255,255,255,0.70)] font-[Inter] text-[16px] md:text-[20px] font-thin leading-[150.07%] whitespace-pre-line max-w-full md:max-w-[40%] mt-4">

              Explore the craftsmanship of luxury doors and windows, designed to bring sophistication and warmth to your living space.
              </p>

              <p className="block lg:hidden text-[rgba(255,255,255,0.70)] font-[Inter] text-[16px] md:text-[20px] font-thin leading-[150.07%] whitespace-pre-line w-[200px] lg:max-w-full md:max-w-[40%] mt-4">

              Explore the craftsmanship of luxury doors and windows, designed to bring sophistication and warmth to your living space.
</p>
<div className="
  inline-flex           items-center    w-44    lg:w-72   justify-center        gap-2.5            py-2   lg:py-4           px-4       lg:px-8                mt-4 lg:mt-5                  lg:max-h-max             rounded-xl            bg-[#2ad4f3]        ">
 
 <Link href="/shop"> <span className=" inline-block      text-black        text-center       font-blauer-nue     text-xl  lg:text-2xl          font-normal       leading-normal    ">
  View Products
</span></Link>
  </div>
</div> 
<SocialIconsBar
         iconClassName="absolute  top-12 lg:top-20 right-4  lg:right-28 w-[85px] h-[233px] mt-8 lg:mt-10 lg:ml-28 lg:mt-0 lg:w-[105px] lg:h-[333px]"
      /> </div>
<div className='block lg:hidden mr-5 mt-3 '><StatsCard /></div>\


            </div>







         




          </div>

          {/* Content Row 2: View Products Button and Stats Card */}
          {/* Added relative and z-10 to ensure this content is also above the z-0 ellipses */}
          <div className='flex flex-row justify-between items-center relative z-10 px-24 pb-0 lg:pb-40'> {/* Added padding, items-center */}

            {/* Left Side: View Products Button */}
            

            

            {/* Right Side: Stats Card Component */}
            <div className='absolute bottom-8 left-2/4 hidden lg:block'><StatsCard /></div>

          </div>

        </div> {/* End of Clipping Container */}
      </div> {/* End of Section 1 */}


      {/* Section 2: Banners, Image Rows, Hero Section, Footer */}
      {/* This content is outside the clipping container and will not have the ellipses behind it */}
      <div>
        <Banner />
        <InfiniteSlider gap={24} >  <Vectorbanner /> </InfiniteSlider>

   

    {/* --- Row 1 (Desktop: Image Left / Text Right | Mobile: Image / Text) --- */}
<div className='
  flex flex-col items-center      /* Mobile: Vertical stack, centered */
  gap-6 my-6 px-4                /* Mobile: Spacing */
  lg:flex-row lg:justify-around  /* Desktop: Horizontal row, spaced out */
  lg:items-center lg:gap-0 lg:my-10 /* Desktop: Alignment & spacing */
'>

  {/* Image Block - Appears FIRST in source for Mobile layout */}
  <div className="
    relative w-full max-w-md      /* Mobile: Full width up to medium */
    min-h-[250px] rounded-[12px] overflow-hidden
    lg:w-auto lg:max-w-[589px]    /* Desktop: Auto width up to specific max */
    lg:min-h-[365px] lg:flex-shrink-0 /* Desktop: Height & prevent shrinking */
    /* No lg:order needed here, it stays first on desktop */
    lg:mr-8                       /* Desktop: Add margin to the right of the image */
  ">
    {/* Gradient border structure */}
    <div className="bg-gradient-to-r from-[#5de9f9] via-blue-500 to-[#0808d7] hover:bg-gradient-to-l rounded-[12px] p-[2px] text-white duration-300 hover:shadow-2xl hover:shadow-purple-600/30">
      <div className='bg-black p-1 rounded-[10px]'>
        <img
          src="/banner/b5.jpg" /* Image for the first row */
          alt="Heritage Image 1"
          className="w-full h-full object-cover rounded-[9px] min-h-[240px] lg:min-h-[355px]"
        />
      </div>
    </div>
  </div>

  {/* Text Block - Appears SECOND in source for Mobile layout */}
  <div className='
    flex flex-col w-full max-w-md    /* Mobile: Full width up to medium, centered content */
    items-center text-center
    lg:max-w-[45%] lg:items-start   /* Desktop: Takes 45% width, align items left */
    lg:text-left                   /* Desktop: Align text left */
    /* No lg:order needed here, it stays second on desktop */
  '>
    {/* Title Span */}
    <span className="
      block break-words
      font-blauer-nue
      text-2xl leading-tight         /* Mobile text size */
      lg:text-4xl lg:leading-[44px]  /* Desktop text size */
      not-italic font-medium
      text-transparent bg-clip-text  /* Gradient text effect */
      bg-gradient-to-t from-white to-[#0DE3F6]
      w-full mb-2
    ">
      Discover Timeless Elegance in Every Detail{/* Example different title */}
    </span>

    {/* Body Text Span */}
    <span className="
      block break-words
      font-blauer-nue
      text-sm leading-6              /* Mobile text size */
      lg:text-base lg:leading-6      /* Desktop text size */
      font-normal
      text-transparent bg-clip-text  /* Gradient text effect */
      bg-gradient-to-r from-[#0DE3F6] to-[#ffffffe0]
      w-full
    ">
        Immerse yourself in the perfect blend of heritage and innovation. Elevate your living space with a touch of luxury, and let every corner of your home reflect a timeless tale of elegance.
    </span>
  </div>
</div>

{/* --- Row 2 (Desktop: Text Left / Image Right | Mobile: Image / Text) --- */}
<div className='
  flex flex-col items-center      /* Mobile: Vertical stack, centered */
  gap-6 my-6 px-4                /* Mobile: Spacing */
  lg:flex-row lg:justify-around  /* Desktop: Horizontal row, spaced out */
  lg:items-center lg:gap-0 lg:my-10 /* Desktop: Alignment & spacing */
'>

  {/* Image Block - Appears FIRST in source for Mobile layout */}
  <div className="
    relative w-full max-w-md      /* Mobile: Full width up to medium */
    min-h-[250px] rounded-[12px] overflow-hidden
    lg:w-auto lg:max-w-[589px]    /* Desktop: Auto width up to specific max */
    lg:min-h-[365px] lg:flex-shrink-0 /* Desktop: Height & prevent shrinking */
    lg:order-last                 /* Desktop: Ensure image block appears LAST */
  ">
    {/* Gradient border structure */}
    <div className="bg-gradient-to-r from-[#5de9f9] via-blue-500 to-[#0808d7] hover:bg-gradient-to-l rounded-[12px] p-[2px] text-white duration-300 hover:shadow-2xl hover:shadow-purple-600/30">
      <div className='bg-black p-1 rounded-[10px]'>
        <img
          src="/banner/b6.jpg" /* Image for the second row */
          alt="Heritage Image 2"
          className="w-full h-full object-cover rounded-[9px] min-h-[240px] lg:min-h-[355px]"
        />
      </div>
    </div>
  </div>

  {/* Text Block - Appears SECOND in source for Mobile layout */}
  <div className='
    flex flex-col w-full max-w-md    /* Mobile: Full width up to medium, centered content */
    items-center text-center
    lg:max-w-[45%] lg:items-start   /* Desktop: Takes 45% width, align items left */
    lg:text-left lg:mr-8           /* Desktop: Align text left, add right margin (space before image) */
    lg:order-first                 /* Desktop: Ensure text block appears FIRST */
  '>
    {/* Title Span */}
    <span className="
      block break-words
      font-blauer-nue
      text-2xl leading-tight         /* Mobile text size */
      lg:text-4xl lg:leading-[44px]  /* Desktop text size */
      not-italic font-medium
      text-transparent bg-clip-text  /* Gradient text effect */
      bg-gradient-to-t from-white to-[#0DE3F6]
      w-full mb-2
    ">
      Curate a Home That Echoes Heritage & Style
    </span>

    {/* Body Text Span */}
    <span className="
      block break-words
      font-blauer-nue
      text-sm leading-6              /* Mobile text size */
      lg:text-base lg:leading-6      /* Desktop text size */
      font-normal
      text-transparent bg-clip-text  /* Gradient text effect */
      bg-gradient-to-r from-[#0DE3F6] to-[#ffffffe0]
      w-full
    ">
      Step into a world where tradition meets contemporary design. Adorn your home with rich heritage and let every detail echo timeless elegance.
    </span>
  </div>
</div>

        {/* Hero Section with another Ellipse */}
        <div className='relative'> {/* This parent needs to be relative for the absolute ellipse inside */}
          <HeroSection />
          {/* This ellipse is positioned relative to the HeroSection container */}
          <div className={`${styles.Ellipse_13_176_203} absolute top-0 left-56 z-0 pointer-events-none`}></div> {/* Ensure z-0 if HeroSection content should be above */}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;