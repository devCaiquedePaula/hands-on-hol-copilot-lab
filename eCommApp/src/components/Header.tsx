import { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactUsModal from './ContactUsModal';

const Header = () => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    return (
        <header className="app-header">
            <h1>The Daily Harvest</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/cart">Cart</Link>
                <button
                    type="button"
                    className="nav-button"
                    onClick={() => setIsContactModalOpen(true)}
                >
                    Contact Us
                </button>
                <Link to="/login">
                    <button>Admin Login</button>
                </Link>
            </nav>
            <ContactUsModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
            />
        </header>
    );
};

export default Header;
