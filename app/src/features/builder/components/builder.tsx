import { useState } from "react";
import { AddCourseDialog } from "./add-course-dialog";
import { X } from "lucide-react";
import { Calendar } from "@/features/schedule/components/calendar";
import { getStartingAndEndingCourseTimes } from "@/features/schedule/components/calendar/utils";

const Builder = () => {
  const [showAddCourseDialog, setShowAddCourseDialog] = useState(false);
  const [coursesPicked, setCoursesPicked] = useState<string[]>([]);

  const removePickedCourse = (code: string) => {
    setCoursesPicked((prev) => prev.filter((c) => c !== code));
  };

  return (
    <div>
      <div className="h-76 border-1 rounded-md w-60 py-2 px-3 overflow-y-auto">
        <button
          className="p-2 bg-slate-200 rounded-md cursor-pointer hover:bg-slate-300 mb-2"
          onClick={() => setShowAddCourseDialog(true)}
        >
          ➕ New Course
        </button>

        <div className="max-w-50">
          {coursesPicked.map((courseCode) => (
            <div
              className="p-2 bg-slate-200 rounded-md flex justify-between mb-2"
              key={courseCode}
            >
              <p>{courseCode}</p>
              <button
                onClick={() => removePickedCourse(courseCode)}
                className="cursor-pointer hover:bg-slate-300 rounded-md px-1"
              >
                <X width={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="h-96 mt-5 border-1 rounded-md w-60 py-2 pl-3 pr-5 overflow-y-auto">
        <div className="mb-5">
          <p>Exclude days: </p>
          <div className="max-w-[300px] flex flex-wrap gap-2">
            {["M", "T", "W", "R", "F"].map((day: string) => {
              return (
                <div className="flex items-center gap-1" key={day}>
                  <label>
                    <input
                      type="checkbox"
                      //   onChange={() => onExcludeDays(daysMap[day])}
                    />
                  </label>
                  <p className="pb-1">{day}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-2">
          <p>Exclude times: </p>
          <Calendar
            courses={[]}
            timeRange={getStartingAndEndingCourseTimes([])}
            compact
            tiny
          />
        </div>
      </div>

      <AddCourseDialog
        isOpen={showAddCourseDialog}
        toggle={() => setShowAddCourseDialog((prev) => !prev)}
        onAddCourse={(courseCode) => {
          setCoursesPicked([...coursesPicked, courseCode]);
        }}
      />
    </div>
  );
};

export { Builder };
