"use client";

import { runSeed } from "@/actions/seed/run-seed";


export const RunSeedButton = () => {
    const handleRunSeed = () => {
        runSeed()
    }

    return (
        <button onClick={handleRunSeed}>
            RUN SEED
        </button>
    );
};
