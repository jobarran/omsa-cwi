import { getExpirationState } from "@/utils";
import React from "react";

interface ExpirationBulletProps {
    expirationDate: Date | null | undefined;
}

export const SafetyExpirationBullet: React.FC<ExpirationBulletProps> = ({ expirationDate }) => {
    
    const { color } = getExpirationState(expirationDate);

    return (
        <div
            className={`rounded-full h-3 w-3 mx-2`}
            style={{
                backgroundColor: color,
            }}
        ></div>
    );
};
