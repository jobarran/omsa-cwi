import { UserPermission } from "@prisma/client";

export const getPermissionBoolean = (
  userPermissions: UserPermission[] | null,
  type: string,
  section: string
): boolean => {
  // Combine section and type into the desired format
  const formattedPermission = `${section.toUpperCase()}_${type.toUpperCase()}`;

  // Check if the formattedPermission exists in the userPermissions array or if "TOTAL" is present
  if (userPermissions) {
    return userPermissions.some(
      permission => permission === formattedPermission || permission === "TOTAL"
    );
  }
  
  return false;
};
