"use client";

import { User } from "@/interfaces";
import { Record } from "@/interfaces/record.interface";
import RecordList from "../record/RecordList";

interface Props {
    records: Record[]
}

export const AdminProfileHistory = ({ records }: Props) => {

    return (
        <RecordList records={records} />
    );
};
