import * as THREE from 'three'
import { useGLTF, Text, useTexture, useAnimations } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { useFrame, useThree, type ThreeElements, type ThreeEvent } from '@react-three/fiber';
import { easing } from 'maath';
import { VinylRecordRotation, type Record, type RecordSide } from './Player';
import { ControlsContext } from './ControlsContext';

const MAX_RADIUS = 0.1447;
const MIN_RADIUS = 0.0672;
const DISTANCE = MAX_RADIUS - MIN_RADIUS;
const STOP_LINE_STROKE_WIDTH = 0.0003;

const CLICK_THRESHOLD = 0.01;

const sideTracksDurations = (recordSide: RecordSide) => {
    const durations = recordSide.tracks.map(track => track.sound?.duration() ?? 1);

    const totalDuration = durations.reduce((total, duration) => {
        return total + duration;
    }, 0);

    return durations.reduce<number[]>((parts, duration, i) => {
        parts.push((parts[i - 1] ?? 0) + duration / totalDuration);

        return parts;
    }, []);
}

type GLTFResult = GLTF & {
    nodes: {
        Cylinder001: THREE.Mesh
        Cylinder001_1: THREE.Mesh
        Cylinder001_2: THREE.Mesh
        Cylinder001_3: THREE.Mesh
    }
    materials: {
        music: THREE.MeshStandardMaterial
        vinyl: THREE.MeshStandardMaterial
        labelSideOne: THREE.MeshStandardMaterial
        labelSideTwo: THREE.MeshStandardMaterial
    }
}

type ActionName = 'IdleSideOne' | 'IdleSideTwo'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const dragPoint = new THREE.Vector3();

export type VinylRecordProps = Omit<
    ThreeElements['group'],
    'ref' | 'children' | 'parent'
> & {
    record: Record,
    parent: RefObject<THREE.Object3D>;
    rotation: VinylRecordRotation;
    onClick?: (event: ThreeEvent<MouseEvent>) => void;
    onRotate?: () => void;
    onPointerUp?: ((event: ThreeEvent<PointerEvent>) => void);
    onPointerDown?: ((event: ThreeEvent<PointerEvent>) => void);
};

