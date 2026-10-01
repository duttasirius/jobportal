import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "./redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Kolkata", "Bangalore", "Pune", "Mumbai", "Noida"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "React Native Developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0 - 20K", "20K - 1 Lakh", "1 Lakh - 5 Lakh"],
  },
];

const FilterCard = () => {
  const [selectValue, setSelectValue] = useState("");

  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectValue(value);
    dispatch(setSearchQuery(value));
  };

  return (
    <div className="sticky top-4 w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Filter Jobs</h2>
        <p className="mt-1 text-sm text-gray-500">
          Find jobs that match your preferences.
        </p>
      </div>

      <div className="border-b mb-6"></div>

      <RadioGroup
        className="space-y-8"
        onValueChange={changeHandler}
        value={selectValue}
      >
        {filterData.map((section, sectionIndex) => (
          <div key={section.filterType}>
            <h3 className="mb-4 text-lg font-semibold text-gray-700">
              {section.filterType}
            </h3>

            <div className="space-y-3">
              {section.array.map((item, itemIndex) => {
                const itemId = `filter-${sectionIndex}-${itemIndex}`;

                return (
                  <div
                    key={itemId}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-gray-100"
                  >
                    <RadioGroupItem
                      id={itemId}
                      value={item}
                      className="cursor-pointer"
                    />

                    <label
                      htmlFor={itemId}
                      className="cursor-pointer text-sm font-medium text-gray-600"
                    >
                      {item}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
