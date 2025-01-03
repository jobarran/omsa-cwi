import { FaBuilding, FaTools } from "react-icons/fa";
import { SectionButtons } from "..";
import { FaFingerprint, FaGear, FaHelmetSafety, FaUserGroup } from "react-icons/fa6";
import { UserRole } from "@prisma/client";

interface Props {
    userRole: UserRole
}

export const HomeSections = ({ userRole }: Props) => {
    return (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            <SectionButtons label={'Obras'} link={'/projects'} icon={FaBuilding} />
            <SectionButtons label={'Operarios'} link={'/workers'} icon={FaUserGroup} />
            <SectionButtons label={'Herramientas'} link={'/tools'} icon={FaTools} />
            <SectionButtons label={'Seguridad'} link={'/safety'} icon={FaHelmetSafety} />
            <SectionButtons label={'Registros'} link={'/records'} icon={FaFingerprint} userRole={userRole} />
            <SectionButtons label={'Admin'} link={'/admin'} icon={FaGear} userRole={userRole} />
        </div>
    );
};
