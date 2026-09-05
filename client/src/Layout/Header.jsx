import React, { useState } from 'react';

import { authenticationService } from '../Services/authenticationService';
import history from '../Utilities/history';
import commonUtilities from '../Utilities/common';

const Header = () => {
    const [currentUser] = useState(
        authenticationService.currentUserValue
    );

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        authenticationService.logout();
        history.push('/');
    };

    const initials = commonUtilities.getInitialsFromName(
        currentUser.name
    );

    return (
        <div className="header-menu">
            <button
                className="header-menu-button"
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                <div className="avatar small">
                    {initials}
                </div>

                <span className="header-menu-name">
                    {currentUser.name}
                </span>

                <span>
                    {dropdownOpen ? '⌃' : '⌄'}
                </span>
            </button>

            {dropdownOpen && (
                <div className="header-dropdown">
                    <button
                        type="button"
                        onClick={handleLogout}
                    >
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;