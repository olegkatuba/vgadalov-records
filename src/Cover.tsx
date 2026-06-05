import * as THREE from 'three'
import React, { Fragment, memo, useContext, useEffect, useMemo, useRef, useState, type JSX, type RefObject } from 'react'
import { useGLTF, useAnimations, useBounds, Html, Text } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { ThreeEvent } from '@react-three/fiber'
import type { RecordInfo, TrackInfo } from './Player'
import { useStrictClick } from './useStrictClick'
import { ControlsContext } from './ControlsContext'

type TrackListProps = JSX.IntrinsicElements['group'] & {
    ref?: RefObject<THREE.Object3D>;
    title?: string;
    tracks?: TrackInfo[];
}

const TrackList = ({ ref, title, tracks, ...props }: TrackListProps) => {
    const color = '#fff';
    const font = null;
    const backShiht = 0.002;
    const backColor = '#333';

    return (
        <group {...props} ref={ref}>
            <Text color={color} font={font} anchorX="left" fontSize={0.05}>{title}</Text>
            <Text position={[backShiht, -backShiht, -0.001]} color={backColor} font={font} anchorX="left" fontSize={0.05}>{title}</Text>
            {tracks.map(({ author, name }, i) => (
                <Fragment key={`${author}-${name}`}>
                    <Text color={color} font={font} anchorY="top" anchorX="left" position={[0, -0.1 + i * -0.05, 0]} fontSize={0.03}>{i + 1}. {author} - {name}</Text>
                    <Text color={backColor} font={font} anchorY="top" anchorX="left" position={[backShiht, -0.1 - backShiht + i * -0.05, -0.001]} fontSize={0.03}>{i + 1}. {author} - {name}</Text>
                </Fragment>
            ))}
        </group>
    )
}

type GLTFResult = GLTF & {
    nodes: {
        Cube004: THREE.SkinnedMesh
        Cube004_1: THREE.SkinnedMesh
        Cube004_2: THREE.SkinnedMesh
        Cube004_3: THREE.SkinnedMesh
        Cube004_4: THREE.SkinnedMesh
        Cube004_5: THREE.SkinnedMesh
        Cube004_6: THREE.SkinnedMesh
        Bone: THREE.Bone
        Bone002: THREE.Bone
        neutral_bone: THREE.Bone
    }
    materials: {
        cover: THREE.MeshStandardMaterial
        inside1: THREE.MeshStandardMaterial
        inside2: THREE.MeshStandardMaterial
        inside3: THREE.MeshStandardMaterial
        outside1: THREE.MeshStandardMaterial
        outisde2: THREE.MeshStandardMaterial
        outside3: THREE.MeshStandardMaterial
    }
}

type ActionName = 'Action' | 'Idle'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export type CoverProps = JSX.IntrinsicElements['group'] & {
    opened?: boolean;
    records?: RecordInfo[];
    onClick?: (e: ThreeEvent<MouseEvent>) => void;
    onLeftSideClick?: (e: ThreeEvent<MouseEvent>) => void;
    onCenterSideClick?: (e: ThreeEvent<MouseEvent>) => void;
    onRightSideClick?: (e: ThreeEvent<MouseEvent>) => void;
    onOpened?: () => void;
};

