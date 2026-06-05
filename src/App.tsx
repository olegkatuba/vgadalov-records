import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { TrackInfoPanelProvider } from "./TrackInfoPanelContext";
import { ControlsProvider } from "./ControlsContext";
import './App.css';
import { LoadingProvider } from "./LoadingContext";

export default function App() {
  return (
    <>
      <TrackInfoPanelProvider>
        <LoadingProvider>
          <Canvas gl={{ antialias: true, powerPreference: "low-power" }} dpr={[1, 1]} >
            <ControlsProvider>
              <Scene />
            </ControlsProvider>
          </Canvas>
        </LoadingProvider>
      </TrackInfoPanelProvider >
    </>
  );
}
