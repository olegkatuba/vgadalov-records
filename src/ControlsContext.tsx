import { createContext, useState } from "react";
import { OrbitControls } from '@react-three/drei'

const ControlsContext = createContext<{ enabled: boolean, setEnabled: (enabled: boolean) => void }>({ enabled: false, setEnabled: () => { } });

function ControlsProvider({ children }) {
    const [enabled, setEnabled] = useState(true);

    return (
        <ControlsContext.Provider value={{ enabled, setEnabled }}>
            <OrbitControls
                makeDefault
                enabled={enabled}
                minDistance={0.3}
                maxDistance={1}
            />
            {children}
        </ControlsContext.Provider>
    );
}

export { ControlsContext, ControlsProvider };