import * as THREE from 'three'
import React, { useContext, useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { CameraControls, OrbitControls, useGLTF, DragControls, useBounds, Decal, useTexture } from '@react-three/drei'
import { useFrame, useThree, type ThreeElements, type ThreeEvent } from '@react-three/fiber';
import { clamp, degToRad, lerp, radToDeg } from 'three/src/math/MathUtils.js';
import { Howl, Howler } from 'howler';
import { Mesh, Vector3 } from 'three';
import { type GLTF } from 'three-stdlib';
import { VinylRecord } from './VinylRecord';
import type { Track } from './Player';
import { easing } from 'maath';
import { ControlsContext } from './ControlsContext';
import { TrackInfoPanelContext } from './TrackInfoPanelContext';

const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

const MAX_ANGLE = degToRad(54);
const MIN_ANGLE = degToRad(0);
const MAX_MUSIC_ANGLE = degToRad(50.8);
const MIN_MUSIC_ANGLE = degToRad(31.3);

const ROTATION_SPEED_IN_MINUTES = 33 + 1 / 3;

type GLTFResult = GLTF & {
    nodes: {
        Rega_Planar_1_Black002: THREE.Mesh
        BézierCircle: THREE.Mesh
        Cube: THREE.Mesh
        ['switch']: THREE.Mesh
        Cylinder: THREE.Mesh
        Cylinder001: THREE.Mesh
        Cylinder002: THREE.Mesh
        Cylinder003: THREE.Mesh
        Cylinder004: THREE.Mesh
        Rega_Planar_1_Black007_1: THREE.Mesh
        Rega_Planar_1_Black007_2: THREE.Mesh
        Rega_Planar_1_Black020_1: THREE.Mesh
        Rega_Planar_1_Black020_2: THREE.Mesh
        Rega_Planar_1_Black020_3: THREE.Mesh
        Rega_Planar_1_Black021_1: THREE.Mesh
        Rega_Planar_1_Black021_2: THREE.Mesh
        Rega_Planar_1_Black021_3: THREE.Mesh
        Rega_Planar_1_Black008: THREE.Mesh
        Rega_Planar_1_Black003: THREE.Mesh
        Rega_Planar_1_Black006: THREE.Mesh
        Rega_Planar_1_Black013: THREE.Mesh
        Rega_Planar_1_Black036: THREE.Mesh
        Rega_Planar_1_Black062: THREE.Mesh
        Rega_Planar_1_Black015_1: THREE.Mesh
        Rega_Planar_1_Black015_2: THREE.Mesh
        Cylinder008: THREE.Mesh
        Rega_Planar_1_Black066: THREE.Mesh
        Rega_Planar_1_Black068: THREE.Mesh
        tonarm_holder: THREE.Mesh
        Rega_Planar_1_Black067: THREE.Mesh
        Rega_Planar_1_Black069: THREE.Mesh
        tonarm_pivot: THREE.Mesh
        Rega_Planar_1_Black010: THREE.Mesh
        Rega_Planar_1_Black009: THREE.Mesh
        Rega_Planar_1_Black011: THREE.Mesh
        Rega_Planar_1_Black035_1: THREE.Mesh
        Rega_Planar_1_Black035_2: THREE.Mesh
        Rega_Planar_1_Black035_1: THREE.Mesh
        Rega_Planar_1_Black035_2: THREE.Mesh
        Rega_Planar_1_Black035_1: THREE.Mesh
        Rega_Planar_1_Black035_2: THREE.Mesh
        Rega_Planar_1_Black044: THREE.Mesh
        Rega_Planar_1_Black029: THREE.Mesh
        Rega_Planar_1_Black031: THREE.Mesh
        Rega_Planar_1_Black032: THREE.Mesh
        Rega_Planar_1_Black033: THREE.Mesh
        Rega_Planar_1_Black034: THREE.Mesh
        Rega_Planar_1_Black022: THREE.Mesh
        Rega_Planar_1_Black023: THREE.Mesh
        Rega_Planar_1_Black024: THREE.Mesh
        Rega_Planar_1_Black025: THREE.Mesh
        Rega_Planar_1_Black026: THREE.Mesh
        Rega_Planar_1_Black027: THREE.Mesh
        Rega_Planar_1_Black028: THREE.Mesh
        Rega_Planar_1_Black030: THREE.Mesh
        Rega_Planar_1_Black064: THREE.Mesh
        Rega_Planar_1_Black065: THREE.Mesh
        Rega_Planar_1_Black037: THREE.Mesh
        Rega_Planar_1_Black038: THREE.Mesh
        Rega_Planar_1_Black039: THREE.Mesh
        Rega_Planar_1_Black040: THREE.Mesh
        Rega_Planar_1_Black072: THREE.Mesh
        Rega_Planar_1_Black012: THREE.Mesh
        Rega_Planar_1_Black016_1: THREE.Mesh
        Rega_Planar_1_Black016_2: THREE.Mesh
        Rega_Planar_1_Black016_3: THREE.Mesh
        Rega_Planar_1_Black017_1: THREE.Mesh
        Rega_Planar_1_Black017_2: THREE.Mesh
        Rega_Planar_1_Black017_3: THREE.Mesh
        Rega_Planar_1_Black073: THREE.Mesh
        Rega_Planar_1_Black070: THREE.Mesh
        Rega_Planar_1_Black004: THREE.Mesh
        Rega_Planar_1_Black005: THREE.Mesh
        rounding_part: THREE.Mesh
        Rega_Planar_1_Black: THREE.Mesh
        slipmat: THREE.Mesh
    }
    materials: {
        white_plastic: THREE.MeshStandardMaterial
        pfetr: THREE.MeshStandardMaterial
        black_simple_plastic: THREE.MeshPhysicalMaterial
        IO: THREE.MeshPhysicalMaterial
        Steel: THREE.MeshPhysicalMaterial
        wire_white: THREE.MeshPhysicalMaterial
        wire_red: THREE.MeshPhysicalMaterial
        bolt: THREE.MeshPhysicalMaterial
        stop: THREE.MeshStandardMaterial
        bolthead: THREE.MeshStandardMaterial
        head: THREE.MeshPhysicalMaterial
        wire_green: THREE.MeshPhysicalMaterial
        wire_blue: THREE.MeshPhysicalMaterial
        Material__2142142971: THREE.MeshPhysicalMaterial
        black_gloss_plastic_2: THREE.MeshPhysicalMaterial
        rober: THREE.MeshStandardMaterial
    }
}

export type TurntableProps = Omit<
    ThreeElements['group'],
    'ref'
> & {
    trackList: Track[];
    slipmatRef: RefObject<THREE.Object3D>;
};

export function Turntable({ children, trackList = [], slipmatRef, /* onRecordDragEnd, */ onClick, ...props }: TurntableProps) {
    const { nodes, materials } = useGLTF('/turntable.glb') as unknown as GLTFResult;

    const trackInfoPanel = useContext(TrackInfoPanelContext)

    const [isPowerOn, setIsPowerOn] = useState(false);
    const [isRecordBlocked, setIsRecordBlocked] = useState(false);

    const ctx = useContext(ControlsContext);
    const { setEnabled } = ctx;
    // const isOnDrag = !enabled;
    // const setIsOnDrag = (enabled) => setEnabled(!enabled);

    const currentTrack = useRef<Howl>(null);

    const onTogglePowerSwitch = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        setIsPowerOn((state => !state));
    }

    useEffect(() => {
        if (isPowerOn) {
            currentTrack.current?.play();
        } else {
            currentTrack.current?.stop();
        }
    }, [isPowerOn])

    const roundingPartRef = useRef<THREE.Object3D>(null);

    useFrame((state, delta) => {
        if (roundingPartRef.current && isPowerOn) {
            roundingPartRef.current.rotation.y -= delta * ROTATION_SPEED_IN_MINUTES / 60 * Math.PI * 2;
        }
    })

    const tonarmRef = useRef<Mesh>(null);

    const [isOnDrag, setIsOnDrag] = useState(false);

    const tracks = useMemo(() => trackList.map(({ sound }) => sound), [trackList]);

    const tracksDurations = useMemo(() => tracks.map(track => track?.duration() ?? 1), [tracks]);
    const totalDuration = useMemo(() => tracksDurations.reduce((total, duration) => total + duration, 0), [tracksDurations]);
    const trackStartsAt = useMemo(() => {
        return tracksDurations.reduce<number[]>((parts, duration, i) => {
            parts.push((parts[i - 1] ?? 0) + (tracksDurations[i - 1] ?? 0));

            return parts;
        }, []);
    }, [tracksDurations]);

    useEffect(() => {
        tracks.map((track, i) => {
            if (i >= tracks.length - 1) {
                return;
            }


            track.on('end', (e) => {
                if (currentTrack.current === tracks.at(i + 1)) {
                    return;
                }
                console.log('end', e);
                currentTrack.current = tracks.at(i + 1);
                currentTrack.current.seek(0);
                currentTrack.current.play();
                trackInfoPanel.setTrack(trackList.at(i + 1));
            });
        });
    }, [trackInfoPanel, trackList, tracks]);

    const vinylSound = useMemo(() => {
        return new Howl({
            // src: ['./vinyl-record-noise.mp3'],
            src: ['./vinyl.mp3'],
            // volume: 0.3,
            loop: true,
        });
    }, []);

    /* useFrame(() => {
        if (isPowerOn && !isOnDrag && currentTrack.current && currentTrack.current.playing()) {
            // setTonarmAngle(sound.seek() / sound.duration() * -degToRad((MAX_MUSIC_ANGLE - MIN_MUSIC_ANGLE)) - degToRad(MIN_MUSIC_ANGLE));
            const trackIndex = tracks.indexOf(currentTrack.current);
            setTonarmAngle((trackStartsAt[trackIndex] + currentTrack.current.seek()) / totalDuration * -(MAX_MUSIC_ANGLE - MIN_MUSIC_ANGLE) - MIN_MUSIC_ANGLE);
        }
    }); */

    /* useEffect(() => {
        const trackSeek = (-radToDeg(tonarmAngle) - MIN_MUSIC_ANGLE) / (MAX_MUSIC_ANGLE - MIN_MUSIC_ANGLE);
        // console.log(trackSeek);
        sound.seek(trackSeek * sound.duration());
    }, [sound, tonarmAngle]); */

    const onTonarmDragStart = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        e.target.setPointerCapture(e.pointerId);
        setIsOnDrag(true);
        setEnabled(false);
        trackInfoPanel.setTrack(null);
        currentTrack.current?.pause();
        vinylSound.stop();
    };

    useFrame((state, delta) => {
        if (isPowerOn && !isOnDrag && currentTrack.current && currentTrack.current.playing()) {
            // setTonarmAngle(sound.seek() / sound.duration() * -degToRad((MAX_MUSIC_ANGLE - MIN_MUSIC_ANGLE)) - degToRad(MIN_MUSIC_ANGLE));
            const trackIndex = tracks.indexOf(currentTrack.current);
            const tonarmAngle = (trackStartsAt[trackIndex] + currentTrack.current.seek()) / totalDuration * -(MAX_MUSIC_ANGLE - MIN_MUSIC_ANGLE) - MIN_MUSIC_ANGLE;
            easing.dampE(tonarmRef.current.rotation, [degToRad(2.3), tonarmAngle + degToRad(0.8), 0], 0.1, delta);
            // tonarmRef.current.rotation.set(degToRad(2.3), tonarmAngle, 0);
            // setTonarmAngle((trackStartsAt[trackIndex] + currentTrack.current.seek()) / totalDuration * -(MAX_MUSIC_ANGLE - MIN_MUSIC_ANGLE) - MIN_MUSIC_ANGLE);
        } else if (isOnDrag && tonarmRef.current) {
            const { raycaster, camera, pointer, scene } = state;

            const tonarm = tonarmRef.current;
            const v = new THREE.Vector3();
            const wp = tonarm.getWorldPosition(v);

            const dragPoint = new THREE.Vector3();

            raycaster.setFromCamera(pointer, camera);
            raycaster.ray.intersectPlane(dragPlane, dragPoint);

            if (dragPoint.z <= wp.z || dragPoint.x >= wp.x) {
                return;
            }

            const angle = Math.atan(Math.abs(wp.x - dragPoint.x) / Math.abs(wp.z - dragPoint.z));
            const clampedAngle = clamp(-angle, -MAX_ANGLE, MIN_ANGLE);
            easing.dampE(tonarmRef.current.rotation, [0, clampedAngle + degToRad(0.8), 0], 0.1, delta);
        }
    })

    /*  const onTonarmDrag = (e: ThreeEvent<PointerEvent>) => {
         if (!isOnDrag || !tonarmRef.current) {
             return;
         }
 
         const tonarm = tonarmRef.current;
         const v = new THREE.Vector3();
         const wp = tonarm.getWorldPosition(v);
 
         if (e.point.z <= wp.z || e.point.x >= wp.x) {
             return;
         }
 
         const angle = Math.atan(Math.abs(wp.x - e.point.x) / Math.abs(wp.z - e.point.z));
         const clampedAngle = clamp(-angle, -MAX_ANGLE, MIN_ANGLE);
         setTonarmAngle(clampedAngle);
         // tonarm.rotation.set(degToRad(2), clampedAngle, 0);
     } */

    const onTonarmDragEnd = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        e.target.releasePointerCapture(e.pointerId);

        if (!isOnDrag) {
            return;
        }

        setIsOnDrag(false);
        setEnabled(true);
        console.log('onDragEnd');

        const tonarmAngle = tonarmRef.current.rotation.y;

        if (-tonarmAngle < MIN_MUSIC_ANGLE || !isPowerOn) {
            setIsRecordBlocked(false);
            return;
        }

        setIsRecordBlocked(true);

        const trackSeek = (-tonarmAngle - MIN_MUSIC_ANGLE) / (MAX_MUSIC_ANGLE - MIN_MUSIC_ANGLE);

        // console.log(trackSeek);
        const totalDuration = tracks.reduce((duration, track) => {
            return duration + track.duration();
        }, 0);

        const duration = totalDuration * trackSeek;

        let d = 0
        let i = 0;
        for (; i < tracks.length; i++) {
            d += tracks[i].duration();

            if (duration < d) {
                currentTrack.current = tracks[i];
                currentTrack.current.seek(currentTrack.current.duration() - (d - duration));
                break;
            }
        }

        trackInfoPanel.setTrack(trackList.at(i));



        // sound.seek(trackSeek * sound.duration());
        currentTrack.current.play();
        vinylSound.play();
    };

    const logoTexture = useTexture('./rega-planar-two-logo.png')

    return (
        <group {...props} dispose={null}
            onPointerDown={e => e.stopPropagation()}
            onPointerMove={e => e.stopPropagation()}
            onPointerUp={e => e.stopPropagation()}
        >
            <mesh
                name="Rega_Planar_1_Black002"
                castShadow
                receiveShadow
                onClick={onClick}
                geometry={nodes.Rega_Planar_1_Black002.geometry}
                material={materials.white_plastic}
                position={[0.001, 0.008, 0]}>
                <Decal
                    position={[0.22, -0.02, 0.14]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={[0.04, 0.04, 0.04]}
                >
                    <meshBasicMaterial
                        map={logoTexture}
                        polygonOffset
                        polygonOffsetFactor={-1}
                        transparent
                        depthTest
                    />
                </Decal>
                <mesh
                    name="BézierCircle"
                    castShadow
                    receiveShadow
                    geometry={nodes.BézierCircle.geometry}
                    material={materials.pfetr}
                    position={[-0.001, -0.029, 0]}
                />
                <mesh
                    name="Cube"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube.geometry}
                    material={materials.black_simple_plastic}
                    position={[-0.151, -0.058, -0.143]}
                    rotation={[0, -0.24, 0]}>
                    <mesh
                        name="switch"
                        onClick={onTogglePowerSwitch}
                        castShadow
                        receiveShadow
                        geometry={nodes['switch'].geometry}
                        material={materials.IO}
                        position={[0, 0.005, 0]}
                        rotation={[isPowerOn ? degToRad(18) : 0, 0.24, 0]}
                    />
                </mesh>
                <mesh
                    name="Cylinder"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder.geometry}
                    material={materials.black_simple_plastic}
                    position={[0.207, -0.053, 0.135]}
                    scale={0.016}
                />
                <mesh
                    name="Cylinder001"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder001.geometry}
                    material={materials.black_simple_plastic}
                    position={[0.207, -0.053, -0.122]}
                    scale={0.016}
                />
                <mesh
                    name="Cylinder002"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder002.geometry}
                    material={materials.black_simple_plastic}
                    position={[-0.106, -0.053, -0.122]}
                    scale={0.016}
                />
                <mesh
                    name="Cylinder003"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder003.geometry}
                    material={materials.black_simple_plastic}
                    position={[-0.106, -0.053, 0.136]}
                    scale={0.016}
                />
                <mesh
                    name="Cylinder004"
                    castShadow
                    receiveShadow
                    geometry={nodes.Cylinder004.geometry}
                    material={materials.Steel}
                    position={[-0.001, -0.029, -0.072]}
                    scale={0.009}
                />
                <group name="Rega_Planar_1_Black007" position={[-0.029, -0.059, -0.129]}>
                    <mesh
                        name="Rega_Planar_1_Black007_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.Rega_Planar_1_Black007_1.geometry}
                        material={materials.black_simple_plastic}
                    />
                    <mesh
                        name="Rega_Planar_1_Black007_2"
                        castShadow
                        receiveShadow
                        geometry={nodes.Rega_Planar_1_Black007_2.geometry}
                        material={materials.Steel}
                    />
                    <group name="Rega_Planar_1_Black020" position={[0.019, 0.003, -0.033]}>
                        <mesh
                            name="Rega_Planar_1_Black020_1"
                            castShadow
                            receiveShadow
                            geometry={nodes.Rega_Planar_1_Black020_1.geometry}
                            material={materials.black_simple_plastic}
                        />
                        <mesh
                            name="Rega_Planar_1_Black020_2"
                            castShadow
                            receiveShadow
                            geometry={nodes.Rega_Planar_1_Black020_2.geometry}
                            material={materials.Steel}
                        />
                        <mesh
                            name="Rega_Planar_1_Black020_3"
                            castShadow
                            receiveShadow
                            geometry={nodes.Rega_Planar_1_Black020_3.geometry}
                            material={materials.wire_white}
                        />
                    </group>
                    <group name="Rega_Planar_1_Black021" position={[0.011, 0.003, -0.033]}>
                        <mesh
                            name="Rega_Planar_1_Black021_1"
                            castShadow
                            receiveShadow
                            geometry={nodes.Rega_Planar_1_Black021_1.geometry}
                            material={materials.black_simple_plastic}
                        />
                        <mesh
                            name="Rega_Planar_1_Black021_2"
                            castShadow
                            receiveShadow
                            geometry={nodes.Rega_Planar_1_Black021_2.geometry}
                            material={materials.Steel}
                        />
                        <mesh
                            name="Rega_Planar_1_Black021_3"
                            castShadow
                            receiveShadow
                            geometry={nodes.Rega_Planar_1_Black021_3.geometry}
                            material={materials.wire_red}
                        />
                    </group>
                </group>
                <mesh
                    name="Rega_Planar_1_Black008"
                    castShadow
                    receiveShadow
                    geometry={nodes.Rega_Planar_1_Black008.geometry}
                    material={materials.black_simple_plastic}
                    position={[0.235, -0.04, -0.18]}>
                    <mesh
                        name="Rega_Planar_1_Black003"
                        castShadow
                        receiveShadow
                        geometry={nodes.Rega_Planar_1_Black003.geometry}
                        material={materials.bolt}
                        position={[-0.025, 0.001, -0.001]}
                    />
                    <mesh
                        name="Rega_Planar_1_Black006"
                        castShadow
                        receiveShadow
                        geometry={nodes.Rega_Planar_1_Black006.geometry}
                        material={materials.bolt}
                        position={[-0.023, 0.014, 0.071]}
                        rotation={[Math.PI / 2, 0, 0]}
                    />
                    <mesh
                        name="Rega_Planar_1_Black013"
                        castShadow
                        receiveShadow
                        geometry={nodes.Rega_Planar_1_Black013.geometry}
                        material={materials.bolt}
                        position={[-0.003, 0.014, 0.106]}
                        rotation={[Math.PI / 2, 0, 0]}
                    />
                    <mesh
                        name="Rega_Planar_1_Black036"
                        castShadow
                        receiveShadow
                        geometry={nodes.Rega_Planar_1_Black036.geometry}
                        material={materials.bolt}
                        position={[-0.044, 0.014, 0.106]}
                        rotation={[Math.PI / 2, 0, 0]}
                    />
                    <mesh
                        name="Rega_Planar_1_Black062"
                        castShadow
                        receiveShadow
                        geometry={nodes.Rega_Planar_1_Black062.geometry}
                        material={materials.bolt}
                        position={[0.026, 0.001, -0.001]}
                    />
                </mesh>
                <group name="Rega_Planar_1_Black015" position={[0.211, -0.017, -0.073]}>
                    <mesh
                        name="Rega_Planar_1_Black015_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.Rega_Planar_1_Black015_1.geometry}
                        material={materials.stop}
                    />
                    <mesh
                        name="Rega_Planar_1_Black015_2"
                        castShadow
                        receiveShadow
                        geometry={nodes.Rega_Planar_1_Black015_2.geometry}
                        material={materials.black_simple_plastic}
                    />
                    <mesh
                        name="Cylinder008"
                        castShadow
                        receiveShadow
                        geometry={nodes.Cylinder008.geometry}
                        material={materials.black_simple_plastic}
                        position={[0, 0.024, 0.043]}>
                        <mesh
                            name="Rega_Planar_1_Black066"
                            castShadow
                            receiveShadow
                            geometry={nodes.Rega_Planar_1_Black066.geometry}
                            material={materials.Steel}
                            position={[0.005, -0.006, -0.003]}
                            scale={[1, 1, 0.89]}
                        />
                        <mesh
                            name="Rega_Planar_1_Black068"
                            castShadow
                            receiveShadow
                            geometry={nodes.Rega_Planar_1_Black068.geometry}
                            material={materials.Steel}
                            position={[0.005, -0.006, 0.003]}
                            scale={[1, 1, 0.89]}
                        />
                        <mesh
                            name="tonarm_holder"
                            castShadow
                            receiveShadow
                            geometry={nodes.tonarm_holder.geometry}
                            material={materials.black_simple_plastic}
                            position={[0.005, -0.006, -0.001]}
                            rotation={[0, 0, -1.171]}>
                            <mesh
                                name="Rega_Planar_1_Black067"
                                castShadow
                                receiveShadow
                                geometry={nodes.Rega_Planar_1_Black067.geometry}
                                material={materials.Steel}
                                position={[-0.01, 0.012, 0.004]}
                                rotation={[0, 0, -0.015]}
                                scale={[1, 1, 0.912]}
                            />
                            <mesh
                                name="Rega_Planar_1_Black069"
                                castShadow
                                receiveShadow
                                geometry={nodes.Rega_Planar_1_Black069.geometry}
                                material={materials.Steel}
                                position={[-0.01, 0.012, -0.002]}
                                scale={[1, 1, 0.912]}
                            />
                        </mesh>
                    </mesh>
                    {/* <mesh onPointerUp={onTonarmDragEnd}  onPointerMove={onTonarmDrag} onClick={(e) => { e.stopPropagation() }} position={[0, 0.01, 0]} rotation={[degToRad(-90), 0, 0]}>
                        <meshStandardMaterial transparent opacity={0} />
                        <planeGeometry parameters={{ width: 0.1, height: 0.1, widthSegments: 0.1, heightSegments: 0.1 }} />
                    </mesh> */}
                    <mesh
                        name="tonarm_pivot"
                        ref={tonarmRef}
                        // rotation={[isOnDrag ? degToRad(0) : degToRad(2.3), tonarmAngle + degToRad(0.8), 0]}
                        onPointerDown={onTonarmDragStart}
                        onPointerUp={onTonarmDragEnd}
                        castShadow
                        receiveShadow
                        geometry={nodes.tonarm_pivot.geometry}
                        material={materials.black_simple_plastic}
                        position={[0, 0.021, -0.014]}>
                        <mesh
                            name="Rega_Planar_1_Black010"
                            castShadow
                            receiveShadow
                            geometry={nodes.Rega_Planar_1_Black010.geometry}
                            material={materials.black_simple_plastic}
                            position={[0, 0.003, 0.064]}>
                            <mesh
                                name="Rega_Planar_1_Black009"
                                castShadow
                                receiveShadow
                                geometry={nodes.Rega_Planar_1_Black009.geometry}
                                material={materials.black_simple_plastic}
                                position={[0, 0, -0.1]}
                            />
                            <mesh
                                name="Rega_Planar_1_Black011"
                                castShadow
                                receiveShadow
                                geometry={nodes.Rega_Planar_1_Black011.geometry}
                                material={materials.black_simple_plastic}
                                position={[0.002, 0.005, 0.165]}>
                                <group name="Rega_Planar_1_Black019" position={[-0.01, 0.004, -0.003]}>
                                    <mesh
                                        name="Rega_Planar_1_Black035_1"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Rega_Planar_1_Black035_1.geometry}
                                        material={materials.Steel}
                                    />
                                    <mesh
                                        name="Rega_Planar_1_Black035_2"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Rega_Planar_1_Black035_2.geometry}
                                        material={materials.bolthead}
                                    />
                                </group>
                                <group name="Rega_Planar_1_Black035" position={[0, 0.004, 0.006]}>
                                    <mesh
                                        name="Rega_Planar_1_Black035_1"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Rega_Planar_1_Black035_1.geometry}
                                        material={materials.Steel}
                                    />
                                    <mesh
                                        name="Rega_Planar_1_Black035_2"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Rega_Planar_1_Black035_2.geometry}
                                        material={materials.bolthead}
                                    />
                                </group>
                                <group name="Rega_Planar_1_Black041" position={[-0.01, 0.004, 0.01]}>
                                    <mesh
                                        name="Rega_Planar_1_Black035_1"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Rega_Planar_1_Black035_1.geometry}
                                        material={materials.Steel}
                                    />
                                    <mesh
                                        name="Rega_Planar_1_Black035_2"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Rega_Planar_1_Black035_2.geometry}
                                        material={materials.bolthead}
                                    />
                                </group>
                                <mesh
                                    name="Rega_Planar_1_Black044"
                                    castShadow
                                    receiveShadow
                                    geometry={nodes.Rega_Planar_1_Black044.geometry}
                                    // material={materials.head}
                                    position={[-0.006, -0.007, 0.007]}>
                                    {/* <primitive
                                        object={materials.head}
                                        attach="material"
                                        transparent={false}
                                        opacity={1}
                                        color={'#FFF000'}
                                    /> */}
                                    <meshStandardMaterial color={'#B6AB00'}></meshStandardMaterial>
                                    <mesh
                                        name="Rega_Planar_1_Black029"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Rega_Planar_1_Black029.geometry}
                                        material={materials.wire_red}
                                        position={[0.006, 0.003, -0.02]}
                                    />
                                    <mesh
                                        name="Rega_Planar_1_Black031"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Rega_Planar_1_Black031.geometry}
                                        material={materials.wire_red}
                                        position={[0.008, 0.004, -0.02]}
                                    />
                                    <mesh
                                        name="Rega_Planar_1_Black032"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Rega_Planar_1_Black032.geometry}
                                        material={materials.wire_green}
                                        position={[0.009, 0.003, -0.019]}
                                    />
                                    <mesh
                                        name="Rega_Planar_1_Black033"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Rega_Planar_1_Black033.geometry}
                                        material={materials.wire_white}
                                        position={[0.012, 0.003, -0.018]}
                                    />
                                    <mesh
                                        name="Rega_Planar_1_Black034"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Rega_Planar_1_Black034.geometry}
                                        material={materials.wire_blue}
                                        position={[0.012, 0.004, -0.02]}>
                                        <mesh
                                            name="Rega_Planar_1_Black022"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.Rega_Planar_1_Black022.geometry}
                                            material={materials.Material__2142142971}
                                            position={[-0.004, -0.004, 0.003]}
                                        />
                                        <mesh
                                            name="Rega_Planar_1_Black023"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.Rega_Planar_1_Black023.geometry}
                                            material={materials.Material__2142142971}
                                            position={[-0.003, -0.003, 0.004]}
                                        />
                                        <mesh
                                            name="Rega_Planar_1_Black024"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.Rega_Planar_1_Black024.geometry}
                                            material={materials.Material__2142142971}
                                            position={[-0.007, -0.005, 0.002]}
                                        />
                                        <mesh
                                            name="Rega_Planar_1_Black025"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.Rega_Planar_1_Black025.geometry}
                                            material={materials.Material__2142142971}
                                            position={[-0.004, 0.002, 0.005]}
                                        />
                                        <mesh
                                            name="Rega_Planar_1_Black026"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.Rega_Planar_1_Black026.geometry}
                                            material={materials.Material__2142142971}
                                            position={[-0.005, 0.002, 0.004]}
                                        />
                                        <mesh
                                            name="Rega_Planar_1_Black027"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.Rega_Planar_1_Black027.geometry}
                                            material={materials.Material__2142142971}
                                            position={[-0.007, 0.002, 0.003]}
                                        />
                                        <mesh
                                            name="Rega_Planar_1_Black028"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.Rega_Planar_1_Black028.geometry}
                                            material={materials.Material__2142142971}
                                            position={[-0.005, -0.003, 0.003]}
                                        />
                                        <mesh
                                            name="Rega_Planar_1_Black030"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.Rega_Planar_1_Black030.geometry}
                                            material={materials.Material__2142142971}
                                            position={[-0.003, 0.002, 0.006]}
                                        />
                                        <mesh
                                            name="Rega_Planar_1_Black064"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.Rega_Planar_1_Black064.geometry}
                                            material={materials.Material__2142142971}
                                            position={[-0.003, -0.004, 0.004]}
                                        />
                                        <mesh
                                            name="Rega_Planar_1_Black065"
                                            castShadow
                                            receiveShadow
                                            geometry={nodes.Rega_Planar_1_Black065.geometry}
                                            material={materials.Material__2142142971}
                                            position={[-0.009, 0.002, 0.003]}
                                        />
                                    </mesh>
                                    <mesh
                                        name="Rega_Planar_1_Black037"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Rega_Planar_1_Black037.geometry}
                                        material={materials.black_simple_plastic}
                                        position={[0.004, 0.001, -0.011]}
                                    />
                                    <mesh
                                        name="Rega_Planar_1_Black038"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Rega_Planar_1_Black038.geometry}
                                        material={materials.black_simple_plastic}
                                        position={[0.003, 0.006, -0.009]}
                                    />
                                    <mesh
                                        name="Rega_Planar_1_Black039"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Rega_Planar_1_Black039.geometry}
                                        material={materials.black_simple_plastic}
                                        position={[0.003, 0.004, -0.009]}
                                    />
                                    <mesh
                                        name="Rega_Planar_1_Black040"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Rega_Planar_1_Black040.geometry}
                                        material={materials.Steel}
                                        position={[0.007, -0.002, -0.004]}
                                    />
                                    <mesh
                                        name="Rega_Planar_1_Black072"
                                        castShadow
                                        receiveShadow
                                        geometry={nodes.Rega_Planar_1_Black072.geometry}
                                        material={materials.Steel}
                                        position={[0, -0.004, 0.001]}
                                    />
                                </mesh>
                            </mesh>
                        </mesh>
                        <mesh
                            name="Rega_Planar_1_Black012"
                            castShadow
                            receiveShadow
                            geometry={nodes.Rega_Planar_1_Black012.geometry}
                            material={materials.black_simple_plastic}
                            position={[0.005, 0.004, 0]}
                        />
                    </mesh>
                </group>
                <group name="Rega_Planar_1_Black016" position={[0.197, -0.016, -0.063]}>
                    <mesh
                        name="Rega_Planar_1_Black016_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.Rega_Planar_1_Black016_1.geometry}
                        material={materials.black_gloss_plastic_2}
                    />
                    <mesh
                        name="Rega_Planar_1_Black016_2"
                        castShadow
                        receiveShadow
                        geometry={nodes.Rega_Planar_1_Black016_2.geometry}
                        material={materials.black_simple_plastic}
                    />
                    <mesh
                        name="Rega_Planar_1_Black016_3"
                        castShadow
                        receiveShadow
                        geometry={nodes.Rega_Planar_1_Black016_3.geometry}
                        material={materials.Steel}
                    />
                    <group name="Rega_Planar_1_Black017" position={[-0.003, 0.013, -0.007]}>
                        <mesh
                            name="Rega_Planar_1_Black017_1"
                            castShadow
                            receiveShadow
                            geometry={nodes.Rega_Planar_1_Black017_1.geometry}
                            material={materials.black_simple_plastic}
                        />
                        <mesh
                            name="Rega_Planar_1_Black017_2"
                            castShadow
                            receiveShadow
                            geometry={nodes.Rega_Planar_1_Black017_2.geometry}
                            material={materials.Steel}
                        />
                        <mesh
                            name="Rega_Planar_1_Black017_3"
                            castShadow
                            receiveShadow
                            geometry={nodes.Rega_Planar_1_Black017_3.geometry}
                            material={materials.rober}
                        />
                    </group>
                    <mesh
                        name="Rega_Planar_1_Black073"
                        castShadow
                        receiveShadow
                        geometry={nodes.Rega_Planar_1_Black073.geometry}
                        material={materials.Steel}
                        position={[0.023, -0.011, 0.013]}
                    />
                </group>
                <mesh
                    name="Rega_Planar_1_Black070"
                    castShadow
                    receiveShadow
                    geometry={nodes.Rega_Planar_1_Black070.geometry}
                    material={materials.black_simple_plastic}
                    position={[-0.142, -0.04, -0.18]}>
                    <mesh
                        name="Rega_Planar_1_Black004"
                        castShadow
                        receiveShadow
                        geometry={nodes.Rega_Planar_1_Black004.geometry}
                        material={materials.bolt}
                        position={[0.026, 0.001, -0.001]}
                    />
                    <mesh
                        name="Rega_Planar_1_Black005"
                        castShadow
                        receiveShadow
                        geometry={nodes.Rega_Planar_1_Black005.geometry}
                        material={materials.bolt}
                        position={[-0.026, 0.001, -0.001]}
                    />
                </mesh>
                <mesh
                    name="rounding_part"
                    ref={roundingPartRef}
                    castShadow
                    receiveShadow
                    geometry={nodes.rounding_part.geometry}
                    material={materials.black_simple_plastic}
                    position={[-0.001, -0.008, 0]}
                    rotation={[0, 0.338, 0]}
                >
                    <mesh
                        name="Rega_Planar_1_Black"
                        castShadow
                        receiveShadow
                        geometry={nodes.Rega_Planar_1_Black.geometry}
                        material={materials.black_gloss_plastic_2}
                        position={[0, -0.006, 0]}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <mesh
                            name="slipmat"
                            castShadow
                            receiveShadow
                            geometry={nodes.slipmat.geometry}
                            material={materials.pfetr}
                            position={[0, 0.002, 0]}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <group
                                ref={slipmatRef}
                                position={[0, 0.004, 0]}
                            >
                                {isRecordBlocked &&
                                    <mesh
                                    /* onClick={(e) => e.stopPropagation()}
                                    onPointerDown={e => e.stopPropagation()}
                                    onPointerMove={e => e.stopPropagation()}
                                    onPointerUp={e => e.stopPropagation()} */
                                    >
                                        <cylinderGeometry args={[0.155, 0.155, 0.005, 32, 1]} />
                                        <meshStandardMaterial transparent opacity={0} />
                                    </mesh>
                                }
                                {children}
                            </group>
                        </mesh>
                    </mesh>
                </mesh>
            </mesh>
        </group>
    )
}

useGLTF.preload('/turntable.glb')
