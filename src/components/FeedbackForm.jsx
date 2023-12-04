import { useState } from 'react';
import Card from './shared/Card';
import Button from './shared/Button';

export default function FeedbackForm() {
    const [text, setText] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');

    const handleTextChange = (e) => {
        if (text === '') {
            setBtnDisabled(true);
            setMessage(null);
        } else if (text !== '' && text.trim().length <= 10) {
            setBtnDisabled(true);
            setMessage('Your review must be at least 10 characters long');
        } else {
            setBtnDisabled(false);
            setMessage(null);
        }
        setText(e.target.value);
    };
    return (
        <Card>
            <form>
                <h2>How would you rate our service?</h2>
                <div className='input-group'>
                    <input
                        onChange={handleTextChange}
                        type='text'
                        placeholder='Write a review'
                        value={text}
                    />
                    <Button
                        type='submit'
                        version='primary'
                        isDisabled={btnDisabled}
                    >
                        TEST
                    </Button>
                </div>
                {message && <div className='message'>{message}</div>}
            </form>
        </Card>
    );
}
