import { FaEdit } from "react-icons/fa";

export const AdminTableHeader = () => (

    <thead className="text-xs text-white uppercase bg-sky-800">
        <tr>
            <th scope="col" className="px-6 py-3 text-center">Imagen</th>
            <th scope="col" className="px-6 py-3 text-center">Legajo</th>
            <th scope="col" className="px-6 py-3 text-center">Nombre</th>
            <th scope="col" className="px-6 py-3 text-center">Rol</th>
            <th scope="col" className="px-6 py-3 text-center">Obras</th>
            <th scope="col" className="px-6 py-3 text-center">Permisos</th>
            <th scope="col" className="px-4 py-3 text-center w-16">{<FaEdit className="h-5 w-5 mx-auto" />}</th>
        </tr>
    </thead>

);
