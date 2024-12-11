import { SetStateAction } from "react";
import { FaStar } from "react-icons/fa6";

interface Props {
    rating: number | null
    setRating: (value: SetStateAction<number | null>) => void
}

export const StarRating = ({ rating, setRating }: Props) => {
    return (
        <div className="flex items-center">
            {Array.from({ length: 5 }, (_, index) => {
                const starValue = index + 1;
                return (
                    <FaStar
                        key={index}
                        onClick={() => setRating(starValue)}
                        size={24}
                        className={`cursor-pointer ${rating && rating >= starValue ? "text-yellow-500" : "text-gray-300"
                            }`}
                    />
                );
            })}
        </div>
    );
};