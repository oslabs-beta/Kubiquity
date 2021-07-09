import React from 'react';

const Sidebar = () => {
  const handleClick = e => {
    const { value } = e.target;

    switch(value) {
      case 'Memory':
        break;
      case 'Log':
        break;
      case 'Above':
        break;
      default:
    }
  };

  return (
    <ul>
      <li>
        <button onClick={handleClick}>
          Home
        </button>
      </li>
      <li>
        <button onClick={handleClick}>
          Memory
        </button>
      </li>
      <li>
        <button onClick={handleClick}>
          Log
        </button>
      </li>
      <li>
        <button onClick={handleClick}>
          About
        </button>
      </li>
    </ul>
  )
};

export default Sidebar;
