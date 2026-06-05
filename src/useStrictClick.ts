import type { ThreeEvent } from '@react-three/fiber';
import { useRef } from 'react'
import * as THREE from 'three'

export function useStrictClick(callback?: (e: ThreeEvent<MouseEvent>) => void, maxDistance: number = 0.05, maxTime: number = 300) {
    const downTime = useRef(0)
    const downPoint = useRef(new THREE.Vector3())

    return {
        onPointerDown: (e) => {
            downTime.current = performance.now()
            downPoint.current.copy(e.point)
        },
        onPointerUp: (e) => {
            const duration = performance.now() - downTime.current
            const distance = downPoint.current.distanceTo(e.point)

            // Проверяем условия: не слишком долго и не слишком далеко
            if (duration < maxTime && distance < maxDistance) {
                callback?.(e)
            }
        }
    }
}