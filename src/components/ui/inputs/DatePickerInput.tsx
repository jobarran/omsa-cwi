"use client";

import { ToolEditableField } from '@/types';
import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaSave, FaPen } from 'react-icons/fa';

interface Props {
    label: string;
    currentValue: string;
    handleChange: (field: ToolEditableField, value: string) => void;
    editableFields: { [key in ToolEditableField]: boolean };
    handleSaveClick: (field: ToolEditableField) => void;
    handleEditClick: (field: ToolEditableField) => void;
}

export const DatePickerInput = ({ currentValue, editableFields, handleChange, handleSaveClick, handleEditClick }: Props) => {
    return (
        <div className="w-full">
            <label className="block text-gray-700">Fecha de compra</label>
            <div className="relative flex w-full">
                <DatePicker
                    selected={currentValue ? new Date(currentValue) : null}
                    onChange={(date) => handleChange('boughtAt', date ? date.toISOString().split('T')[0] : '')}
                    dateFormat="yyyy-MM-dd"
                    disabled={!editableFields.boughtAt}
                    className={`border p-2 h-11 rounded pr-56 md:pr-12 w-full ${!editableFields.boughtAt ? "bg-gray-100 cursor-not-allowed" : ""}`}
                />
                <button
                    type="button"
                    onClick={() => (editableFields.boughtAt ? handleSaveClick('boughtAt') : handleEditClick('boughtAt'))}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sky-800"
                >
                    {editableFields.boughtAt ? <FaSave /> : <FaPen />}
                </button>
            </div>
        </div>
    );
};

