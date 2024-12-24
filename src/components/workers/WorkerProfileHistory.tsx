"use client";

import { Record } from "@/interfaces/record.interface";
import RecordList from "../record/RecordList";
import { Pagination } from "..";
import { usePagination } from "@/hooks/usePagination";

interface Props {
    records: Record[]
}

export const WorkerProfileHistory = ({ records }: Props) => {

    const { currentPage, totalPages, displayedItems, handlePageChange } = usePagination(records, 7);

    return (
        <>
            <RecordList records={displayedItems} />

            {/* Conditionally render pagination */}
            {displayedItems.length > 7 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
};
