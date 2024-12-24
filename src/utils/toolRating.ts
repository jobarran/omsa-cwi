
export const toolRagting = (comments: { rating: number | null }[]) => {

    const validRatings = comments.filter(comment => comment.rating !== null).map(comment => comment.rating as number);
    if (validRatings.length === 0) return null; // No valid ratings
    const sum = validRatings.reduce((acc, rating) => acc + rating, 0);

    return sum / validRatings.length; // Average rating
};