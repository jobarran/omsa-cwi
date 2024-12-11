

interface Props {
    label: string
}

export const SectionTitle = ({ label }: Props) => {

    return (

        <h1 className="text-xl md:text-3xl font-semibold text-sky-800">{label}</h1>

    );
};
