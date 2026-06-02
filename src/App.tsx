import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { createContext, useRef, useState, type Ref } from "react";
import { Bounds, CameraControls, OrbitControls, useBounds, useGLTF } from '@react-three/drei'
import './App.css';
import type { Track, TrackInfo } from "./Player";
import { Vector3, type Object3D } from "three";

const ControlsContext = createContext<{ enabled: boolean, setEnabled: (enabled: boolean) => void }>(null);

export { ControlsContext };

export function ControlsProvider({ children }) {
  const [enabled, setEnabled] = useState(true);

  return (
    <ControlsContext value={{ enabled, setEnabled }}>
      <OrbitControls makeDefault enabled={enabled} />
      {children}
    </ControlsContext>
  );
}

const FocusContext = createContext<{ focus: Object3D, setFocus: (enabled: Object3D) => void }>(null);

export { FocusContext };

export function FocusProvider({ children }) {
  const [focus, setFocus] = useState<Object3D>(null);

  const bounds = useBounds();

  const handleFocus = (object: Object3D) => {
    if (focus === object) {
      return;
    }

    // bounds.refresh(object).clip().fit();
    setFocus(object);
  }

  return (
    <FocusContext value={{ focus, setFocus: handleFocus }}>
      {children}
    </FocusContext>
  );
}

const TrackInfoPanelContext = createContext<{ track: TrackInfo, setTrack: (track: TrackInfo) => void }>(null);

export { TrackInfoPanelContext };

export function TrackInfoPanelProvider({ children }) {
  const [track, setTrack] = useState<TrackInfo | null>(null);
  const prevTrack = useRef<TrackInfo | null>(null);

  const handleSetTrack = (track: TrackInfo | null) => {
    setTrack(track);
    if (track) {
      prevTrack.current = track;
    }
  }

  /* const track = {
    "name": "Come Together",
    "author": "The Beatles",
    "description": "description",
    "path": "./sideOne/01 Come Together.mp3"
  } */

  const displayTrack = track || prevTrack.current;

  return (
    <>
      <TrackInfoPanelContext value={{ track, setTrack: handleSetTrack }}>
        {children}
        <>
          <div className="player-hud" style={{ opacity: track ? 1 : 0 }}>
            <div className="hud-header">
              <svg className="icon-play-mini" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>NOW PLAYING</span>
            </div>

            <div className="track-meta">
              <h1 className="track-title">{displayTrack?.name}</h1>
              <h2 className="track-artist">{displayTrack?.author}</h2>
            </div>

            {!!displayTrack?.description && (
              <p className="track-description">
                {displayTrack?.description}
              </p>
            )}

          </div>
          {/* <div className="track-info-panel">
            <div className="track-info">
              <div className="track-name">{track?.name}</div>
              <div className="artist">{track?.author}</div>
              <div className="track-description">{track?.description}</div>
            </div>
          </div> */}
        </>
      </TrackInfoPanelContext>
    </>
  );
}

export default function App() {
  return (
    <>
      <TrackInfoPanelProvider>
        <Canvas gl={{ antialias: true }} dpr={[1, 1]} gl={{ powerPreference: "low-power" }}  >
          <ControlsProvider>
            <Scene />
          </ControlsProvider>
        </Canvas>
      </TrackInfoPanelProvider>
    </>
  );
}
