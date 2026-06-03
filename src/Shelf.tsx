import * as THREE from 'three'
import { type JSX } from 'react'
import { useGLTF } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
    nodes: {
        Cube005: THREE.Mesh
        Cube005_1: THREE.Mesh
    }
    materials: {
        Wood: THREE.MeshStandardMaterial
        Metal: THREE.MeshStandardMaterial
    }
}

export function Shelf(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/shelf.glb') as unknown as GLTFResult
    return (
        <group {...props} dispose={null}>
            <group scale={[0.541, 0.006, 0.197]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube005.geometry}
                    material={materials.Wood}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube005_1.geometry}
                    material={materials.Metal}
                />
            </group>
        </group>
    )
}

useGLTF.preload('/shelf.glb')