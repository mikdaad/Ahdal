import React from 'react';
import styles from './DeccanLogin.module.css';


export default function DeccanLogin() {
  
  return (
   <div className="w-[1440px] h-[1024px] relative bg-gradient-to-bl from-[#101318] to-[#1a1c21] rounded-[32px] outline outline-1 outline-offset-[-1px] outline-[#868686] overflow-hidden">
  <div className="w-[1350px] h-[914px] left-[45px] top-[55px] absolute bg-white bg-opacity-0 rounded-2xl shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.08)] outline outline-1 outline-[#e8af52] overflow-hidden">
    <div className="w-[1245px] h-[996px] left-[79px] top-[-36px] absolute opacity-10 bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_#E8AF52_0%,_rgba(252,_232,_3,_0)_100%)] blur-3xl" />
    <img className="w-[675px] h-[818px] left-[48px] top-[48px] absolute rounded-xl" src="https://placehold.co/675x818" />
    <div className="left-[763px] top-[305px] absolute justify-center text-white text-5xl font-medium font-['Blauer_Nue']">Welcome back</div>
    <div className="left-[763px] top-[379px] absolute justify-center"><span className="text-white text-2xl font-light font-['Blauer_Nue']">Don’t have an account? </span><span className="text-[#e8af52] text-2xl font-normal font-['Blauer_Nue']">Signup</span></div>
    <div className="w-[542px] h-[70px] left-[763px] top-[432px] absolute bg-[#d9d9d9]/20 rounded-xl" />
    <div className="left-[787px] top-[453px] absolute justify-center text-white text-opacity-30 text-2xl font-light font-['Blauer_Nue']">Enter your Phone number</div>
    <div className="px-12 py-4 left-[1030px] top-[526px] absolute bg-white bg-opacity-0 rounded outline outline-1 outline-offset-[-1px] outline-white inline-flex justify-center items-center gap-2.5">
      <div className="justify-center text-white text-2xl font-normal font-['Blauer_Nue']">Login with OTP</div>
    </div>
  </div>
</div>
  );
}