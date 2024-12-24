"use client";

import { Record } from "@/interfaces/record.interface";
import { RecordObject, RecordType } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { getTitleAndDetail } from "@/utils/getTitleAndDetail"; // Assuming this function is exported from a utility file

interface Props {
  records: Record[];
  fullData: boolean
}

const RecordList = ({ records, fullData }: Props) => {

  console.log(records)

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

          const displayTitle = fullData
            ? title
            : title.split(" ")[1] || ""; // Take the second word if not fullData

          const sectionLink =
            record.recordObject === "USER" ? "admin" :
              record.recordObject === "WORKER" ? "workers" :
                record.recordObject === "TOOL" ? "tools" :
                  record.recordObject === "PROJECT" ? "projects" :
                    null;

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
              <div className="flex flex-col gap-1 md:gap-2">
                {record.user && (
                  <div className="flex flex-row justify-between">
                    <p className="text-xs md:text-sm font-semibold whitespace-nowrap">
                      {displayTitle} 
                    </p>
                    <div className="flex flex-row space-x-1">
                      <p className="hidden md:inline text-sm text-gray-500">
                        {record.user.name} {record.user.lastName}
                      </p>
                      <p className="text-xs md:hidden text-gray-500">
                        {record.user.name[0]} {record.user.lastName}
                      </p>
                      <p className="italic text-xs md:text-sm text-gray-500 inline">-</p>
                      <p className="italic text-xs md:text-sm text-gray-500">
                        {new Date(record.createdAt).toLocaleDateString("es-ES")}
                      </p>
                    </div>
                  </div>
                )}
                <div className="flex items-center md:space-x-1">
                  <p className="hidden md:block text-sm text-gray-600">{detail.firstText}</p>
                  <Link
                    href={`/${sectionLink}/${record.recordTargetId}`}
                  >
                    <p className="text-xs md:text-sm text-blue-500 hover:text-blue-700 font-medium ">
                      {detail.name}
                    </p>
                  </Link>
                  <p className="text-xs md:text-sm px-1 md:px-0 text-gray-600">{detail.secondText}</p>
                  <Link
                    href={`/${sectionLink}/${record.recordTargetId}`}
                  >
                    <p className="text-xs md:text-sm text-blue-500 hover:text-blue-700 font-medium ">
                      {detail.code}
                    </p>
                  </Link>
                  <p className="text-xs md:text-sm px-1 md:px-0 text-gray-600">{detail.thirdText}</p>
                  <p className="text-xs md:text-sm px-1 md:px-0 text-blue-500">{detail.details}</p>
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
