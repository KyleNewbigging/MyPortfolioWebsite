import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";

const Simulation = () => {
    

    return (
        <div className="fixed inset-0 z-0 h-screen bg-black">
        <Canvas className="bg-black">
        <OrbitControls autoRotate autoRotateSpeed={0.2}/>
        <ambientLight intensity={0.5}/>
        <spotLight position={[0,0,5]} angle={0.3} />
        <Stars/>

        {/* <mesh>
            <boxGeometry attach="geometry" />
            <meshStandardMaterial color="hotpink" />
        </mesh> */}
        </Canvas>
        </div>

    )
}

export default Simulation;