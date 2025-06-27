import type { ScheduleBlock } from "./schedule";

export type BuilderFilters = {
  excludedBlocks: ScheduleBlock[];
  excludeOnlineCourses: boolean;
};

export type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
