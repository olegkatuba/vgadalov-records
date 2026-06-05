import { createContext, useCallback, useRef, useState } from "react";
import type { TrackInfo } from "./Player";

const TrackInfoPanelContext = createContext<{ track: TrackInfo, setTrack: (track: TrackInfo) => void }>(null);

export { TrackInfoPanelContext };

export function TrackInfoPanelProvider({ children }) {
    const [track, setTrack] = useState<TrackInfo | null>(null);
    const prevTrack = useRef<TrackInfo | null>(null);

    const handleSetTrack = useCallback((track: TrackInfo | null) => {
        setTrack(track);
        if (track) {
            prevTrack.current = track;
        }
    }, []);

    /* const track = {
      "name": "Come Together",
      "author": "The Beatles",
      "description": "description",
      "path": "./sideOne/01 Come Together.mp3"
    } */

    const handlePrevTrack = useCallback(() => {
        window.dispatchEvent(new CustomEvent('player-prev-track'));
    }, []);

    const handlePlayTrack = useCallback(() => {
        window.dispatchEvent(new CustomEvent('player-play'));
    }, []);

    const handlePauseTrack = useCallback(() => {
        window.dispatchEvent(new CustomEvent('player-pause'));
    }, []);

    const handleNextTrack = useCallback(() => {
        window.dispatchEvent(new CustomEvent('player-next-track'));
    }, []);

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

                        <div className="player-controls">
                            <button className="control-btn" onClick={handlePrevTrack}>
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
                            </button>
                            {/* <button className="control-btn main-btn">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                            </button> */}
                            <button className="control-btn" onClick={handleNextTrack}>
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6z" /></svg>
                            </button>
                        </div>

                        {!!displayTrack?.description && (
                            <p className="track-description">
                                {displayTrack?.description}
                            </p>
                        )}

                    </div>
                </>
            </TrackInfoPanelContext>
        </>
    );
}