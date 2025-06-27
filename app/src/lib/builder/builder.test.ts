import { Builder } from "./builder";
import {
  Meeting,
  OnlineCourse,
  PhysicalCourse,
  Schedule,
  ScheduleBlock,
} from "../schedule";
import { describe, expect, test } from "vitest";
import type { DayOfWeek } from "@/types";

function createMeeting(days: DayOfWeek[], start: string, end: string) {
  return new Meeting({
    time: {
      days,
      start,
      end,
    },

    location: {
      building: "test",
      room: "test",
    },
  });
}

let id = 1;

function createCourse(code: string, courseId: string, meetings: Meeting[]) {
  return new PhysicalCourse({
    id: `${++id}`,
    code,
    courseId,
    meetings,
  });
}

function createOnlineCourse(code: string, courseId: string) {
  return new OnlineCourse({
    id: `${++id}`,
    code,
    courseId,
  });
}

const builder = new Builder();
const TEST_COURSES = [
  createCourse("MAC2302", "1", [
    createMeeting(["Mon"], "9:35 AM", "10:35 AM"),
    createMeeting(["Wed", "Fri"], "4:35 PM", "6:35 PM"),
  ]),
  createCourse("MAC2302", "2", [
    createMeeting(["Mon"], "11:35 AM", "12:35 PM"),
    createMeeting(["Tue", "Thu"], "2:35 PM", "3:35 PM"),
  ]),
  createCourse("PHY2049", "1", [
    createMeeting(["Wed"], "7:35 AM", "9:35 AM"),
    createMeeting(["Tue", "Fri"], "1:05 PM", "2:15 PM"),
  ]),
  createCourse("PHY2049", "2", [
    createMeeting(["Tue"], "8:10 AM", "9:30 AM"),
    createMeeting(["Mon", "Fri"], "12:10 PM", "2:45 PM"),
  ]),
  createCourse("COP3503", "1", [
    createMeeting(["Fri"], "9:35 AM", "10:35 AM"),
    createMeeting(["Thu"], "5:35 PM", "7:35 PM"),
  ]),
  createOnlineCourse("ACG2020", "1"),
];

const TEST_COURSES2 = [
  createCourse("MAC2302", "1", [createMeeting(["Mon"], "9:35 AM", "10:35 AM")]),
  createCourse("MAC2302", "2", [
    createMeeting(["Tue"], "11:35 AM", "12:35 PM"),
  ]),
  createCourse("PHY2049", "1", [createMeeting(["Wed"], "7:35 AM", "9:35 AM")]),
  createCourse("PHY2049", "2", [createMeeting(["Mon"], "9:35 AM", "20:35 AM")]),
  createCourse("COP3503", "1", [createMeeting(["Fri"], "9:35 AM", "10:35 AM")]),
  createOnlineCourse("ACG2020", "1"),
];

const excludedBlocks = [
  new ScheduleBlock({
    day: "Fri",
    start: "9:17 AM",
  }),
];

describe("build valid schedules from list of courses", () => {
  test("outputs all possible valid schedules (no filters)", () => {
    const result = builder.build(
      TEST_COURSES,
      ["MAC2302", "PHY2049", "COP3503", "ACG2020"],
      {
        excludedBlocks: [],
        excludeOnlineCourses: false,
      },
    );

    expect(result.totalCombos).toBe(4);
    expect(result.validCombos).toBe(3);

    const EXPECTED_SCHEDULES = [
      new Schedule([
        createCourse("MAC2302", "1", [
          createMeeting(["Mon"], "9:35 AM", "10:35 AM"),
          createMeeting(["Wed", "Fri"], "4:35 PM", "6:35 PM"),
        ]),
        createCourse("PHY2049", "1", [
          createMeeting(["Wed"], "7:35 AM", "9:35 AM"),
          createMeeting(["Tue", "Fri"], "1:05 PM", "2:15 PM"),
        ]),
        createCourse("COP3503", "1", [
          createMeeting(["Fri"], "9:35 AM", "10:35 AM"),
          createMeeting(["Thu"], "5:35 PM", "7:35 PM"),
        ]),
        createOnlineCourse("ACG2020", "1"),
      ]),
      new Schedule([
        createCourse("MAC2302", "1", [
          createMeeting(["Mon"], "9:35 AM", "10:35 AM"),
          createMeeting(["Wed", "Fri"], "4:35 PM", "6:35 PM"),
        ]),
        createCourse("PHY2049", "2", [
          createMeeting(["Tue"], "8:10 AM", "9:30 AM"),
          createMeeting(["Mon", "Fri"], "12:10 PM", "2:45 PM"),
        ]),
        createCourse("COP3503", "1", [
          createMeeting(["Fri"], "9:35 AM", "10:35 AM"),
          createMeeting(["Thu"], "5:35 PM", "7:35 PM"),
        ]),
        createOnlineCourse("ACG2020", "1"),
      ]),
      new Schedule([
        createCourse("MAC2302", "2", [
          createMeeting(["Mon"], "11:35 AM", "12:35 PM"),
          createMeeting(["Tue", "Thu"], "2:35 PM", "3:35 PM"),
        ]),
        createCourse("PHY2049", "1", [
          createMeeting(["Wed"], "7:35 AM", "9:35 AM"),
          createMeeting(["Tue", "Fri"], "1:05 PM", "2:15 PM"),
        ]),
        createCourse("COP3503", "1", [
          createMeeting(["Fri"], "9:35 AM", "10:35 AM"),
          createMeeting(["Thu"], "5:35 PM", "7:35 PM"),
        ]),
        createOnlineCourse("ACG2020", "1"),
      ]),
    ];

    for (const schedule of result.schedules) {
      let found = false;
      for (const expectedSchedule of EXPECTED_SCHEDULES) {
        if (schedule.equals(expectedSchedule)) {
          found = true;
          break;
        }
      }
      expect(found).toBe(true);
    }
  });
});
