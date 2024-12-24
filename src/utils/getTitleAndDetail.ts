import { Record } from "@/interfaces/record.interface";
import { RecordObject, RecordType } from "@prisma/client";
import { getFieldTranslation, getToolStateTranslation, toolStateTranslations } from "./toolStateTranslations";
import { getUserStatusTranslation } from ".";

export const getTitleAndDetail = (record: Record) => {
    const titleDetailsMap = {
        // TOOL
        [`${RecordType.CREATED}_${RecordObject.TOOL}`]: {
            title: "HERRAMIENTA CREADA",
            detail: {
                firstText: `Se ha creado la herramienta`,
                name: record.recordTargetName,
                secondText: `id`,
                code: record.recordTargetId,
                link: `/tools/${record.recordTargetId}`,
            },
        },
        [`${RecordType.COMMENT_ADDED}_${RecordObject.TOOL}`]: {
            title: "HERRAMIENTA COMENTADA",
            detail: {
                firstText: `Comentario creado para la herramienta `,
                name: record.recordTargetName,
                secondText: `id`,
                code: record.recordTargetId,
                link: `/tools/${record.recordTargetId}`,
            },
        },
        [`${RecordType.UPDATED}_${RecordObject.TOOL}`]: {
            title: "HERRAMIENTA ACTUALIZADA",
            detail: {
                firstText: `Se ha actualizado la herramienta`,
                name: record.recordTargetName,
                secondText: `código`,
                code: record.recordTargetId,
                thirdText: 'campo',
                details: getFieldTranslation(record.details),
                link: `/tools/${record.recordTargetId}`,
            },
        },
        [`${RecordType.TRANSFERRED}_${RecordObject.TOOL}`]: {
            title: "HERRAMIENTA TRANSFERIDA",
            detail: {
                firstText: `Se ha transferido la herramienta`,
                name: record.recordTargetName,
                secondText: `código`,
                code: record.recordTargetId,
                link: `/tools/${record.recordTargetId}`,
                thirdText: `a la obra`,
                details: record.details
                    ? record.details.split(' ').join(', ')
                    : '',
            },
        },
        [`${RecordType.STATE_CHANGED}_${RecordObject.TOOL}`]: {
            title: "HERRAMIENTA ESTADO",
            detail: {
                firstText: `Cambió el estado de la herramienta`,
                name: record.recordTargetName,
                secondText: `código`,
                code: record.recordTargetId,
                thirdText: `a`,
                details: getToolStateTranslation(record.details),
                link: `/tools/${record.recordTargetId}`,
            },
        },
        // PROJECT
        [`${RecordType.CREATED}_${RecordObject.PROJECT}`]: {
            title: "OBRA CREADA",
            detail: {
                firstText: `Una nueva obra ha sido registrada con el nombre de`,
                name: record.recordTargetName,
                secondText: `id`,
                code: record.recordTargetId,
            },
        },
        [`${RecordType.STATE_CHANGED}_${RecordObject.PROJECT}`]: {
            title: "OBRA ESTADO",
            detail: {
                firstText: `Cambio de estado para la obra`,
                name: record.recordTargetName,
                secondText: `id`,
                code: record.recordTargetId,
            },
        },
        // USER
        [`${RecordType.CREATED}_${RecordObject.USER}`]: {
            title: "USUARIO CREADO",
            detail: {
                firstText: `Un nuevo usuario ha sido registrado con el nombre de `,
                name: record.recordTargetName,
                secondText: `legajo`,
                code: record.recordTargetId,
                link: `/user/${record.recordTargetId}`,
            },
        },
        [`${RecordType.UPDATED}_${RecordObject.USER}`]: {
            title: "USUARIO ACTUALIZADO",
            detail: {
                firstText: `Se ha actualizado al usuario`,
                name: record.recordTargetName,
                secondText: `legajo`,
                code: record.recordTargetId,
                details: record.details,
                link: `/admin/${record.recordTargetId}`,
            },
        },
        [`${RecordType.STATE_CHANGED}_${RecordObject.USER}`]: {
            title: "USUARIO ESTADO",
            detail: {
                firstText: `Cambió el estado del usuario`,
                name: record.recordTargetName,
                secondText: `legajo`,
                code: record.recordTargetId,
                thirdText: 'a',
                details: getUserStatusTranslation(record.details),
                link: `/admin/${record.recordTargetId}`,
            },
        },
        [`${RecordType.TRANSFERRED}_${RecordObject.USER}`]: {
            title: "USUARIO TRANSFERIDO",
            detail: {
                firstText: `Se ha transferido de obra al usuario`,
                name: record.recordTargetName,
                secondText: `legajo`,
                code: record.recordTargetId,
                link: `/admin/${record.recordTargetId}`,
                thirdText: `obras `,
                details: record.details
                    ? record.details.split(' ').join(', ')
                    : 'sin asignar',
            },
        },
        [`${RecordType.PERMISSION_CHANGED}_${RecordObject.USER}`]: {
            title: "USUARIO PERMISOS",
            detail: {
                firstText: `Se han otorgado o quitado permisos al usuario `,
                name: record.recordTargetName,
                secondText: `legajo:`,
                code: record.recordTargetId,
                link: `/admin/${record.recordTargetId}`,
            },
        },

        // WORKER
        [`${RecordType.CREATED}_${RecordObject.WORKER}`]: {
            title: "OPERARIO CREADO",
            detail: {
                firstText: `Un nuevo operario ha sido registrado con el nombre de`,
                name: record.recordTargetName,
                secondText: `legajo`,
                code: record.recordTargetId,
                link: `/workers/${record.recordTargetId}`,
            },
        },
        [`${RecordType.UPDATED}_${RecordObject.WORKER}`]: {
            title: "OPERARIO ACTUALIZADO",
            detail: {
                firstText: `Se ha actualizado al operario`,
                name: record.recordTargetName,
                secondText: `legajo`,
                code: record.recordTargetId,
                details: record.details,
                link: `/workers/${record.recordTargetId}`,
            },
        },
        [`${RecordType.STATE_CHANGED}_${RecordObject.WORKER}`]: {
            title: "OPERARIO ESTADO",
            detail: {
                firstText: `Cambió el estado del operario`,
                name: record.recordTargetName,
                secondText: `legajo`,
                code: record.recordTargetId,
                thirdText: 'a',
                details: getUserStatusTranslation(record.details),
                link: `/workers/${record.recordTargetId}`,
            },
        },
        [`${RecordType.TRANSFERRED}_${RecordObject.WORKER}`]: {
            title: "OPERARIO TRANSFERIDO",
            detail: {
                firstText: `Se ha transferido de obra al operario`,
                name: record.recordTargetName,
                secondText: `legajo`,
                code: record.recordTargetId,
                link: `/workers/${record.recordTargetId}`,
                thirdText: `obra`,
                details: record.details
                    ? record.details.split(' ').join(', ')
                    : 'sin asignar',
            },
        },
        [`${RecordType.COMMENT_ADDED}_${RecordObject.WORKER}`]: {
            title: "OPERARIO COMENTADO",
            detail: {
                firstText: `Comentario creado para el trabajador `,
                name: record.recordTargetName,
                secondText: `legajo`,
                code: record.recordTargetId,
            },
        },
    };

    const { title, detail } = titleDetailsMap[`${record.type}_${record.recordObject}`] || {
        title: record.type,
        detail: {
            firstText: "Detalles desconocidos",
            name: "",
            secondText: "",
            code: "",
        },
    };

    return {
        title,
        detail,
    };
};
