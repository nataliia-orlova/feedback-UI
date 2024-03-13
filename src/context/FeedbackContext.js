import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

//  create context
const FeedbackContext = createContext();
//  create provider
//  takes in children since it will wrap everything else inside
//  children are components that will need access to the state
export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This is feedback item 1',
            rating: 4,
        },
        {
            id: 2,
            text: 'This is feedback item 2',
            rating: 4,
        },
        {
            id: 3,
            text: 'This is feedback item 3',
            rating: 4,
        },
    ]);
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    });
    //  set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        });
    };
    //  delete feedback
    const deleteFeedback = (id) => {
        if (
            window.confirm(
                'Are you sure that you want like to delete this feedback?'
            )
        ) {
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    };
    //   add feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        // get the current feedback items as an array (copy it) and add new feedback
        setFeedback([newFeedback, ...feedback]);
        console.log(newFeedback);
    };
    return (
        <FeedbackContext.Provider
            value={{ feedback, deleteFeedback, addFeedback, editFeedback }}
        >
            {children}
        </FeedbackContext.Provider>
    );
};

export default FeedbackContext;
