import { Record } from "@/interfaces/record.interface";
import { RecordObject, RecordType } from "@prisma/client";

export const getTitleAndDetail = (record: Record) => {
    // Define titles and details for each combination of type and object
    const titleDetailsMap = {
        // COMMENT_ADDED for TOOL
        [`${RecordType.COMMENT_ADDED}_${RecordObject.TOOL}`]: {
            title: "EQUIPO COMENTADO",
            detail: {
                firstText: `Comentario creado para el equipo `,
                name: record.recordTargetName,
                secondText: ` - id: `,
                code: record.recordTargetId,
            },
        },
        // COMMENT_ADDED for PROJECT
        [`${RecordType.COMMENT_ADDED}_${RecordObject.PROJECT}`]: {
            title: "Comentario creado para el proyecto",
            detail: {
                firstText: `Comentario creado para el proyecto `,
                name: record.recordTargetName,
                secondText: ``,
                code: ``,
            },
        },
        // COMMENT_ADDED for USER
        [`${RecordType.COMMENT_ADDED}_${RecordObject.USER}`]: {
            title: "Comentario creado para el usuario",
            detail: {
                firstText: `Comentario creado para el usuario `,
                name: record.recordTargetName,
                secondText: ``,
                code: ``,
            },
        },
        // COMMENT_ADDED for WORKER
        [`${RecordType.COMMENT_ADDED}_${RecordObject.WORKER}`]: {
            title: "Comentario creado para el trabajador",
            detail: {
                firstText: `Comentario creado para el trabajador `,
                name: record.recordTargetName,
                secondText: ``,
                code: ``,
            },
        },
        // CREATED for USER
        [`${RecordType.CREATED}_${RecordObject.USER}`]: {
            title: "USUARIO REGISTRADO",
            detail: {
                firstText: `Un nuevo usuario ha sido registrado: `,
                name: record.recordTargetName,
                secondText: `legajo:`,
                code: record.recordTargetId,
            },
        },
        // CREATED for WORKER
        [`${RecordType.CREATED}_${RecordObject.WORKER}`]: {
            title: "OPERARIO REGISTRADO",
            detail: {
                firstText: `Un nuevo opeario ha sido registrado: `,
                name: record.recordTargetName,
                secondText: `legajo:`,
                code: record.recordTargetId,
            },
        },
        // UPDATED for USER
        [`${RecordType.UPDATED}_${RecordObject.USER}`]: {
            title: "Usuario actualizado",
            detail: {
                firstText: `El usuario `,
                name: record.recordTargetName,
                secondText: ` ha sido actualizado.`,
                code: ``,
            },
        },
        // DELETED for USER
        [`${RecordType.DELETED}_${RecordObject.USER}`]: {
            title: "Usuario eliminado",
            detail: {
                firstText: `El usuario `,
                name: record.recordTargetName,
                secondText: ` ha sido eliminado.`,
                code: ``,
            },
        },
        // TRANSFERRED for TOOL
        [`${RecordType.TRANSFERRED}_${RecordObject.TOOL}`]: {
            title: "Herramienta transferida",
            detail: {
                firstText: `La herramienta `,
                name: record.recordTargetName,
                secondText: ` ha sido transferida.`,
                code: ``,
            },
        },
        // STATE_CHANGED for TOOL
        [`${RecordType.STATE_CHANGED}_${RecordObject.TOOL}`]: {
            title: "Estado de la herramienta cambiado",
            detail: {
                firstText: `El estado de la herramienta `,
                name: record.recordTargetName,
                secondText: ` ha sido cambiado.`,
                code: ``,
            },
        },
        // STATE_CHANGED for USER
        [`${RecordType.STATE_CHANGED}_${RecordObject.USER}`]: {
            title: "Estado del usuario cambiado",
            detail: {
                firstText: `El estado del usuario `,
                name: record.recordTargetName,
                secondText: ` ha sido cambiado.`,
                code: ``,
            },
        },
        // Default case for any unknown record type or object
        [`${RecordType.CREATED}_${RecordObject.TOOL}`]: {
            title: "EQUIPO CREADO",
            detail: {
                firstText: `Se ha creado la herramienta `,
                name: record.recordTargetName,
                secondText: `id`,
                code: record.recordTargetId,
            },
        },
        [`${RecordType.UPDATED}_${RecordObject.TOOL}`]: {
            title: "Herramienta actualizada",
            detail: {
                firstText: `La herramienta `,
                name: record.recordTargetName,
                secondText: ` ha sido actualizada.`,
                code: ``,
            },
        },
        [`${RecordType.DELETED}_${RecordObject.TOOL}`]: {
            title: "Herramienta eliminada",
            detail: {
                firstText: `La herramienta `,
                name: record.recordTargetName,
                secondText: ` ha sido eliminada.`,
                code: ``,
            },
        },
    };

    // Return the title and structured detail for the given record, or default to a generic message
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
