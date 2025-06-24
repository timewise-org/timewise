import { expect, test, describe } from "vitest";
import { DateTime } from "luxon";
import { filter } from "../api";
import type { ScheduleBlock, ScheduleCourse } from "@/types";

const formatString = "h:mm a";

const TEST_COURSES: ScheduleCourse[] = [
  {
    id: "1",
    code: "MAC2313",
    online: false,
    courseId: "test",

    meetings: [
      {
        time: {
          days: ["Mon", "Wed"],
          start: DateTime.fromFormat("8:00 AM", formatString),
          end: DateTime.fromFormat("10:00 AM", formatString),
          display: "test",
        },

        location: {
          building: "test",
          room: "300",
          display: "test",
        },
      },
      {
        time: {
          days: ["Tue"],
          start: DateTime.fromFormat("3:30 PM", formatString),
          end: DateTime.fromFormat("4:30 PM", formatString),
          display: "test",
        },

        location: {
          building: "test",
          room: "300",
          display: "test",
        },
      },
    ],

    color: {
      bg: "#f0fdf4",
      hover: "#dcfce7",
      side: "#7bf1a8",
    },
  },

  {
    id: "2",
    code: "COP3503",
    online: false,
    courseId: "test",

    meetings: [
      {
        time: {
          days: ["Thu", "Fri"],
          start: DateTime.fromFormat("9:45 AM", formatString),
          end: DateTime.fromFormat("10:45 AM", formatString),
          display: "test",
        },

        location: {
          building: "test",
          room: "300",
          display: "test",
        },
      },
      {
        time: {
          days: ["Mon"],
          start: DateTime.fromFormat("7:30 PM", formatString),
          end: DateTime.fromFormat("8:30 PM", formatString),
          display: "test",
        },

        location: {
          building: "test",
          room: "300",
          display: "test",
        },
      },
    ],
    color: {
      bg: "#f0fdf4",
      hover: "#dcfce7",
      side: "#7bf1a8",
    },
  },

  {
    id: "3",
    code: "TEST",
    online: false,
    courseId: "test",

    meetings: [
      {
        time: {
          days: ["Thu", "Fri"],
          start: DateTime.fromFormat("2:45 AM", formatString),
          end: DateTime.fromFormat("5:45 AM", formatString),
          display: "test",
        },

        location: {
          building: "test",
          room: "300",
          display: "test",
        },
      },
      {
        time: {
          days: ["Mon"],
          start: DateTime.fromFormat("9:30 PM", formatString),
          end: DateTime.fromFormat("11:30 PM", formatString),
          display: "test",
        },

        location: {
          building: "test",
          room: "300",
          display: "test",
        },
      },
    ],
    color: {
      bg: "#f0fdf4",
      hover: "#dcfce7",
      side: "#7bf1a8",
    },
  },

  {
    id: "4",
    code: "TEST",
    online: false,
    courseId: "test",

    meetings: [
      {
        time: {
          days: ["Wed", "Fri"],
          start: DateTime.fromFormat("11:45 AM", formatString),
          end: DateTime.fromFormat("1:45 PM", formatString),
          display: "test",
        },

        location: {
          building: "test",
          room: "300",
          display: "test",
        },
      },
      {
        time: {
          days: ["Thu"],
          start: DateTime.fromFormat("3:30 PM", formatString),
          end: DateTime.fromFormat("5:30 PM", formatString),
          display: "test",
        },

        location: {
          building: "test",
          room: "300",
          display: "test",
        },
      },
    ],
    color: {
      bg: "#f0fdf4",
      hover: "#dcfce7",
      side: "#7bf1a8",
    },
  },

  {
    id: "5",
    code: "TEST",
    online: false,
    courseId: "test",

    meetings: [
      {
        time: {
          days: ["Mon", "Thu"],
          start: DateTime.fromFormat("7:10 AM", formatString),
          end: DateTime.fromFormat("10:45 AM", formatString),
          display: "test",
        },

        location: {
          building: "test",
          room: "300",
          display: "test",
        },
      },
      {
        time: {
          days: ["Mon"],
          start: DateTime.fromFormat("1:30 PM", formatString),
          end: DateTime.fromFormat("2:30 PM", formatString),
          display: "test",
        },

        location: {
          building: "test",
          room: "300",
          display: "test",
        },
      },
      {
        time: {
          days: ["Tue"],
          start: DateTime.fromFormat("1:30 PM", formatString),
          end: DateTime.fromFormat("2:30 PM", formatString),
          display: "test",
        },

        location: {
          building: "test",
          room: "300",
          display: "test",
        },
      },
    ],
    color: {
      bg: "#f0fdf4",
      hover: "#dcfce7",
      side: "#7bf1a8",
    },
  },

  {
    id: "3",
    code: "ENT3003",
    online: true,
    courseId: "test",

    color: {
      bg: "#f0fdf4",
      hover: "#dcfce7",
      side: "#7bf1a8",
    },
  },

  {
    id: "4",
    code: "EGN3032",
    online: true,
    courseId: "test",

    color: {
      bg: "#f5f3ff",
      hover: "#ede9fe",
      side: "#c4b4ff",
    },
  },
];

describe("build schedules from filters and list of courses", () => {
  test("correctly outputs courses based on filters", () => {
    const EXPECTED_COURSES = [...TEST_COURSES];
    const excludedBlocks: ScheduleBlock[] = [
      {
        day: "Mon",
        start: DateTime.fromFormat("1:00 AM", formatString),
      },
      {
        day: "Fri",
        start: DateTime.fromFormat("5:00 AM", formatString),
      },
    ];

    const courses = filter(TEST_COURSES, excludedBlocks);

    expect(courses).toMatchObject(EXPECTED_COURSES);
  });
});
