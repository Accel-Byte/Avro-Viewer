import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
  isDark: boolean;
}

export default function Dropdown({
  label,
  options,
  onSelect,
  isDark,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(label);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`inline-flex justify-center items-center max-w-xl min-w-16 rounded-md border shadow-sm px-4 py-2 text-sm font-medium ${
          isDark
            ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 focus:ring-offset-gray-900 focus:ring-gray-500"
            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 focus:ring-offset-white focus:ring-indigo-500"
        } focus:outline-none focus:ring-2`}
      >
        <span className="w-full text-left overflow-hidden flex-1">
          {selectedOption}
        </span>
        <ChevronDownIcon
          className={`ml-2.5 -mr-1.5 h-5 w-5 transition-transform duration-150 ${
            isOpen ? "rotate-180" : "rotate-0"
          } ${isDark ? "text-gray-300" : "text-gray-800"}`}
        />
      </button>

      {isOpen && (
        <div
          className={`z-10 origin-top-right absolute w-full left-0 mt-2 rounded-md shadow-lg ring-1 focus:outline-none ${
            isDark
              ? "bg-gray-800 ring-gray-700"
              : "bg-white ring-black ring-opacity-5"
          }`}
          role="menu"
          aria-orientation="vertical"
        >
          <ul
            className={`py-1 text-sm ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
            role="none"
          >
            {options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleOptionSelect(option)}
                  className={`block px-4 py-2 w-full text-left rounded-md ${
                    isDark
                      ? "hover:bg-gray-700 focus:bg-gray-600"
                      : "hover:bg-gray-200 focus:bg-gray-300"
                  }`}
                  role="menuitem"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
