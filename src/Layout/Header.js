import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = ({ toggleSidebar }) => {



	return (
		<header className="z-50 fixed top-0 left-0 w-full bg-primary dark:bg-primary-hover text-white flex items-center justify-between p-4 shadow-md md:hidden rounded-b-lg">
		</header>
	);
};

export default Header;
