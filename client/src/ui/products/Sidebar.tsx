import { useState, useEffect } from 'react';
import SideLinks from './side-links';
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function Sidebar() {
  return (
    <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
      <SideLinks />
      <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block">
      </div>
    </div>
  );
}