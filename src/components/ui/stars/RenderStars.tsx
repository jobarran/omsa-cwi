
interface Props {
    rating: number | null
}

export const RenderStars = ({ rating }: Props) => {

    if (rating === null) return <p className="text-gray-600 text-sm italic">Sin calificaciónes</p>;

    const filledStars = Math.floor(rating); // Full stars
    const halfStars = rating % 1 >= 0.5 ? 1 : 0; // Half star condition
    const emptyStars = 5 - filledStars - halfStars; // Empty stars

    const stars = [
        ...Array(filledStars).fill("★"), // Full stars
        ...Array(halfStars).fill("☆"), // Half star
        ...Array(emptyStars).fill("☆"), // Empty stars
    ];

    return (
        <div>
            {stars.map((star, index) => (
                <span
                    key={index}
                    className="text-yellow-400 text-lg md:text-xl"
                >
                    {star}
                </span>
            ))}
        </div>
    );
};