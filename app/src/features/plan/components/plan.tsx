import type { FourYearPlan } from "@/features/_shared/types";
import { useState } from "react";
import { AddCourseDialog } from "./add-course-dialog";
import { Year } from "./year";

type PlanProps = {
  fourYearPlan: FourYearPlan;
};

const Plan = ({ fourYearPlan }: PlanProps) => {
  const [showAddCourseDialog, setShowAddCourseDialog] = useState(false);

  return (
    <div
      style={{
        width: "95vw",
      }}
    >
      <div
        className="mx-auto relative"
        style={{
          maxWidth: "1200px",
        }}
      >
        {fourYearPlan.map((yearPlan, idx) => (
          <Year
            key={idx}
            yearNumber={idx + 1}
            toggleAddCourseDialog={() =>
              setShowAddCourseDialog((prev) => !prev)
            }
            semesters={yearPlan.semesters}
          />
        ))}
      </div>

      <AddCourseDialog
        isOpen={showAddCourseDialog}
        toggle={() => setShowAddCourseDialog((prev) => !prev)}
      />
    </div>
  );
};

export { Plan };
