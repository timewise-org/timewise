import type { DayOfWeek } from "@/features/_shared/types";
import { WEEK_DAYS } from "./constants";
import clsx from "clsx";

type DaysHeaderProps = {
  tiny?: boolean;
};

const getDayLetter = (tiny: boolean, day: DayOfWeek) => {
  if (tiny) {
    return day === "Thu" ? "R" : day[0];
  } else {
    return day;
  }
};

const DaysHeader = ({ tiny = false }: DaysHeaderProps) => {
  return WEEK_DAYS.map((day) => (
    <div
      key={day}
      className={clsx(
        "day-header border-dashed border-b-1 border-calendar-border text-muted-foreground",
        tiny && "text-[11px]",
      )}
      style={{
        gridArea: day,
      }}
    >
      {getDayLetter(tiny, day)}
    </div>
  ));
};

export { DaysHeader };
