import * as THREE from 'three'
import { type JSX } from 'react'
import { useGLTF } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
    nodes: {
        Cube003: THREE.Mesh
    }
    materials: {
        Wood: THREE.MeshStandardMaterial
    }
}

export function Shelf(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/shelf.glb') as unknown as GLTFResult
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube003.geometry}
                material={materials.Wood}
                scale={[0.541, 0.006, 0.197]}
            />
        </group>
    )
}

useGLTF.preload('/shelf.glb')