import Link from "next/link";


interface Props {
    label: string;
    link: string;
}

export const LinkButtonBig = ({ label, link }: Props) => {
    return (
        <Link
            href={link}
            className="flex flex-row px-2 py-1 rounded-lg border bg-sky-800 text-white text-sm font-medium hover:bg-sky-900 transition">
            {label}
        </Link>
    );
};
