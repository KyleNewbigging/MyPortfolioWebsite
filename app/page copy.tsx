"use client";

import React from "react";
import Image from "next/image";
import Simulation from "@/components/simulation";


const Home: React.FC = () => {
  return (
    <div className="h-screen w-screen overflow-hidden md:overflow-auto flex flex-col justify-center items-center">
      <Simulation/>
      <div className="z-10 relative">



        <section id="home" className="flex flex-col items-center">
          <Image
            src="/LinkedInProfile.jpg"
            alt="Kyle Newbigging"
            width={192}
            height={192}
            className="w-48 h-48 object-cover rounded-full mt-6 mb-4"
          />
          <h1 className="text-4xl font-bold mb-4">Kyle Newbigging</h1>
          <p className="mb-8 text-center">
            I have just graduated Computer Science with a Math Minor at the
            University of Guelph. Along with my studies, I was president and
            captain of the schools varsity ultimate frisbee team. I have had a
            passion for technology since I was young. As Ive grown, I have come
            to love AI and game development.
          </p>
        </section>
        <section id="projects">
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <p className="mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            sit amet libero consequat, lacinia magna vel, ullamcorper odio. Sed
            et facilisis quam.
          </p>
        </section>
        <section id="about">
          <h2 className="text-3xl font-bold mb-4">About</h2>
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            sit amet libero consequat, lacinia magna vel, ullamcorper odio. Sed
            et facilisis quam.
          </p>
        </section>

        </div>

    </div>
  );
};

export default Home;
