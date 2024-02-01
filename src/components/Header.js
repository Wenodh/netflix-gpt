import React from 'react';
import { LOGO } from '../utils/constants';

const Header = () => {
    //assets.nflxext.com/us/ffe/siteui/common/icons/nficon2023.ico
    return (
        <div className="absolute z-10">
            <div>
                <img
                    className="w-44 px-8 bg-gradient-to-b from-black"
                    src={LOGO}
                    alt="logo"
                />
            </div>
        </div>
    );
};

export default Header;
