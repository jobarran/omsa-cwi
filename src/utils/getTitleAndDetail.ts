import { Record } from "@/interfaces/record.interface";
import { RecordObject, RecordType } from "@prisma/client";

export const getTitleAndDetail = (record: Record) => {
    // Define titles and details for each combination of type and object
    const titleDetailsMap = {
        // COMMENT_ADDED for TOOL
        [`${RecordType.COMMENT_ADDED}_${RecordObject.TOOL}`]: {
            title: "HERRAMIENTA COMENTADA",
            detail: {
                firstText: `Comentario creado para la herramienta `,
                name: record.recordTargetName,
                secondText: `id`,
                code: record.recordTargetId,
                link: `/tools/${record.recordTargetId}`
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
        // STATE_CHANGED for PROJECT
        [`${RecordType.STATE_CHANGED}_${RecordObject.PROJECT}`]: {
            title: "OBRA ESTADO",
            detail: {
                firstText: `Cambio de estado para la obra `,
                name: record.recordTargetName,
                secondText: `código`,
                code: record.recordTargetId,
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
            title: "OPERARIO COMENTADO",
            detail: {
                firstText: `Comentario creado para el trabajador `,
                name: record.recordTargetName,
                secondText: `legajo`,
                code: record.recordTargetId,
            },
        },
        // CREATED for USER
        [`${RecordType.CREATED}_${RecordObject.USER}`]: {
            title: "USUARIO CREADO",
            detail: {
                firstText: `Un nuevo usuario ha sido registrado: `,
                name: record.recordTargetName,
                secondText: `legajo:`,
                code: record.recordTargetId,
                link: `/user/${record.recordTargetId}`
            },
        },
        // PERMISSION for USER
        [`${RecordType.PERMISSION_CHANGED}_${RecordObject.USER}`]: {
            title: "USUARIO PERMISOS",
            detail: {
                firstText: `Se han otorgado o quitado permisos al usuario `,
                name: record.recordTargetName,
                secondText: `legajo:`,
                code: record.recordTargetId,
                link: `/user/${record.recordTargetId}`
            },
        },
        // TRSFERRED for USER
        [`${RecordType.TRANSFERRED}_${RecordObject.USER}`]: {
            title: "USUARIO TRANSFERIDO",
            detail: {
                firstText: `Se a transferio de obra al usuario `,
                name: record.recordTargetName,
                secondText: `legajo`,
                code: record.recordTargetId,
                link: `/user/${record.recordTargetId}`,
                thirdText: `obras `,
                details: record.details
                    ? (record.details.includes(' ')
                        ? record.details.split(' ').join(', ')
                        : record.details)
                    : ''  // If details is null, return an empty string
            },
        },
        // CREATED for WORKER
        [`${RecordType.CREATED}_${RecordObject.WORKER}`]: {
            title: "OPERARIO CREADO",
            detail: {
                firstText: `Un nuevo opeario ha sido registrado: `,
                name: record.recordTargetName,
                secondText: `legajo:`,
                code: record.recordTargetId,
                link: `/workers/${record.recordTargetId}`
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
            title: "HERRAMIENTA CREADA",
            detail: {
                firstText: `Se ha creado la herramienta `,
                name: record.recordTargetName,
                secondText: `id`,
                code: record.recordTargetId,
                link: `/tools/${record.recordTargetId}`
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
