import { useState } from "react";
import { AddCourseDialog } from "@/components/add-course-dialog";
import { X } from "lucide-react";
import { Calendar } from "@/features/schedule/components/calendar";
import { getStartingAndEndingCourseTimes } from "@/features/schedule/components/calendar/utils";
import type { ScheduleBlock, DayOfWeek } from "@/types";
import { DateTime } from "luxon";

const daysMap: Record<string, DayOfWeek> = {
  M: "Mon",
  T: "Tue",
  W: "Wed",
  R: "Thu",
  F: "Fri",
};

const Builder = () => {
  const [showAddCourseDialog, setShowAddCourseDialog] = useState(false);
  const [coursesPicked, setCoursesPicked] = useState<string[]>([]);
  const [excludedBlocks, setExcludedBlocks] = useState<ScheduleBlock[]>([]);
  const [excludedDays, setExcludedDays] = useState<DayOfWeek[]>([]);

  const removePickedCourse = (code: string) => {
    setCoursesPicked((prev) => prev.filter((c) => c !== code));
  };

  const onExcludeDaySelect = (day: string) => {
    const _excludedDays = [...excludedDays];
    const index = _excludedDays.findIndex((_day) => _day === daysMap[day]);

    if (index !== -1) {
      _excludedDays.splice(index, 1);
      const _excludedBlocks = [...excludedBlocks];

      for (let i = 0; i < 24; i++) {
        const index = _excludedBlocks.findIndex(
          (_block) => _block.day === daysMap[day] && _block.start.hour === i,
        );

        if (index !== -1) {
          _excludedBlocks.splice(index, 1);
        }
      }

      setExcludedBlocks(_excludedBlocks);
    } else {
      _excludedDays.push(daysMap[day]);

      const _excludedBlocks = [...excludedBlocks];
      for (let i = 0; i < 24; i++) {
        const index = _excludedBlocks.findIndex(
          (_block) => _block.day === daysMap[day] && _block.start.hour === i,
        );

        if (index === -1) {
          _excludedBlocks.push({
            day: daysMap[day],
            start: DateTime.fromFormat(`${i}:00`, "H:mm", { zone: "utc" }),
          });
        }
      }

      setExcludedBlocks(_excludedBlocks);
    }

    setExcludedDays(_excludedDays);
  };

  const onExcludeBlockSelect = (block: ScheduleBlock) => {
    const _excludedBlocks = [...excludedBlocks];
    const index = _excludedBlocks.findIndex(
      (_block) => _block.day === block.day && _block.start.equals(block.start),
    );

    if (index !== -1) {
      _excludedBlocks.splice(index, 1);
    } else {
      _excludedBlocks.push({ ...block });
    }

    setExcludedBlocks(_excludedBlocks);
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

        <div className="max-w-60">
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
                      onChange={() => onExcludeDaySelect(day)}
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
            timeIntervalToRender={getStartingAndEndingCourseTimes([])}
            compact
            tiny
            onBlockSelected={(block) => onExcludeBlockSelect(block)}
            highlightedBlocks={excludedBlocks}
          />
        </div>
      </div>

      <button
        onClick={() => {
          console.log(excludedBlocks);
          console.log(excludedDays);
        }}
      >
        Log state
      </button>

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
