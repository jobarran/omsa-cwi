"use client";

import { AdminEditableField, ToolEditableField } from '@/types';
import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaSave, FaPen } from 'react-icons/fa';
import { es } from 'date-fns/locale'; // Import Spanish locale
import { createLocalDate } from '@/utils';

interface Props {
    label: string;
    currentValue: string;
    handleChange: (field: AdminEditableField, value: string) => void;
    editableFields: { [key in AdminEditableField]: boolean };
    handleSaveClick: (field: AdminEditableField) => void;
    handleEditClick: (field: AdminEditableField) => void;
}

export const AdminPickerInput = ({ currentValue, editableFields, handleChange, handleSaveClick, handleEditClick, label }: Props) => {

    return (
        <div className="w-full">
            <label className="block text-gray-700">{label}</label>
            <div className="relative flex w-full">
                <DatePicker
                    selected={currentValue ? createLocalDate(currentValue) : null}
                    onChange={(date) => handleChange('entryDate', date ? date.toISOString().split('T')[0] : '')}
                    dateFormat="yyyy-MM-dd"
                    disabled={!editableFields.entryDate}
                    className={`border p-2 h-11 rounded pr-56 md:pr-12 w-full  ${!editableFields.entryDate ? "bg-gray-100" : ""}`}
                    locale={es}
                />

                <button
                    type="button"
                    onClick={() => (editableFields.entryDate ? handleSaveClick('entryDate') : handleEditClick('entryDate'))}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sky-800"
                >
                    {editableFields.entryDate ? <FaSave /> : <FaPen />}
                </button>
            </div>
        </div>
    );
};

