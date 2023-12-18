import { useState } from 'react';
import Header from './components/Header';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FeedbackList from './components/FeedbackList';
import FeedbackData from './data/FeedbackData';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import AboutPage from './pages/AboutPage';
import AboutIconLink from './components/AboutIconLink';

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
        <Router>
            <Header />
            <div className='container'>
                <Routes>
                    <Route
                        exact
                        path='/'
                        element={
                            <>
                                <FeedbackForm handleAdd={addFeedback} />
                                <FeedbackStats feedback={feedback} />
                                <FeedbackList
                                    feedback={feedback}
                                    handleDelete={deleteFeedback}
                                />
                            </>
                        }
                    ></Route>

                    <Route path='/about' element={<AboutPage />} />
                </Routes>
                <AboutIconLink />
            </div>
        </Router>
    );
}

export default App;
