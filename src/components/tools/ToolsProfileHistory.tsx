"use client";

import { Tool } from "@/interfaces/tool.interface";
import RecordList from "../record/RecordList";
import { Record } from "@/interfaces/record.interface";

interface Props {
    records: Record[]
}

export const ToolsProfileHistory = ({ records }: Props) => {

    return (
        <RecordList records={records} />
    );
};