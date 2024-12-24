"use client";

import { Tool } from "@/interfaces/tool.interface";
import RecordList from "../record/RecordList";
import { Record } from "@/interfaces/record.interface";
import { usePagination } from "@/hooks/usePagination";
import { Pagination } from "..";

interface Props {
    records: Record[]
}

export const ToolsProfileHistory = ({ records }: Props) => {

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
