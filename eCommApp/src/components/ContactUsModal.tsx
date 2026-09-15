import { useState } from 'react';

interface ContactUsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactUsModal = ({ isOpen, onClose }: ContactUsModalProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);

    if (!isOpen) return null;

    const handleClose = () => {
        setShowConfirmation(false);
        onClose();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setName('');
        setEmail('');
        setMessage('');
        setShowConfirmation(true);
    };

    return (
        <div className="modal-backdrop" onClick={handleClose}>
            <div className="modal-content contact-modal" onClick={e => e.stopPropagation()}>
                <button aria-label="Close" onClick={handleClose} className="close-button">×</button>
                <h2>Contact Us</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                    <label htmlFor="contact-name">Name</label>
                    <input
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />

                    <label htmlFor="contact-email">Email</label>
                    <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="contact-message">Message</label>
                    <textarea
                        id="contact-message"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        required
                    />

                    <button type="submit">Submit</button>
                </form>
                {showConfirmation && (
                    <div className="contact-popup" role="alertdialog" aria-modal="true">
                        <p>Thank you for your message</p>
                        <button type="button" onClick={() => setShowConfirmation(false)}>Continue</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactUsModal;
