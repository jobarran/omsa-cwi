import { FaBuilding, FaTools } from "react-icons/fa";
import { SectionButtons } from "..";
import { FaGear, FaUserGroup } from "react-icons/fa6";
import { UserRole } from "@prisma/client";

interface Props {
    userRole: UserRole
}

export const HomeSections = ({ userRole }: Props) => {
    return (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <SectionButtons label={'Herramientas'} link={'/tools'} icon={FaTools} />
            <SectionButtons label={'Obras'} link={'/projects'} icon={FaBuilding} />
            <SectionButtons label={'Recursos'} link={'/workers'} icon={FaUserGroup} />
            <SectionButtons label={'Admin'} link={'/admin'} icon={FaGear} userRole={userRole} />
        </div>
    );
};
