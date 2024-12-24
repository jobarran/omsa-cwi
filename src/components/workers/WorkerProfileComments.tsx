"use client";
import { User } from "@/interfaces";
import { useState } from "react";
import { StarRating } from "../ui/inputs/StarRating";
import { FaStar } from "react-icons/fa6";
import { Comment } from "@/interfaces/comment.interface";

interface Props {
    user: User;
    onAddComment: (comment: string, rating: number | null) => void; // Callback to handle new comment
}

export const WorkerProfileComments = ({ user, onAddComment }: Props) => {

    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState<number | null>(null);

    const handleAddComment = () => {
        if (newComment.trim()) {
            onAddComment(newComment, rating); // Pass new comment and rating to the parent component
            setNewComment(""); // Clear input after submission
            setRating(null); // Reset rating
        }
    };

    return (
        <div>
            <div className="mt-4">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escribe un comentario..."
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex justify-between mt-1">
                    <StarRating
                        rating={rating}
                        setRating={setRating}
                    />

                    <button
                        disabled={!newComment}
                        onClick={handleAddComment}
                        className={`px-2 py-1 bg-sky-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                            ${!newComment ? 'opacity-50' : 'hover:bg-sky-900'}`}
                    >
                        Comentar
                    </button>

                </div>
            </div>

            <h2 className="text-xl font-semibold mt-4 text-sky-800">Comentarios</h2>
            {user.receivedComments && user.receivedComments.length > 0 ? (
                <ul className="space-y-4 mt-2">
                    {user.receivedComments.map((comment: Comment) => (
                        <li key={comment.id} className="border-b pb-2 last:border-none">
                            <p className="text-gray-700">{comment.content}</p>
                            <div className="flex flex-col text-sm text-gray-500 mt-1">
                                {/* Display stars */}
                                <div className="flex items-center mr-2">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <FaStar
                                            key={index}
                                            size={16}
                                            className={index < (comment.rating || 0) ? "text-yellow-500" : "text-gray-300"}
                                        />
                                    ))}
                                </div>
                                <div>
                                    {comment.user && (
                                        <span>{comment.user.name} {comment.user.lastName}</span>
                                    )}
                                    <span className="ml-2">- {new Date(comment.createdAt).toLocaleDateString("es-ES")}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No hay comentarios disponibles</p>
            )}
        </div>
    );
};
