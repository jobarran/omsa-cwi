"use client";

import { useState } from "react";
import { Safety, SafetyRecordInput } from "@/interfaces/safety.interface";
import { SafetyRecords } from "@/types";
import { SafetyRecordForm, SafetyRecordList } from "..";
import { createSafetyRecords } from "@/actions";
import { useRouter } from "next/navigation";

interface Props {
    safety: Safety;
}

export const SafetyRecordsComponent = ({ safety }: Props) => {
    const router = useRouter();

    const [formData, setFormData] = useState<SafetyRecordInput>({
        name: "",
        required: false,
        expirationDate: "",
        documentationLink: "",
    });

    const [records, setRecords] = useState<SafetyRecordInput[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const { checked } = e.target as HTMLInputElement;
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleAddSafetyRecord = () => {
        setRecords((prev) => [...prev, { ...formData, id: Date.now().toString() }]);
        setFormData({
            name: "",
            required: false,
            expirationDate: "",
            documentationLink: "",
        });
    };

    const handleRemoveRecord = (name: string) => {
        setRecords((prev) => prev.filter((record) => record.name !== name));
    };

    const handleSaveRecords = async () => {
        try {
            setLoading(true);
            setError(null);

            await createSafetyRecords({
                safetyId: safety.id,
                records: records,
            });

            setRecords([]);
        } catch (error) {
            setError("Failed to save records. Please try again.");
        } finally {
            setLoading(false);
        }
        router.replace(`/safety`);
    };

    return (
        <div className="w-full mt-4 space-y-6">
            <SafetyRecordForm
                formData={formData}
                handleChange={handleChange}
                loading={loading}
                handleAddSafetyRecord={handleAddSafetyRecord}
                error={error}
            />
            <SafetyRecordList records={records} handleRemoveRecord={handleRemoveRecord} />
            <button
                onClick={handleSaveRecords}
                disabled={loading || records.length === 0}
                className={`w-full p-2 mt-4 bg-sky-800 hover:bg-sky-900 transition text-white rounded ${loading ? "opacity-50" : ""}`}
            >
                {loading ? "Guardando..." : "Guardar"}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
};