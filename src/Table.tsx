import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { type GLTF } from 'three-stdlib'
import type { JSX } from 'react'

type GLTFResult = GLTF & {
    nodes: {
        Cube002: THREE.Mesh
        Rega_Planar_1_Black046: THREE.Mesh
        Rega_Planar_1_Black047: THREE.Mesh
        Rega_Planar_1_Black048: THREE.Mesh
        Rega_Planar_1_Black049: THREE.Mesh
        Rega_Planar_1_Black050: THREE.Mesh
        Rega_Planar_1_Black051: THREE.Mesh
        Rega_Planar_1_Black052: THREE.Mesh
        Rega_Planar_1_Black053: THREE.Mesh
        Rega_Planar_1_Black054: THREE.Mesh
        Rega_Planar_1_Black055: THREE.Mesh
        Rega_Planar_1_Black056: THREE.Mesh
        Rega_Planar_1_Black057: THREE.Mesh
        Rega_Planar_1_Black058: THREE.Mesh
        Rega_Planar_1_Black059: THREE.Mesh
        Rega_Planar_1_Black060: THREE.Mesh
        Rega_Planar_1_Black061: THREE.Mesh
    }
    materials: {
        table: THREE.MeshStandardMaterial
        record05: THREE.MeshPhysicalMaterial
        record01: THREE.MeshPhysicalMaterial
        record08: THREE.MeshPhysicalMaterial
        record04: THREE.MeshPhysicalMaterial
        record09: THREE.MeshPhysicalMaterial
        record06: THREE.MeshPhysicalMaterial
        record02: THREE.MeshPhysicalMaterial
    }
}

export function Table(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/table.glb') as unknown as GLTFResult
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cube002.geometry}
                material={materials.table}
                position={[0.04, -0.284, 0.008]}
                scale={[0.262, 0.225, 0.182]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rega_Planar_1_Black046.geometry}
                material={materials.record05}
                position={[0.248, -0.338, 0.002]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rega_Planar_1_Black047.geometry}
                material={materials.record01}
                position={[0.232, -0.339, 0.018]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rega_Planar_1_Black048.geometry}
                material={materials.record08}
                position={[0.243, -0.338, -0.002]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rega_Planar_1_Black049.geometry}
                material={materials.record04}
                position={[0.228, -0.339, 0.028]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rega_Planar_1_Black050.geometry}
                material={materials.record09}
                position={[0.071, -0.339, 0.007]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rega_Planar_1_Black051.geometry}
                material={materials.record04}
                position={[0.066, -0.34, 0.007]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rega_Planar_1_Black052.geometry}
                material={materials.record08}
                position={[0.061, -0.34, 0.003]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rega_Planar_1_Black053.geometry}
                material={materials.record06}
                position={[0.056, -0.341, 0.014]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rega_Planar_1_Black054.geometry}
                material={materials.record05}
                position={[0.045, -0.341, 0.012]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rega_Planar_1_Black055.geometry}
                material={materials.record06}
                position={[0.037, -0.331, 0.02]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rega_Planar_1_Black056.geometry}
                material={materials.record09}
                position={[0.05, -0.341, 0.002]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rega_Planar_1_Black057.geometry}
                material={materials.record04}
                position={[-0.159, -0.333, 0.017]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rega_Planar_1_Black058.geometry}
                material={materials.record05}
                position={[-0.17, -0.333, 0.018]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rega_Planar_1_Black059.geometry}
                material={materials.record06}
                position={[-0.164, -0.333, 0.023]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rega_Planar_1_Black060.geometry}
                material={materials.record02}
                position={[-0.175, -0.333, 0.023]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Rega_Planar_1_Black061.geometry}
                material={materials.record08}
                position={[-0.179, -0.333, 0.023]}
            />
        </group>
    )
}

useGLTF.preload('/table.glb')
