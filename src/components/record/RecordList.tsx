"use client";

import { Record } from "@/interfaces/record.interface";
import { RecordObject, RecordType } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { getTitleAndDetail } from "@/utils/getTitleAndDetail"; // Assuming this function is exported from a utility file

interface Props {
  records: Record[];
}

const RecordList = ({ records }: Props) => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <div className="text-center py-10">Loading records...</div>;
  }

  if (!records.length) {
    return (
      <div className="text-center py-10 text-gray-500">No records available.</div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        {records.map((record) => {
          const { title, detail } = getTitleAndDetail(record); // Get title and detail for each record

          const leftBorderColor = {
            [RecordObject.TOOL]: "border-l-blue-500",
            [RecordObject.USER]: "border-l-green-500",
            [RecordObject.PROJECT]: "border-l-yellow-500",
            [RecordObject.WORKER]: "border-l-purple-500",
          }[record.recordObject] || "border-l-gray-200";

          return (
            <div
              key={record.id}
              className={`bg-white rounded-lg p-3 border border-l-8 ${leftBorderColor}`}
            >
              <div className="flex flex-col gap-2">
                {record.user && (
                  <div className="flex flex-col md:flex-row md:space-x-2">
                    <p className="text-xs md:text-sm font-semibold whitespace-nowrap">
                      {title} {/* Render title */}
                    </p>
                    <div className="flex flex-row space-x-2">
                      <p className="text-xs md:text-sm text-gray-500">
                        {record.user.name} {record.user.lastName}
                      </p>
                      <p className="italic text-xs md:text-sm text-gray-500 hidden md:inline">-</p>
                      <p className="italic text-xs md:text-sm text-gray-500">
                        {new Date(record.createdAt).toLocaleDateString("es-ES")}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <p className="text-xs md:text-sm text-gray-600">{detail.firstText}</p>
                  <Link
                    href={`/tools/${record.recordTargetId}`}
                  >
                    <p className="text-xs md:text-sm text-blue-500 hover:text-blue-700 font-medium ">
                      {detail.name}
                    </p>
                  </Link>
                  <p className="text-xs md:text-sm text-gray-600">{detail.secondText}</p>
                  <Link
                    href={`/tools/${record.recordTargetId}`}
                  >
                    <p className="text-xs md:text-sm text-blue-500 hover:text-blue-700 font-medium ">
                      {detail.code}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecordList;
