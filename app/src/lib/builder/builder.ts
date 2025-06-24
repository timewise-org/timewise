import { Schedule, type Course } from "../schedule";

export class Builder {
  constructor() {}

  build(
    courses: Course[],
    chosenCourseCodes: string[],
    filters: {
      excludedBlocks: any[];
      excludeOnlineCourses: boolean;
    },
  ): {
    schedules: Schedule[];
    totalCombos: number;
    validCombos: number;
  } {
    let validSchedules: Schedule[] = [];

    // Initialize course groupings by their course codes
    const courseGroupings: Record<string, Course[]> = {};
    for (const code of chosenCourseCodes) {
      courseGroupings[code] = [];
    }

    // Push every course into their proper group
    for (const course of courses) {
      if (!courseGroupings[course.code]) {
        console.error(
          "There were likely an error with courses passed in to the course builder.",
        );
        continue;
      }

      courseGroupings[course.code].push(course);
    }

    // Generate all possible valid combinations of courses to make a schedule
    for (const courseGroup of Object.values(courseGroupings)) {
      let temp: Schedule[] = [];

      for (const course of courseGroup) {
        if (!course.meetsUserFilters(filters)) {
          continue;
        }

        for (const schedule of validSchedules) {
          const newSchedule = new Schedule([...schedule.getCourses(), course]);

          if (newSchedule.isValid()) {
            temp.push(newSchedule);
          }
        }
      }

      validSchedules = temp;
    }

    return {
      schedules: validSchedules,
      validCombos: validSchedules.length,
      totalCombos: Object.values(courseGroupings).reduce((acc, curr) => {
        if (curr.length > 0) {
          if (acc === 0) {
            return curr.length;
          }

          return curr.length * acc;
        }

        return acc;
      }, 0),
    };
  }
}
