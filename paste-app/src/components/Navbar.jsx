import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Navigation Links */}
        <nav className="flex gap-6 text-gray-700 font-medium text-base">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-black border-b-2 border-black pb-1'
                : 'hover:text-black transition-colors'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              isActive
                ? 'text-black border-b-2 border-black pb-1'
                : 'hover:text-black transition-colors'
            }
          >
            Pastes
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
