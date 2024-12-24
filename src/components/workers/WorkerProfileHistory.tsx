"use client";

import { Record } from "@/interfaces/record.interface";
import RecordList from "../record/RecordList";

interface Props {
    records: Record[]
}

export const WorkerProfileHistory = ({ records }: Props) => {

    return (
        <RecordList records={records} />
    );
};
