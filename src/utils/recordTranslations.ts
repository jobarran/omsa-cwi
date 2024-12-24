// recordTranslations.ts

import { RecordObject, RecordType } from "@prisma/client";

// Spanish translations for RecordObject
export const recordObjectTranslations: Record<RecordObject, string> = {
  [RecordObject.TOOL]: "Herramienta",
  [RecordObject.USER]: "Usuario",
  [RecordObject.WORKER]: "Operario",
  [RecordObject.PROJECT]: "Proyecto",
};

// Spanish translations for RecordType
export const recordTypeTranslations: Record<RecordType, string> = {
  [RecordType.CREATED]: "Creado",
  [RecordType.UPDATED]: "Actualizado",
  [RecordType.DELETED]: "Eliminado",
  [RecordType.TRANSFERRED]: "Transferido",
  [RecordType.COMMENT_ADDED]: "Comentado",
  [RecordType.STATE_CHANGED]: "Estado",
};
