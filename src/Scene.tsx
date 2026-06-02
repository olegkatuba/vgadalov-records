import { Bounds, CameraControls, DragControls, Edges, Environment, Float, GizmoHelper, GizmoViewport, Grid, OrbitControls, Outlines, PerspectiveCamera, PivotControls, Sky, Stage, Stats, Svg, TransformControls } from "@react-three/drei";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Selection, Select, EffectComposer, Bloom } from '@react-three/postprocessing';
import { VinylRecord } from "./VinylRecord";
import { useContext, useEffect, useRef, useState } from "react";
import { Turntable } from "./Turntable";
import { Group, Object3D, Sphere, Vector3, type Mesh, type PerspectiveCamera as PerspectiveCameraType } from "three";
import { ControlsContext, FocusContext, FocusProvider } from "./App";
import PLayer, { type RecordInfo } from "./Player";
import { Cover } from "./Cover";
import { records } from "./records";

export function Table() {
  const [coverOpened, setCoverOpened] = useState(false);

  const coverRef = useRef<Object3D>(null);

  const { setFocus } = useContext(FocusContext);

  const handleCoverClick = (e: ThreeEvent<MouseEvent>) => {
    if (coverOpened) {
      setFocus(e.eventObject);
    }
  }

  return (
    <>
      <Cover ref={coverRef} position={[0, 0.15, -0.6]} onOpened={() => { setCoverOpened(true) }} onClick={handleCoverClick} opened={coverOpened} />
      {coverOpened && <PLayer position={[0, 0, 1]} recordsInfo={records} />}
    </>
  )
}

export default function Scene() {

  const cameraRef = useRef<PerspectiveCameraType>(null);

  /* useFrame(() => {
    console.log(cameraRef.current);
  }); */

  /* useEffect(() => {
    cameraRef.current.lookAt(0, 0, 1);
  }, []); */

  return (
    <>

      {/* <Bounds fit clip observe margin={1.5}> */}
      <FocusProvider>
        <Table />
      </FocusProvider>
      {/* </Bounds> */}

      {/* <Stage intensity={0.1} shadows="contact" environment="warehouse" > */}
      <Environment preset="sunset" />
      <PerspectiveCamera
        fov={50}
        makeDefault
        position={[-0.031145156755629913, 0.10140129394866952, 0.15929664219819167]}
        ref={cameraRef}
        near={0.001}
        far={10}
      >
        {/* <directionalLight intensity={2} /> */}
      </PerspectiveCamera>
      <ambientLight intensity={2} />

      <Stats />
      {/* <CameraControls camera={camera} /> */}
      {/* <OrbitControls /> */}
      <GizmoHelper
        alignment="bottom-right" // widget alignment within scene
        margin={[80, 80]} // widget margins (X, Y)
      >
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="white" />
      </GizmoHelper>

    </>
  );
}
