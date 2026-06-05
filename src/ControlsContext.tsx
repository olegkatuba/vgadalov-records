import { createContext, useRef, useState, type RefObject } from "react";
import { CameraControls, CameraControlsImpl, OrbitControls } from '@react-three/drei'

const ControlsContext = createContext<{ enabled: boolean, controls: RefObject<CameraControlsImpl>, setEnabled: (enabled: boolean) => void }>({
    enabled: false,
    controls: null,
    setEnabled: () => { }
});

function ControlsProvider({ children }) {
    const [enabled, setEnabled] = useState(true);

    const controls = useRef<CameraControls>(null)

    const { ACTION } = CameraControlsImpl;

    return (
        <ControlsContext.Provider value={{ enabled, controls, setEnabled }}>
            <CameraControls
                ref={controls}
                enabled={enabled}
                makeDefault
                mouseButtons={{
                    left: ACTION.ROTATE,
                    middle: ACTION.DOLLY,
                    right: ACTION.TRUCK,
                    wheel: ACTION.DOLLY,
                }}
                touches={{
                    one: ACTION.TOUCH_ROTATE,
                    two: ACTION.TOUCH_DOLLY,
                    three: ACTION.TOUCH_DOLLY_TRUCK,
                }}
                dollySpeed={2}
                truckSpeed={2}
                minDistance={0.2}
                maxDistance={1}
                maxZoom={5}
                minZoom={1}
            />
            {children}
        </ControlsContext.Provider>
    );
}

export { ControlsContext, ControlsProvider };