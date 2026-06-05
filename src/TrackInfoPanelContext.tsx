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