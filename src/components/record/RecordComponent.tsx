"use client";

import { Record } from "@/interfaces/record.interface";
import RecordList from "./RecordList";
import { useRecordFilter } from "@/hooks/useRecordFilter";
import { RecordFilter } from "./RecordFilter";
import { Pagination } from "../ui/table/Pagination";
import { usePagination } from "@/hooks/usePagination";

interface Props {
  records: Record[];
}

export const RecordComponent = ({ records }: Props) => {

  const {
    searchTerm,
    setSearchTerm,
    handleSearch,
    resetSearchTerm,
    selectedObject,
    setSelectedObject,
    selectedType,
    setSelectedType,
    filteredRecords,
  } = useRecordFilter(records);

  const { currentPage, totalPages, displayedItems, handlePageChange } = usePagination(filteredRecords, 10);

  return (
    <div className="w-full">
      {/* Filters */}
      <RecordFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        resetSearchTerm={resetSearchTerm}
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      {/* Filtered Record List */}
      <RecordList records={displayedItems} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

    </div>
  );
};
