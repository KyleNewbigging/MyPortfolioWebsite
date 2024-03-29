"use client";

import React from "react";
import Image from "next/image";

import Header from "../components/header";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";

function handleClick() {
  console.log("Button clicked!");
}

function Box() {
  return (
    <mesh>
      <boxGeometry attach="geometry" />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
}

const Home: React.FC = () => {
  return (
    <div className="App">
      <Header />

      
      <main className="p-6">
        <section id="home" className="flex flex-col items-center">
          <Image
            src="/LinkedInProfile.jpg"
            alt="Kyle Newbigging"
            width={192}
            height={192}
            className="w-48 h-48 object-cover rounded-full mt-6 mb-4"
          />
          <h1 className="text-4xl font-bold mb-4">Kyle Newbigging</h1>
          <p className="text-gray-700 mb-8 text-center">
            I have just graduated Computer Science with a Math Minor at the
            University of Guelph. Along with my studies, I was president and
            captain of the schools varsity ultimate frisbee team. I have had a
            passion for technology since I was young. As Ive grown, I have come
            to love AI and game development.
          </p>
        </section>
        <section id="projects">
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <p className="text-gray-700 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            sit amet libero consequat, lacinia magna vel, ullamcorper odio. Sed
            et facilisis quam.
          </p>
        </section>
        <section id="about">
          <h2 className="text-3xl font-bold mb-4">About</h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            sit amet libero consequat, lacinia magna vel, ullamcorper odio. Sed
            et facilisis quam.
          </p>
        </section>
      </main>

      {/* Code for canvas  three.js */}
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <Canvas >
          <OrbitControls/>
          <ambientLight intensity={0.5}/>
          <spotLight position={[15,10,5]} angle={0.3} />
          <Stars/>

          <mesh>
            <boxGeometry attach="geometry" />
            <meshStandardMaterial color="hotpink" />
          </mesh>
        </Canvas>
      </div>

    </div>
  );
};

export default Home;
