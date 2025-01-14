"use client";

import { $Enums, Company } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface Props {

}

interface Props {
    selectedCompany: Company;
    setSelectedCompany: Dispatch<SetStateAction<$Enums.Company>>
}

export const SafetyRecordCompanySelectionButton = ({ selectedCompany, setSelectedCompany }: Props) => {



    return (
        <div className="flex flex-row mb-4 w-full space-x-2">
            <button
                onClick={() => setSelectedCompany("CWI")}
                className={`w-full py-2  border rounded-lg ${selectedCompany === "CWI" ? "bg-sky-800 text-white" : "bg-white text-sky-800 hover:bg-sky-800 hover:text-white transition"}`}
            >
                CWI
            </button>
            <button
                onClick={() => setSelectedCompany("OMSA")}
                className={`w-full py-2 border rounded-lg ${selectedCompany === "OMSA" ? "bg-sky-800 text-white" : "bg-white text-sky-800 hover:bg-sky-800 hover:text-white transition"}`}
            >
                OMSA
            </button>
        </div>

    )
}