export const VinylRecord = (
    { record, onRotate, onClick, ref, parent, position, rotation = VinylRecordRotation.SideOne, onPointerUp, onPointerDown, ...props }: VinylRecordProps,
) => {
    const group = useRef(null);
    const { nodes, materials, animations } = useGLTF('/vinyl_record.glb') as unknown as GLTFResult;
    const { actions, mixer, clips, names } = useAnimations(animations, group);

    const textures = useTexture({
        sideOne: record.sideOne.image,
        sideTwo: record.sideTwo.image,
    });

    const labelMaterials = useMemo(() => {
        const sideOne = materials.labelSideOne.clone();
        const sideTwo = materials.labelSideTwo.clone();

        // sideOne.map.image = textures.sideOne;
        // sideTwo.map.image = textures.sideTwo;

        return {
            sideOne,
            sideTwo
        }
    }, [materials.labelSideOne, materials.labelSideTwo]);

    const { setEnabled } = useContext(ControlsContext);

    const startPointerPos = useRef({ x: 0, y: 0 });
    const wasDragged = useRef(false); // Need to prevent onClick while dragging
    const isDragging = useRef(false);
    const isPressed = useRef(false);

    const objectBoundsRef = useRef<THREE.Object3D>(null)

    const partsSideOne = useMemo(() => sideTracksDurations(record.sideOne), [record.sideOne]);
    const partsSideTwo = useMemo(() => sideTracksDurations(record.sideTwo), [record.sideTwo]);

    const recordPositionRef = useRef<THREE.Group | null>(null);
    const recordRotationRef = useRef<THREE.Group | null>(null);
    const { raycaster, camera, pointer, scene } = useThree();

    useEffect(() => {
        if (parent.current && recordPositionRef.current) {
            parent.current.attach(recordPositionRef.current);
        }
    }, [parent])

    // Состояния: 'home' (на базе), 'dragging' (в руке), 'player' (на проигрывателе)

    const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setEnabled(false);

        startPointerPos.current = { x: e.pointer.x, y: e.pointer.y };
        wasDragged.current = false;
        isPressed.current = true;

        // Захватываем указатель, чтобы не потерять фокус при быстром движении мыши
        // e.target.setPointerCapture(e.pointerId);

        // ВАЖНО: Привязываем пластинку к корню сцены (Scene), 
        // чтобы она двигалась в глобальных координатах и не зависела от вращения проигрывателя
        if (!recordPositionRef.current) return;
        // scene.attach(recordPositionRef.current);
        // onPointerDown?.(e);
    };

    const handlePointerMove = (e) => {
        // Если мы в процессе перетаскивания, проверяем, как далеко ушел курсор
        if (isPressed.current && !wasDragged.current) {
            const dx = e.pointer.x - startPointerPos.current.x;
            const dy = e.pointer.y - startPointerPos.current.y;
            const distance = Math.hypot(dx, dy);

            // Если сдвинули мышь дальше порога — значит, это ОДНОЗНАЧНО перетаскивание
            if (distance > CLICK_THRESHOLD) {
                wasDragged.current = true;
                isDragging.current = true;
                onPointerDown?.(e);
            }
        }
    };

    const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setEnabled(true);
        isDragging.current = false;
        isPressed.current = false;
        // e.target.releasePointerCapture(e.pointerId);

        onPointerUp?.(e);

        // // Вычисляем мировые позиции пластинки и проигрывателя
        // const recordWorldPos = new THREE.Vector3();
        // const playerWorldPos = new THREE.Vector3();
        // if (!recordPositionRef.current) return;
        // recordPositionRef.current.getWorldPosition(recordWorldPos);
        // turntableRef.current.getWorldPosition(playerWorldPos);

        // // Проверяем дистанцию (радиус зоны сброса - например, 2 юнита)
        // const distance = recordWorldPos.distanceTo(playerWorldPos);

        // if (turntableArea.containsPoint(recordWorldPos)) {
        //     // 1. Пластинка становится дочерней для проигрывателя
        //     setDragState('player');
        //     turntableRef.current.attach(recordPositionRef.current);
        // } else {
        //     // 2. Пластинка возвращается к исходному родителю
        //     setDragState('home');
        //     // homeRef.current.attach(recordRef.current);
        // }
    };

    useFrame((state, delta) => {
        if (!recordPositionRef.current) return;

        // easing.dampE(recordRotationRef.current.rotation, rotation, 0.25, delta);

        if (isDragging.current) {
            // Бросаем луч от курсора мыши до нашей виртуальной плоскости
            raycaster.setFromCamera(pointer, camera);
            raycaster.ray.intersectPlane(dragPlane, dragPoint);

            // Плавно двигаем пластинку за курсором (и немного приподнимаем ее по Y)
            easing.damp3(recordPositionRef.current.position, [dragPoint.x, 0.05, dragPoint.z], 0.1, delta);
            // Выравниваем вращение (чтобы она не крутилась в воздухе)
            // easing.dampE(recordRef.current.rotation, [0, 0, 0], 0.1, delta);

        } else {
            easing.damp3(recordPositionRef.current.position, position, 0.1, delta);
        }
    });

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        if (wasDragged.current) {
            return;
        };
        actions['Jump'].setLoop(THREE.LoopOnce, 1).reset().play();
        onClick?.(e);
    };

    const isFirstRender = useRef(true);

    useEffect(() => {
        const currentAction = rotation === VinylRecordRotation.SideOne ? actions['IdleSideOne'] : actions['IdleSideTwo'];
        const prevAction = rotation === VinylRecordRotation.SideOne ? actions['IdleSideTwo'] : actions['IdleSideOne'];

        if (!currentAction) return;

        if (isFirstRender.current) {
            currentAction.play();
            isFirstRender.current = false;
        } else if (prevAction) {
            // actions['Jump'].setLoop(THREE.LoopOnce, 1).reset().play();
            currentAction.reset();
            currentAction.play();
            prevAction.crossFadeTo(currentAction, 0.7, false);
        }
    }, [actions, rotation]);

    return (

        <group
            {...props}
            dispose={null}
            onClick={handleClick}
            ref={recordPositionRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            position={[-0.32 + (0.32), 0.004, -0.7]}
        >
            <group ref={group}>
                <group name="Scene">
                    <group name="record" scale={[-1, 1, 1]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cylinder001.geometry}
                            material={materials.music}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cylinder001_1.geometry}
                            material={materials.vinyl}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cylinder001_2.geometry}
                            material={materials.labelSideOne}
                        >
                            <primitive
                                object={labelMaterials.sideOne}
                                attach="material"
                                map={textures.sideOne}
                            />
                        </mesh>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Cylinder001_3.geometry}
                            material={materials.labelSideTwo}
                        >
                            <primitive
                                object={labelMaterials.sideTwo}
                                attach="material"
                                map={textures.sideTwo}
                            />
                        </mesh>
                        {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.031, 0]}>
                <meshPhongMaterial color="red" />
                <ringGeometry args={[MIN_RADIUS, 1.261, 64]} />
            </mesh> */}
                        {partsSideOne.map((percentage, index) => (
                            <mesh key={index} material={materials.vinyl} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0011, 0]}>
                                {/* <meshPhongMaterial color="red" /> */}
                                <ringGeometry
                                    args={[MAX_RADIUS - DISTANCE * percentage + (STOP_LINE_STROKE_WIDTH * 1.5), MAX_RADIUS - DISTANCE * percentage + STOP_LINE_STROKE_WIDTH * 2.5, 64]}
                                />
                            </mesh>
                        ))}
                        {partsSideTwo.map((percentage, index) => (
                            <mesh key={index} material={materials.vinyl} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.0011, 0]}>
                                {/* <meshPhongMaterial color="red" /> */}
                                <ringGeometry
                                    args={[MAX_RADIUS - DISTANCE * percentage + (STOP_LINE_STROKE_WIDTH * 1.5), MAX_RADIUS - DISTANCE * percentage + STOP_LINE_STROKE_WIDTH * 2.5, 64]}
                                />
                            </mesh>
                        ))}
                        {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.031, 0]}>
                <meshPhongMaterial color="red" />
                <ringGeometry args={[MAX_RADIUS, 2.701, 64]} />
            </mesh> */}
                    </group>
                </group>
            </group>
        </group>
    )
};

useGLTF.preload('/vinyl_record.glb')
