import { createContext, useState } from "react";
import { OrbitControls, useBounds } from '@react-three/drei'
import type { Object3D } from "three";

const FocusContext = createContext<{ focus: Object3D, setFocus: (enabled: Object3D) => void }>({ focus: null, setFocus: () => { } });

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