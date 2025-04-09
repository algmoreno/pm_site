"use client";
import React from 'react'
import * as THREE from "three"
import "@/styles/globals.css"
import { useState, useEffect, useRef } from "react"
import { Html } from '@react-three/drei';
import { Canvas, useFrame } from "@react-three/fiber"
import { Clouds, Cloud, CameraControls, Sky as SkyImpl, StatsGl } from "@react-three/drei"

const Landing = () => {
  const words = ['Hello', 'World', 'React', 'Next.js'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false); // fade out
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setShow(true); // fade in
      }, 500); // match this to fade-out duration
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="canvas-container" className={`flex w-full h-[700px] relative max-sm:mt-[25%] text-center`}>
      <Canvas camera={{ position: [10, -10, 10], fov: 45 }}>
        <Sky />
        {/* <Words /> */}
        <Html position={[-10, 12, 0]} className="w-[350px]">
          <img className="m-auto w-[50%]" src="/assets/lotus1.png" alt="lotus logo" />
          <p className="text-black font-light italic text-shadow-2xs text-shadow-sky-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A autem suscipit maxime. 
            Ex, quas commodi accusantium fugit praesentium quod nisi ratione ea earum esse expedita est non suscipit dignissimos. Reprehenderit.
          </p>
        </Html>
        <ambientLight intensity={Math.PI / 1.5} />
        <spotLight position={[0, 40, 0]} decay={0} distance={45} penumbra={1} intensity={100} />
        <spotLight position={[-20, 0, 10]} color="white" angle={0.15} decay={0} penumbra={-1} intensity={30} />
        <spotLight position={[20, -10, 10]} color="white" angle={0.2} decay={0} penumbra={-1} intensity={20} />
      </Canvas>
    </div>
  );
}

<<<<<<< HEAD

=======
const Words = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [fontSize, setFontSize] = useState("text-[100px]");
  const words = ['This', 'World', 'Moves', 'Fast', 'Slow', 'Down', 'And', 'Look', 'Around'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [show, setShow] = useState(true);

  function randomizeXYZ() {
    const minCeiled = Math.ceil(-10);
    const maxFloored = Math.floor(10);
    setX(Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)); 
    setY(Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)); 
    setZ(Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)); 
  }

  const sizes = ['text-[20px]', 'text-[30px]','text-[40px]', 'text-[50px]', 'text-[60px]', 'text-[70px]', 'text-[80px]'];
  const randomizeFontSize = () => {
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    setFontSize(size);
  };

  useEffect(() => {
    let isMounted = true;

    const animate = async () => {
      while (isMounted) {
        setShow(true); // fade in
        await new Promise((res) => setTimeout(res, 4000)); // stay visible
        setShow(false); // fade out
        await new Promise((res) => setTimeout(res, 4000)); // wait for fade out
        // randomizeFontSize();
        randomizeXYZ();
        setCurrentWordIndex((prev) => (prev + 1) % words.length); // switch word
      }
    };
      
    animate();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Html position={[x, y, z]} className={`fixed z-100 word ${show ? 'fade-in' : 'fade-out'} text-center font-semibold text-gray-500 ${fontSize}`}>
        {words[currentWordIndex]}
    </Html>
  )
}

const Sky = () => {
  const ref = useRef()
  const cloud0 = useRef();
  const [volume, setVolume] = useState(300)
  const [decrement, setDecrement] = useState(true);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (decrement){
  //       setVolume(prev => prev - .5)
  //       if (volume < 300){
  //         setDecrement(false)
  //       }
  //     } 
  //     else {
  //       setVolume(prev => prev + .5)
  //       if (volume > 495) {
  //         setDecrement(true)
  //       }
  //     }
  //   }, 1000);
  //   return () => clearInterval(interval);
  // })

  useFrame((state, delta) => {
    cloud0.current.rotation.x -= .001
  })
  return (
    <>
      <SkyImpl 
        sunPosition={[100, 10, 100]} 
        turbidity={5}
        rayleigh={.35}
        mieCoefficient={0.001}
        mieDirectionalG={0.8}/>
      <group ref={ref}>
        <Clouds material={THREE.MeshLambertMaterial} limit={400} range="500">
          <Cloud ref={cloud0} speed=".1" bounds={[6, 1, 1]} color="#ffffff" position={[-150, 0, 0]} />
          {/* <Cloud bounds={[6, 1, 1]} speed=".2" color="#a1a1a1" seed={2} position={[15, 0, 0]} /> */}
          {/* <Cloud {...config} bounds={[x, y, z]} color="#d0e0d0" seed={3} position={[-15, 0, 0]} /> */}
          <Cloud bounds={[6, 1, 1]} speed=".01" color="#ffffff" seed={4} position={[0, 0, -10]} />
          <Cloud bounds={[6, 1, 1]} color="#c0c0dd" seed={5} position={[0, 0, 12]} />
          <Cloud concentrate="outside" speed=".1" growth={100} color="#ffccdd" opacity={.75} seed={1} bounds={200} volume={volume} />
        </Clouds>
      </group>
    </>
  )
}
>>>>>>> sky

export default Landing