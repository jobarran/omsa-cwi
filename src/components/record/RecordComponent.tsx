"use client";

import { Record } from "@/interfaces/record.interface";
import RecordList from "./RecordList";
import { useRecordFilter } from "@/hooks/useRecordFilter";
import { RecordFilter } from "./RecordFilter";

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
      <RecordList records={filteredRecords} />
    </div>
  );
};
