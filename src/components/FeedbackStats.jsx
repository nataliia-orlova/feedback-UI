import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

export default function FeedbackStats() {
    const { feedback } = useContext(FeedbackContext);
    // calculate rating avarage
    // allow 1 point after the dot, when zero is after the dot - don't show it
    // render 0 when there are no reviews

    let average =
        feedback.reduce((acc, cur) => {
            return acc + cur.rating;
        }, 0) / feedback.length;
    average = average.toFixed(1).replace(/[.,]0$/, '');
    return (
        <div className='feedback-stats'>
            <h4>{feedback.length} Reviews</h4>
            <h4>Avarage Rating: {isNaN(average) ? 0 : average}</h4>
        </div>
    );
}
