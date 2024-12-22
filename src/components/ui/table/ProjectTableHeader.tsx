import { FaEye } from "react-icons/fa";

export const ProjectTableHeader = () => (

    <thead className="text-xs text-white uppercase bg-sky-800">
        <tr>
            <th scope="col" className="px-6 py-3 text-center">Imagen</th>
            <th scope="col" className="px-6 py-3 text-center">Código</th>
            <th scope="col" className="px-6 py-3 text-center">Obra</th>
            <th scope="col" className="px-6 py-3 text-center">Estado</th>
            <th scope="col" className="px-6 py-3 text-center">Recursos</th>
            <th scope="col" className="px-6 py-3 text-center">J.O.</th>
            <th scope="col" className="px-4 py-3 text-center w-16">{<FaEye className="h-5 w-5 mx-auto" />}</th>
        </tr>
    </thead>

);
