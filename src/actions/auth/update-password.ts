'use server';

import bcryptjs from 'bcryptjs';
import prisma from "@/lib/prisma"; // Tu instancia de Prisma
import { revalidatePath } from "next/cache";
import { auth } from '@/auth.config';

// Función para actualizar la contraseña del usuario
export async function updatePassword(userId: string, value: string) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return { ok: false, message: 'El usuario no está autenticado' };
        }

        const userRole = session.user.role;
        if (!(userRole === "ADMIN" || session.user.id === userId)) {
            return { ok: false, message: 'No tienes permiso para actualizar esta contraseña.' };
        }

        // Validar la fuerza de la contraseña (ejemplo: longitud mínima 8)
        if (value.length < 6) {
            return { ok: false, message: "La contraseña debe tener al menos 6 caracteres." };
        }

        const newPassword = bcryptjs.hashSync(value, 10);

        // Actualizar el registro del usuario en la base de datos
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { password: newPassword },
        });

        // Revalidar las rutas para asegurar que el contenido esté actualizado
        revalidatePath(`/admin/${userId}`);

        return { ok: true, message: "Contraseña actualizada exitosamente" };

    } catch (error) {
        console.error("Error al actualizar la contraseña del usuario:", error);
        return { ok: false, message: "No se pudo actualizar la contraseña. Por favor, intenta de nuevo más tarde." };
    }
}