function CoverComponent({ opened, records: recordsProp, onClick, onOpened, onLeftSideClick, onCenterSideClick, onRightSideClick, ...props }: CoverProps) {
    const records = useMemo(() => recordsProp || [], [recordsProp]);
    const group = useRef<THREE.Group>(null);
    const { nodes, materials, animations } = useGLTF('/cover.glb') as unknown as GLTFResult;
    const api = useAnimations(animations, group);
    const { names, clips, mixer, actions } = api;

    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        actions['Idle'].play();

        /* actions['Action'].clampWhenFinished = true;
        actions['Action'].setDuration(0.1);
        actions['Action'].setLoop(THREE.LoopOnce, 1);
        actions['Action'].play(); */
    }, [actions]);

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        setIsClicked(true);
        actions['Idle'].fadeOut(1);

        actions['Action'].clampWhenFinished = true;
        actions['Action'].setLoop(THREE.LoopOnce, 1);
        actions['Action'].play();

        actions['Action'].getMixer().addEventListener('finished', () => {
            onOpened?.();
        });
        onClick?.(e);
    };

    const leftPageTextRef = useRef(null);
    const rightPageTextRef = useRef(null);
    const centerPageTextRef = useRef(null);

    useEffect(() => {
        const leftBone = nodes.Bone;
        const rightBone = nodes.Bone002;
        const centerBone = nodes.neutral_bone;

        if (leftBone && leftPageTextRef.current) {
            leftBone.add(leftPageTextRef.current)
        }
        if (rightBone && rightPageTextRef.current) {
            rightBone.add(rightPageTextRef.current)
        }
        if (centerBone && centerPageTextRef.current) {
            centerBone.add(centerPageTextRef.current)
        }
    }, [nodes]);

    const { controls } = useContext(ControlsContext);

    const handleLeftSideClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        if (!controls.current) return

        controls.current.setLookAt(
            -0.3, 0.15, -0.3,  // Позиция камеры (X, Y, Z) — пододвигаем ближе к левой стороне
            -0.3, 0.15, -0.6, // Куда камере смотреть (Target X, Y, Z) — центр левой панели
            true             // Плавная анимация (true)
        )
    }

    const handleCenterSideClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        if (!controls.current) return

        controls.current.setLookAt(
            0, 0.15, -0.3,  // Позиция камеры (X, Y, Z) — пододвигаем ближе к левой стороне
            0, 0.15, -0.6, // Куда камере смотреть (Target X, Y, Z) — центр левой панели
            true             // Плавная анимация (true)
        )
    }

    const handleRightSideClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        if (!controls.current) return

        controls.current.setLookAt(
            0.3, 0.15, -0.3,  // Позиция камеры (X, Y, Z) — пододвигаем ближе к левой стороне
            0.3, 0.15, -0.6, // Куда камере смотреть (Target X, Y, Z) — центр левой панели
            true             // Плавная анимация (true)
        )
    }

    const strictLeftClick = useStrictClick(opened ? handleLeftSideClick : null);
    const strictCenterClick = useStrictClick(opened ? handleCenterSideClick : null);
    const strictRightClick = useStrictClick(opened ? handleRightSideClick : null);

    return (
        <group {...props} ref={group} dispose={null} onClick={isClicked ? null : handleClick}>
            <group name="Scene">
                <group
                    name="Armature"
                    position={[-0.158, 0, 0]}
                    rotation={[Math.PI / 2, 0, Math.PI / 2]}
                    scale={0.226}>
                    <primitive object={nodes.Bone} />
                    <primitive object={nodes.Bone002} />
                    <primitive object={nodes.neutral_bone} />
                </group>
                <group name="Cube001">
                    <skinnedMesh
                        name="Cube004"
                        geometry={nodes.Cube004.geometry}
                        material={materials.cover}
                        skeleton={nodes.Cube004.skeleton}
                    />
                    <skinnedMesh
                        name="Cube004_1"
                        geometry={nodes.Cube004_1.geometry}
                        material={materials.inside1}
                        skeleton={nodes.Cube004_1.skeleton}
                    />
                    <skinnedMesh
                        name="Cube004_2"
                        geometry={nodes.Cube004_2.geometry}
                        material={materials.inside2}
                        skeleton={nodes.Cube004_2.skeleton}
                    />
                    <skinnedMesh
                        name="Cube004_3"
                        geometry={nodes.Cube004_3.geometry}
                        material={materials.inside3}
                        skeleton={nodes.Cube004_3.skeleton}
                    />
                    <skinnedMesh
                        name="Cube004_4"
                        geometry={nodes.Cube004_4.geometry}
                        material={materials.outside1}
                        skeleton={nodes.Cube004_4.skeleton}
                    />
                    <skinnedMesh
                        name="Cube004_5"
                        geometry={nodes.Cube004_5.geometry}
                        material={materials.outisde2}
                        skeleton={nodes.Cube004_5.skeleton}
                    />
                    <skinnedMesh
                        name="Cube004_6"
                        geometry={nodes.Cube004_6.geometry}
                        material={materials.outside3}
                        skeleton={nodes.Cube004_6.skeleton}
                    />

                    <group ref={leftPageTextRef} {...strictLeftClick} position={[0.003, 1.35, 0]} rotation={[0, Math.PI / 2, -Math.PI / 2]}>
                        <mesh visible={false} position={[0.64, 0, 0]}>
                            <planeGeometry args={[1.4, 1.4, 1, 1]} />
                        </mesh>
                        <TrackList position={[0, 0.6, 0]} title='Side A' tracks={records[0].sideOne.tracks} />
                        <TrackList position={[0, 0, 0]} title='Side B' tracks={records[0].sideTwo.tracks} />
                    </group>

                    <group ref={centerPageTextRef} {...strictCenterClick} position={[0.01, 0, -0.1]} rotation={[0, Math.PI / 2, 0]}>
                        <mesh visible={false} position={[0.6, 0, 0]}>
                            <planeGeometry args={[1.4, 1.4, 1, 1]} />
                        </mesh>
                        <TrackList position={[0, 0.6, 0]} title='Side C' tracks={records[1].sideOne.tracks} />
                        <TrackList position={[0, 0, 0]} title='Side D' tracks={records[1].sideTwo.tracks} />
                    </group>

                    <group ref={rightPageTextRef} {...strictRightClick} position={[0.01, 0.1, 0]} rotation={[Math.PI / 2, Math.PI / 2, 0]}>
                        <mesh visible={false} position={[0.6, 0, 0]}>
                            <planeGeometry args={[1.4, 1.4, 1, 1]} />
                        </mesh>
                        <TrackList position={[0, 0.6, 0]} title='Side E' tracks={records[2].sideOne.tracks} />
                        <TrackList position={[0, 0, 0]} title='Side F' tracks={records[2].sideTwo.tracks} />
                    </group>
                </group>
            </group>
        </group>
    )
};

const Cover = memo(CoverComponent);

export { Cover };

useGLTF.preload('/cover.glb')
