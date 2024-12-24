import { useState } from "react";
import { RecordObject, RecordType } from "@prisma/client";
import { Record } from "@/interfaces/record.interface";

export const useRecordFilter = (records: Record[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedObject, setSelectedObject] = useState<RecordObject | "">("");
  const [selectedType, setSelectedType] = useState<RecordType | "">("");

  const handleSearch = (term: string) => setSearchTerm(term);

  const resetSearchTerm = () => setSearchTerm("");

  const filteredRecords = records.filter((record) => {
    const matchesSearch = record.recordTargetName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesObject =
      selectedObject === "" || record.recordObject === selectedObject;
    const matchesType = selectedType === "" || record.type === selectedType;

    return matchesSearch && matchesObject && matchesType;
  });

  return {
    searchTerm,
    setSearchTerm,
    selectedObject,
    setSelectedObject,
    selectedType,
    setSelectedType,
    handleSearch,
    resetSearchTerm,
    filteredRecords,
  };
};
