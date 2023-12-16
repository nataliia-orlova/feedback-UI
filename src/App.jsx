import { useState } from 'react';
import Header from './components/Header';
import { v4 as uuidv4 } from 'uuid';
import FeedbackList from './components/FeedbackList';
import FeedbackData from './data/FeedbackData';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';

function App() {
    const [feedback, setFeedback] = useState(FeedbackData);
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        // get the current feedback items as an array (copy it) and add new feedback
        setFeedback([newFeedback, ...feedback]);
        console.log(newFeedback);
    };

    const deleteFeedback = (id) => {
        if (
            window.confirm(
                'Are you sure that you want like to delete this feedback?'
            )
        ) {
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    };
    return (
        <div>
            <Header />
            <div className='container'>
                <FeedbackForm handleAdd={addFeedback} />
                <FeedbackStats feedback={feedback} />
                <FeedbackList
                    feedback={feedback}
                    handleDelete={deleteFeedback}
                />
            </div>
        </div>
    );
}

export default App;
