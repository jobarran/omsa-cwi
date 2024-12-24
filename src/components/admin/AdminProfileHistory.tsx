"use client";

import { User } from "@/interfaces";
import { Record } from "@/interfaces/record.interface";
import RecordList from "../record/RecordList";
import { usePagination } from "@/hooks/usePagination";
import { Pagination } from "..";

interface Props {
    records: Record[]
}

export const AdminProfileHistory = ({ records }: Props) => {

    const { currentPage, totalPages, displayedItems, handlePageChange } = usePagination(records, 7);

    return (
        <>
            <RecordList records={displayedItems} fullData={false} />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

        </>
    );
};
