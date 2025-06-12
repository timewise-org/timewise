import type { Course } from "@/features/_shared/types";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const renderSemester = (semester: string) => {
  if (semester === "fall") {
    return "Fall 🍂";
  }

  if (semester === "spring") {
    return "Spring 🌹";
  }

  if (semester === "summer") {
    return "Summer ☀️";
  }
};

type SemesterContainerProps = {
  semester: string;
  courses: Course[];
  toggleAddCourseDialog: () => void;
};

const Semester = ({
  semester,
  courses,
  toggleAddCourseDialog,
}: SemesterContainerProps) => {
  const [courseSelected, setCourseSelected] = useState<any>(null);

  return (
    <div className="bg-slate-200 basis-0 grow p-2 rounded-md">
      <div className="flex justify-between">
        <p className="capitalize">{renderSemester(semester)}</p>
        <p>Credits: 4</p>
      </div>

      <div className="pt-2 flex flex-col gap-2">
        {courses.map((course) => (
          <>
            <div
              className="bg-slate-300 px-2 py-2 rounded-md cursor-pointer hover:bg-slate-400"
              key={course.id}
              onClick={() => {
                if (courseSelected === course.code) {
                  setCourseSelected(null);
                } else {
                  setCourseSelected(course.code);
                }
              }}
            >
              <p className="text-sm">{course.code}</p>
              <p>{course.name}</p>
            </div>

            {courseSelected === course.code && (
              <div className="bg-slate-200 basis-0 grow p-2 rounded-md flex flex-col">
                <div className="flex items-center gap-4">
                  <p className="text-sm">MAC2313</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm">3 credits</p>
                    <p className="text-sm opacity-50 select-none">|</p>
                    <p className="text-xs">Last offered in Fall 2025</p>
                  </div>
                </div>
                <p className="my-1">Calculus 3</p>
                <p className="text-sm">
                  Examination of the accounting information systems in a
                  business organization. Coverage extends over topics such as
                  business processes, internal controls, and the fundamentals of
                  accounting information systems analysis, design,
                  implementation and control.
                </p>

                <div
                  className="w-max flex items-center mt-auto cursor-pointer hover:bg-slate-300 rounded-md p-1"
                  onClick={() => setCourseSelected(false)}
                >
                  <ArrowLeft className="text-gray-700" width={20} />
                  <span>Go back</span>
                </div>
              </div>
            )}
          </>
        ))}

        <div
          className="border border-dashed border-slate-400 hover:bg-slate-300 px-2 py-4 rounded-md cursor-pointer"
          onClick={toggleAddCourseDialog}
        >
          <p className="text-sm text-center select-none">➕ New Course</p>
        </div>
      </div>
    </div>
  );
};

export { Semester };
