import { createContext, useState, useEffect } from 'react';

//  create context
const FeedbackContext = createContext();
//  create provider
//  takes in children since it will wrap everything else inside
//  children are components that will need access to the state
export const FeedbackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        fetchFeedback();
    }, []);

    //  fetch data from db
    const fetchFeedback = async () => {
        const response = await fetch(`/feedback`);
        const data = await response.json();
        setFeedback(data);
        setIsLoading(false);
    };

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
    //  UPDATE feedback item
    const updateFeedback = async (id, updItem) => {
        await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updItem),
        });

        const updatedResponse = await fetch(`/feedback/${id}`);
        const updatedData = await updatedResponse.json();
        setFeedback(
            feedback.map((item) =>
                item.id === id ? { ...item, ...updatedData } : item
            )
        );
    };
    //  DELETE feedback
    const deleteFeedback = async (id) => {
        if (
            window.confirm(
                'Are you sure that you want like to delete this feedback?'
            )
        ) {
            await fetch(`/feedback/${id}`, { method: 'DELETE' });
            setFeedback(feedback.filter((item) => item.id !== id));
        }
    };
    //   ADD feedback
    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFeedback),
        });
        const data = await response.json();

        // get the current feedback items as an array (copy it) and add new feedback
        setFeedback([data, ...feedback]);
    };
    return (
        <FeedbackContext.Provider
            value={{
                feedback,
                isLoading,
                deleteFeedback,
                addFeedback,
                editFeedback, // function
                feedbackEdit, // actual piece of state, obj that holds the item and boo
                updateFeedback,
            }}
        >
            {children}
        </FeedbackContext.Provider>
    );
};

export default FeedbackContext;
