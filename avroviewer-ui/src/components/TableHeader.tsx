// import { useState } from "react";
import Dropdown from "./Dropdown";
// import Modal from "./Modal";
import {
  MoonIcon,
  SunIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useTheme } from "../context/theme";

interface TableHeaderProps {
  schema: string[];
  selectedColumn: string;
  setSelectedColumn: (column: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  setCurrentPage: (page: number) => void;
  fullSchema: string;
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}
export default function TableHeader({
  schema,
  selectedColumn,
  setSelectedColumn,
  searchQuery,
  setSearchQuery,
  pageSize,
  setPageSize,
  setCurrentPage,
  fullSchema,
  isDark,
  setIsDark,
}: TableHeaderProps) {
  fullSchema;
  const { currentTheme, setTheme } = useTheme();
  return (
    <div className="py-3 px-4">
      <div className="pb-3 flex items-center gap-4">
        <div>
          <span
            className={`text-sm font-medium ${
              isDark ? "text-gray-300" : "text-gray-800"
            } mx-2`}
          >
            Choose Theme :
          </span>
          <Dropdown
            label={currentTheme || "Select Theme"}
            options={["indigo", "blue", "emerald", "rose", "purple"]}
            onSelect={setTheme}
            isDark={isDark}
          />
        </div>
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-2 rounded-lg transition-colors duration-150 ${
            isDark
              ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
              : "bg-gray-100 hover:bg-gray-200 text-gray-800"
          }`}
        >
          {isDark ? (
            <SunIcon className="w-5 h-5" />
          ) : (
            <MoonIcon className="w-5 h-5" />
          )}
        </button>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Column Dropdown */}
          <Dropdown
            label={selectedColumn || "Select column"}
            options={schema}
            onSelect={setSelectedColumn}
            isDark={isDark}
          />

          {/* Search Input */}
          <div className="relative max-w-96 min-w-72">
            <label className="sr-only">Search</label>
            <input
              type="text"
              name="hs-table-with-pagination-search"
              id="hs-table-with-pagination-search"
              className={`py-2 px-3 ps-9 block w-full border focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm rounded-md text-sm disabled:opacity-50 disabled:pointer-events-none ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-gray-300 placeholder-gray-500"
                  : "bg-white border-gray-200 text-gray-800 placeholder-gray-400"
              }`}
              placeholder="Search for items"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={!selectedColumn}
            />
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
              <MagnifyingGlassIcon
                width={16}
                height={16}
                className={`${
                  !selectedColumn
                    ? isDark
                      ? "text-gray-500"
                      : "text-gray-400"
                    : isDark
                    ? "text-gray-300"
                    : "text-gray-800"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Per Page Dropdown */}
        <div>
          <span
            className={`text-sm font-medium ${
              isDark ? "text-gray-300" : "text-gray-800"
            } mx-2`}
          >
            Per Page :
          </span>
          <Dropdown
            label={`${pageSize}`}
            options={["5", "10", "15", "20"]}
            onSelect={(value) => {
              setPageSize(Number(value));
              if (Number(value) !== pageSize) {
                setCurrentPage(1);
              }
            }}
            isDark={isDark}
          />
        </div>
      </div>
    </div>
  );
}
