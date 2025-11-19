import React, { useState } from "react";

interface Props {
    onRefresh?: () => void; // optional callback to trigger data fetching
}

export function PanelStatus({ onRefresh }: Props) {
    const [timestamp, setTimestamp] = useState<Date>(new Date());

    const handleRefresh = () => {
        setTimestamp(new Date());
        onRefresh?.(); // call parent update function if provided
    };

    return (
        <div className="admin-panel-status">
            <p>
                Senest opdateret:{" "}
                <strong>{timestamp.toLocaleString("da-DK")}</strong>
            </p>
            <button className="ui-button secondary" onClick={handleRefresh}>
                Opdater data
            </button>
        </div>
    );
}
