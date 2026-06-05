import { Bounds, CameraControls, DragControls, Edges, Environment, Float, GizmoHelper, GizmoViewport, Grid, OrbitControls, Outlines, PerspectiveCamera, PivotControls, Sky, Stage, Stats, Svg, TransformControls, useBounds } from "@react-three/drei";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import * as THREE from 'three'
import { Selection, Select, EffectComposer, Bloom } from '@react-three/postprocessing';
import { VinylRecord } from "./VinylRecord";
import { Suspense, useContext, useEffect, useMemo, useRef, useState, type Ref } from "react";
import { Turntable } from "./Turntable";
import { Group, Object3D, Sphere, Vector3, type Mesh, type PerspectiveCamera as PerspectiveCameraType } from "three";
import { FocusContext } from "./FocusContext";
import { LoadingContext } from "./LoadingContext";

export enum VinylRecordPosition {
  Home,
  Turntable
}

export enum VinylRecordRotation {
  SideOne,
  SideTwo
}

const turntableArea = new Sphere(new Vector3(0, 0, 0), 0.12);

export type TrackInfo = {
  path?: string;
  fallback?: string;
  name?: string;
  author?: string;
  description?: string;
}

export type Track = { sound: Howl } & TrackInfo;

export interface RecordSideInfo {
  image?: string;
  tracks: TrackInfo[];
}

export interface RecordSide {
  image?: string;
  tracks: Track[];
}

export interface RecordInfo {
  sideOne: RecordSideInfo;
  sideTwo: RecordSideInfo;
}

export interface Record {
  sideOne: RecordSide;
  sideTwo: RecordSide;
}

export type PLayerProps = {
  records?: Record[];
}

export default function PLayer({ records: recordsProp }: PLayerProps) {
  const records = useMemo(() => recordsProp || [], [recordsProp]);
  // const [records, setRecords] = useState<Record[]>([]);
  const [currentTrackList, setCurrentTrackList] = useState<Track[]>([]);
  // const [focusedObjectUuid, setFocusedObjectUuid] = useState<string>(null);

  const [recordPositions, setRecordPositions] = useState<VinylRecordPosition[]>([]);
  const [recordRotations, setRecordRotations] = useState<VinylRecordRotation[]>([]);

  const turntableRef = useRef<Object3D>(null);
  const slipmatRef = useRef<Object3D>(null);
  const shelfRef = useRef<Object3D>(null);
  const recordsRef = useRef<Object3D[]>([]);

  useEffect(() => {
    setRecordPositions(records.map(() => VinylRecordPosition.Home));
    setRecordRotations(records.map(() => VinylRecordRotation.SideOne));
  }, [records]);

  /* useEffect(() => {
    const loadRecordsTracks = async () => {
      const records = await Promise.all(recordsInfo.map<Promise<Record>>(async ({ sideOne, sideTwo }) => {
        const [sideOneTracks, sideTwoTracks] = await Promise.all([loadTracks(sideOne.tracks.map(({ path }) => path)), loadTracks(sideTwo.tracks.map(({ path }) => path))]);

        return {
          sideOne: { ...sideOne, tracks: sideOne.tracks.map((track, i) => ({ ...track, sound: sideOneTracks[i] })) },
          sideTwo: { ...sideTwo, tracks: sideTwo.tracks.map((track, i) => ({ ...track, sound: sideTwoTracks[i] })) },
        }
      }));
      console.log(records);
      setRecords(records);
      setRecordPositions(records.map(() => VinylRecordPosition.Home));
      setRecordRotations(records.map(() => VinylRecordRotation.SideOne));
      setPercent(100);
    };

    loadRecordsTracks();
  }, [recordsInfo, setPercent]); */

  const { raycaster, camera, pointer, scene } = useThree();

  // const { enabled, setEnabled } = useContext(ControlsContext);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>, i: number) => {
    e.target.setPointerCapture(e.pointerId);
    const newRecordPositions = [...recordPositions];
    newRecordPositions[i] = VinylRecordPosition.Home;
    setRecordPositions(newRecordPositions)
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>, i: number) => {
    e.target.releasePointerCapture(e.pointerId);

    const recordWorldPos = new THREE.Vector3();
    const playerWorldPos = new THREE.Vector3();
    e.eventObject.getWorldPosition(recordWorldPos);
    slipmatRef.current.getWorldPosition(playerWorldPos);

    if (turntableArea.containsPoint(recordWorldPos)) {
      const newRecordPositions = [...recordPositions.map(() => VinylRecordPosition.Home)];
      newRecordPositions[i] = VinylRecordPosition.Turntable;
      setRecordPositions(newRecordPositions)
      // slipmatRef.current.attach(e.eventObject);
      // setCurrentTrackList(records[i][recordRotations[i] === VinylRecordRotation.SideOne ? 'sideOne' : 'sideTwo'].tracks);
    } else {
      const newRecordPositions = [...recordPositions];
      newRecordPositions[i] = VinylRecordPosition.Home;
      setRecordPositions(newRecordPositions);
      // setCurrentTrackList([]);
      // shelfRef.current.attach(e.eventObject);
    }
  };

  useEffect(() => {
    const currentRecordIndex = recordPositions.indexOf(VinylRecordPosition.Turntable);

    if (currentRecordIndex !== -1) {
      setCurrentTrackList(records[currentRecordIndex]?.[recordRotations[currentRecordIndex] === VinylRecordRotation.SideOne ? 'sideOne' : 'sideTwo']?.tracks || []);
    } else {
      setCurrentTrackList([]);
    }
  }, [recordPositions, recordRotations, records]);

  return (
    <>
      <group ref={shelfRef}>
        {records.map((record, i) => {
          const uuid = `record-${i}`;

          return (
            <Suspense key={uuid} fallback={<group />}>
              <VinylRecord
                uuid={uuid}
                record={record}
                onPointerUp={(e) => handlePointerUp(e, i)}
                onPointerDown={(e) => handlePointerDown(e, i)}
                ref={ref => {
                  recordsRef.current[i] = ref;
                }}
                parent={recordPositions[i] === VinylRecordPosition.Home ? shelfRef : slipmatRef}
                position={recordPositions[i] === VinylRecordPosition.Home ? [-0.32 + (0.32 * i), 0.004, -0.42] : [0, 0, 0]}
                rotation={recordRotations[i]}
                /* onClick={(e) => {
                  e.stopPropagation();
                  console.log(e);
                  setFocusedObjectUuid(e.eventObject.uuid);
                  bounds.refresh(e.eventObject).clip().fit();
                }} */
                onClick={(() => {
                  const newRecordRotations = [...recordRotations];
                  newRecordRotations[i] = newRecordRotations[i] === VinylRecordRotation.SideOne ? VinylRecordRotation.SideTwo : VinylRecordRotation.SideOne;
                  setRecordRotations(newRecordRotations);
                  if (recordPositions[i] === VinylRecordPosition.Turntable) {
                    setCurrentTrackList(records[i][newRecordRotations[i] === VinylRecordRotation.SideOne ? 'sideOne' : 'sideTwo'].tracks);
                  }
                })}
              />
            </Suspense>
          )
        })}
      </group>

      <Turntable
        ref={turntableRef}
        slipmatRef={slipmatRef}
        trackList={currentTrackList}
      />
    </>
  );
}
