"use client";
import React from 'react'
import * as THREE from "three"
import { useState, useEffect, useRef } from "react"
import { Html } from '@react-three/drei';
import { Canvas, useFrame } from "@react-three/fiber"
import { Clouds, Cloud, CameraControls, Sky as SkyImpl, StatsGl } from "@react-three/drei"

const SkyCanvas = ({ className }) => {
  return (
    <Canvas className={className} camera={{ position: [10, -10, 10], fov: 45 }}>
      <Sky />
      <ambientLight intensity={Math.PI / 1.5} />
      <spotLight position={[0, 40, 0]} decay={0} distance={45} penumbra={1} intensity={100} />
      <spotLight position={[-20, 0, 10]} color="white" angle={0.15} decay={0} penumbra={-1} intensity={30} />
      <spotLight position={[20, -10, 10]} color="white" angle={0.2} decay={0} penumbra={-1} intensity={20} />
    </Canvas>
  )
}

const Sky = () => {
  const ref = useRef()
  const cloud0 = useRef();
  const [volume, setVolume] = useState(400)
  const [decrement, setDecrement] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      if (decrement){
        setVolume(prev => prev - .5)
        if (volume < 200){
          setDecrement(false)
        }
      } 
      else {
        setVolume(prev => prev + .5)
        if (volume > 395) {
          setDecrement(true)
        }
      }
    }, 50);
    return () => clearInterval(interval);
  })

  useFrame((state, delta) => {
    cloud0.current.rotation.x -= .001
  })
  return (
    <>
      <SkyImpl 
        sunPosition={[100, 10, 100]} 
        turbidity={10}
        rayleigh={.5}
        mieCoefficient={0.001}
        mieDirectionalG={0.8}/>
      <group ref={ref}>
        <Clouds material={THREE.MeshLambertMaterial} limit={400} range="500">
          <Cloud ref={cloud0} speed=".2" bounds={[6, 1, 1]} color="#ffffff" position={[-150, 0, 0]} />
          {/* <Cloud bounds={[6, 1, 1]} speed=".2" color="#a1a1a1" seed={2} position={[15, 0, 0]} /> */}
          {/* <Cloud {...config} bounds={[x, y, z]} color="#d0e0d0" seed={3} position={[-15, 0, 0]} /> */}
          <Cloud bounds={[6, 1, 1]} speed=".2" color="#a0b0d0" seed={4} position={[0, 0, -1]} />
          <Cloud bounds={[6, 1, 1]} color="#c0c0dd" seed={5} position={[0, 0, 12]} />
          <Cloud concentrate="outside" growth={100} color="#ffccdd" opacity={1.25} seed={0.3} bounds={200} volume={volume} />
        </Clouds>
      </group>
    </>
  )
}

export default SkyCanvas