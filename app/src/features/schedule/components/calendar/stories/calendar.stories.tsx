import type { Meta, StoryObj } from "@storybook/react-vite";

import { Calendar } from "../calendar";
import { getStartingAndEndingCourseTimes } from "../utils";
import type { ScheduleCourse } from "@/features/_shared/types";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Calendar",
  component: Calendar,
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

const courses: ScheduleCourse[] = [
  {
    id: "1",
    code: "MAC2313",
    online: false,

    time: {
      days: ["Mon", "Wed"],
      start: 3,
      end: 5,
      display: "9AM - 10AM",
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
    code: "COP3503",
    online: false,

    time: {
      days: ["Tue", "Thu"],
      start: 15,
      end: 17,
      display: "3PM - 5PM",
    },

    location: {
      building: "CAR",
      room: "100",
      display: "CAR 100",
    },

    color: {
      bg: "#fff1f2",
      hover: "#ffe4e6",
      side: "#ffa1ad",
    },
  },
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
    code: "EGN3032",
    online: true,
    color: {
      bg: "#f5f3ff",
      hover: "#ede9fe",
      side: "#c4b4ff",
    },
  },
];

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const OnlineAndInPersonCourses: Story = {
  args: {
    courses,
    timeRange: getStartingAndEndingCourseTimes(courses),
  },
};

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
    code: "EGN3032",
    online: true,
    color: {
      bg: "#f5f3ff",
      hover: "#ede9fe",
      side: "#c4b4ff",
    },
  },
];

export const OnlineCourses: Story = {
  args: {
    courses: onlineCourses,
    timeRange: getStartingAndEndingCourseTimes(onlineCourses),
  },
};
