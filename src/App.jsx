import { useState } from 'react';
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import FeedbackData from './data/FeedbackData';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';

function App() {
    const [feedback, setFeedback] = useState(FeedbackData);
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
                <FeedbackForm />
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
