import { expect, test, describe } from "vitest";
import { getStartingAndEndingCourseTimes } from "../utils";
import type { ScheduleCourse } from "@/features/_shared/types";

const courses: ScheduleCourse[] = [
  {
    id: "1",
    code: "MAC2313",
    online: false,

    time: {
      days: ["Mon", "Wed"],
      start: 0,
      end: 3,
      display: "",
    },

    location: {
      building: "LIT",
      room: "100",
      display: "LIT 100",
    },

    color: {
      bg: "#fff7ed",
      hover: "#ffedd4",
      side: "#ffb86a",
    },
  },

  {
    id: "2",
    code: "TEST2",
    online: false,

    time: {
      days: ["Mon", "Wed"],
      start: 5,
      end: 8,
      display: "",
    },

    location: {
      building: "LIT",
      room: "100",
      display: "LIT 100",
    },

    color: {
      bg: "#fff7ed",
      hover: "#ffedd4",
      side: "#ffb86a",
    },
  },

  {
    id: "3",
    code: "TEST3",
    online: false,

    time: {
      days: ["Mon", "Wed"],
      start: 15,
      end: 16,
      display: "",
    },

    location: {
      building: "LIT",
      room: "100",
      display: "LIT 100",
    },

    color: {
      bg: "#fff7ed",
      hover: "#ffedd4",
      side: "#ffb86a",
    },
  },

  {
    id: "4",
    code: "TEST4",
    online: false,

    time: {
      days: ["Mon", "Wed"],
      start: 1,
      end: 3,
      display: "",
    },

    location: {
      building: "LIT",
      room: "100",
      display: "LIT 100",
    },

    color: {
      bg: "#fff7ed",
      hover: "#ffedd4",
      side: "#ffb86a",
    },
  },

  {
    id: "5",
    code: "TEST5",
    online: false,

    time: {
      days: ["Mon", "Wed"],
      start: 15,
      end: 17,
      display: "",
    },

    location: {
      building: "LIT",
      room: "100",
      display: "LIT 100",
    },

    color: {
      bg: "#fff7ed",
      hover: "#ffedd4",
      side: "#ffb86a",
    },
  },
];

const onlineCourses: ScheduleCourse[] = [
  {
    id: "3",
    code: "ENT3003",
    online: true,

    color: {
      bg: "#f0fdf4",
      hover: "#dcfce7",
      side: "#7bf1a8",
    },
  },
  {
    id: "4",
    code: "MAC2023",
    online: true,

    color: {
      bg: "#f0fdf4",
      hover: "#dcfce7",
      side: "#7bf1a8",
    },
  },
];

describe("time range", () => {
  test("correctly finds earliest course start time", () => {
    const timeRange = getStartingAndEndingCourseTimes(courses);
    expect(timeRange.start).toBe(0);
  });

  test("correctly finds latest course end time", () => {
    const timeRange = getStartingAndEndingCourseTimes(courses);
    expect(timeRange.end - timeRange.extraRange).toBe(17);
  });

  test("handles only online classes", () => {
    const timeRange = getStartingAndEndingCourseTimes(onlineCourses);
    expect(timeRange.start).toBe(Infinity);
    expect(timeRange.end).toBe(-Infinity);
  });
});
