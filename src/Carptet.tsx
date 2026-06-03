import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'
import type { JSX } from 'react'

type GLTFResult = GLTF & {
    nodes: {
        Cone: THREE.Mesh
    }
    materials: {
        carpet: THREE.MeshStandardMaterial
    }
}

export function Carpet(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/carpet.glb') as unknown as GLTFResult
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cone.geometry}
                material={materials.carpet}
                position={[0, -0.511, 0]}
            />
        </group>
    )
}

useGLTF.preload('/carpet.glb')