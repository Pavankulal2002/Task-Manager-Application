import React from 'react';

const FilterDropdown = () => {
  return (
    <select className="filter-dropdown">
      <option value="To Do">All</option>
      <option value="To Do">To Do</option>
      <option value="In progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
  );
};

export default FilterDropdown;
