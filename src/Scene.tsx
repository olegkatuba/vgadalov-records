import { Bounds, CameraControls, DragControls, Edges, Environment, Float, GizmoHelper, GizmoViewport, Grid, OrbitControls, Outlines, PerspectiveCamera, PivotControls, Sky, Stage, Stats, Svg, TransformControls } from "@react-three/drei";
import { memo, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Group, Object3D, Sphere, Vector3, type Mesh, type PerspectiveCamera as PerspectiveCameraType } from "three";
import PLayer, { type RecordInfo, type Record } from "./Player";
import { Cover } from "./Cover";
import { RECORDS } from "./records";
import { LoadingContext } from "./LoadingContext";
import { Table } from "./Table";
import { Shelf } from "./Shelf";
import { Carpet } from "./Carptet";

const fallbackTrack = new Howl({
  src: ['./vinyl.mp3'],
  // html5: true,
  preload: true,
});

const loadTracks = (paths: string[]) => {
  const promises = paths.map((name) =>
    new Promise<Howl>((res, rej) => {
      const track = new Howl({
        src: [name],
        // html5: true,
        preload: true,
        onload: () => {
          res(track);
        },
        onloaderror: (id, error) => {
          console.error(name, error);
          // rej(error);
          res(fallbackTrack);
        }
      });
    })
  );

  return Promise.all(promises);
};

function Scene() {
  const cameraRef = useRef<PerspectiveCameraType>(null);

  const [coverOpened, setCoverOpened] = useState(false);
  const [records, setRecords] = useState<Record[]>([]);

  const { setPercent } = useContext(LoadingContext);

  useEffect(() => {
    const loadRecordsTracks = async () => {
      const records = await Promise.all(RECORDS.map<Promise<Record>>(async ({ sideOne, sideTwo }) => {
        const [sideOneTracks, sideTwoTracks] = await Promise.all([loadTracks(sideOne.tracks.map(({ path }) => path)), loadTracks(sideTwo.tracks.map(({ path }) => path))]);

        return {
          sideOne: { ...sideOne, tracks: sideOne.tracks.map((track, i) => ({ ...track, sound: sideOneTracks[i] })) },
          sideTwo: { ...sideTwo, tracks: sideTwo.tracks.map((track, i) => ({ ...track, sound: sideTwoTracks[i] })) },
        }
      }));
      console.log(records);
      setRecords(records);
      setPercent(100);
    };

    loadRecordsTracks();

    return () => {
      console.log('unmount');
    }
  }, [setPercent]);

  const handleOnOpened = useCallback(() => {
    setCoverOpened(true);
  }, []);

  return (
    <>

      {/* <Bounds fit clip observe margin={1.5}> */}
      {/* <Table position={[0, 0, 0]} /> */}
      {/* </Bounds> */}

      <group>
        <Cover position={[0, 0.15, -0.6]} onOpened={handleOnOpened} />
        <PLayer position={[0, 0, 1]} records={coverOpened ? records : []} />
        <Table />
        <Shelf position={[0, -0.01, -0.41]} />
        <Carpet />
      </group>
      {/* <Stage intensity={0.1} shadows="contact" environment="warehouse" /> */}

      <Environment
        // preset="studio"
        files="./studio_small_03_1k.hdr"
        background={false}
        // backgroundBlurriness={0} // optional blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
        backgroundIntensity={1} // optional intensity factor (default: 1, only works with three 0.163 and up)
        backgroundRotation={[0, Math.PI / 4, 0]} // optional rotation (default: 0, only works with three 0.163 and up)
        environmentIntensity={0.8} // optional intensity factor (default: 1, only works with three 0.163 and up)
        environmentRotation={[0, Math.PI / 4, 0]} // optional rotation (default: 0, only works with three 0.163 and up)
      />


      <PerspectiveCamera
        fov={50}
        makeDefault
        position={[0, 0.4, 0.8]}
        ref={cameraRef}
        near={0.001}
        far={10}
      />
      {/* <ambientLight intensity={2} /> */}

      {/* <Stats /> */}
      {/* <CameraControls camera={camera} /> */}
      {/* <OrbitControls /> */}
      {/* <GizmoHelper
        alignment="bottom-right" // widget alignment within scene
        margin={[80, 80]} // widget margins (X, Y)
      >
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="white" />
      </GizmoHelper> */}

    </>
  );
}

export default memo(Scene);