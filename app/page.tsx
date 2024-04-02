"use client";

import React from "react";
import Image from "next/image";
import Simulation from "@/components/simulation";
import { useState } from "react";
import AgeDisplay from "@/components/ageDisplay";



const Home: React.FC = () => {
  var [yearsOld, setYearsOld] = useState(0);
  return (
    <div className="h-screen w-screen overflow-hidden md:overflow-auto flex flex-col items-center">
      <Simulation />
      <div className="z-10 relative">
        <div className="flex flex-col items-center">
          <Image
            src="/LinkedInProfile.jpg"
            alt="Kyle Newbigging"
            width={613}
            height={613}
            className="w-40 h-44 object-cover mt-6 mb-4 rounded-full"
          />
          <h1 className="text-2xl font-bold mb-4">Kyle Newbigging</h1>

          <h2 className="text-lg font-bold">
            <AgeDisplay birthDate="2001-03-07"/>
          </h2>
          <h2 className="text-lg font-bold">
            who uses&nbsp;
            <span className="lang-button text-green-600" data-panel="nodejs">
              Node.JS
            </span>
            ,&nbsp; 
            <span className="lang-button text-blue-400" data-panel="flutter">
              Flutter
            </span>
            ,&nbsp; 
            <span className="lang-button text-orange-600" data-panel="htmlcss">
              HTML/CSS/JS
            </span>
            , and&nbsp;
            <span className="lang-button text-yellow-400" data-panel="others">
              others
            </span>
            .
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
