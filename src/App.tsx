import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { TrackInfoPanelProvider } from "./TrackInfoPanelContext";
import { ControlsProvider } from "./ControlsContext";
import './App.css';

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
