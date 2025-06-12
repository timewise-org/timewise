import type { Semesters } from "@/features/_shared/types";
import { useState } from "react";
import { Semester } from "./semester";

type YearContainerProps = {
  yearNumber: number;
  semesters: Semesters;
  toggleAddCourseDialog: () => void;
};

const Year = ({
  yearNumber,
  semesters,
  toggleAddCourseDialog,
}: YearContainerProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div>
      <div
        className="flex items-center justify-center py-2 bg-orange-200 rounded-md mb-2 cursor-pointer"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <p className="text-2xl font-bold select-none">
          Year {yearNumber} <span>{isExpanded ? "⬆️" : "⬇️"}</span>
        </p>
      </div>
      {isExpanded && (
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap mb-5 sm:items-start">
          {Object.keys(semesters).map((semester) => (
            <Semester
              key={semester}
              semester={semester}
              courses={semesters[semester as keyof typeof semesters].courses}
              toggleAddCourseDialog={toggleAddCourseDialog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { Year };
