import { UserRole } from "@prisma/client";
import Link from "next/link";

interface Props {
  label: string;
  link: string;
  icon: React.ElementType; // Define this as a component type
  userRole?: UserRole
}

export const SectionButtons = ({ label, link, icon: Icon, userRole }: Props) => {

  const isDisabled = userRole !== "ADMIN" && userRole !== undefined;

  return (
    <div className="flex flex-col items-center justify-center">
      <Link href={link}>
        <div
          className={`flex items-center justify-center w-24 h-24 rounded-lg border-2 ${isDisabled ? "bg-gray-200 text-gray-400 border-gray-400" : "bg-white text-sky-800 border-sky-800 group hover:bg-gray-100"
            }`}
        >
          <Icon className={`w-14 h-14 p-2 rounded-full border-4 border-sky-800 group-hover:animate-spin ${isDisabled ? "bg-gray-200 text-gray-400 border-gray-400 group-hover:animate-none" : ""
            }`} />
        </div>
        <p className={`mt-2 text-sm text-center ${isDisabled ? "text-gray-400" : "text-slate-500"} `}>{label}</p> {/* Added margin-top to space out the text */}
      </Link>
    </div>
  );
};
