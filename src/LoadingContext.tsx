import React, { useState, useEffect, createContext } from 'react'
import { Canvas } from '@react-three/fiber'
import { useProgress } from '@react-three/drei'
import './Loading.css';

const LoadingContext = createContext<{ setPercent: (percent: number) => void }>({ setPercent: () => { } });

function LoadingProvider({ children }) {
    const [percent, setPercent] = useState(0)

    // useProgress — хук из drei, который следит за 3D моделями и текстурами
    const { active: threeLoadingActive, progress: threeProgress } = useProgress()

    // Общий статус загрузки: и 3D-сцена (Three), и музыка (Audio) должны быть готовы
    const isEverythingLoaded = percent >= 100// && !threeLoadingActive;

    return (
        <LoadingContext value={{ setPercent }}>

            <>

                {/* Экран загрузки */}
                <div className={`loader-overlay ${isEverythingLoaded ? 'fade-out' : ''}`}>
                    <div className="vinyl-spinner" style={{ animation: "spin 1s linear infinite" }}>
                        <div className="vinyl-spinner center" style={{ width: '80px', height: '80px' }} />
                        <div className="vinyl-spinner center" style={{ width: '60px', height: '60px' }} />
                        <div className="vinyl-spinner center" style={{ width: '40px', height: '40px' }} />
                        <div className="vinyl-spinner center" style={{ width: '20px', height: '20px' }} />
                    </div>
                    <div className="loader-text">LOADING...</div>
                    {/* <div className="loader-progress">
                        {!audioLoaded
                            ? `Загрузка аудио: ${percent}`
                            : `Загрузка 3D сцены: ${Math.round(threeProgress)}%`
                        }
                    </div> */}
                </div>
                {children}
            </>
        </LoadingContext>
    )
}

export { LoadingContext, LoadingProvider };
