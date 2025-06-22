import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "@/features/schedule/components/calendar";
import type { ScheduleCourse } from "@/types";
import { getStartingAndEndingCourseTimes } from "@/features/schedule/components/calendar/utils";
import { DateTime } from "luxon";

export const Route = createFileRoute("/")({
  component: App,
});

const formatString = "h:mm a";
const dateTimeOpts = {
  zone: "utc",
};

function App() {
  // const classes = [
  //   {
  //     id: 1,
  //     code: "MAC2313",
  //     location: "LIT 100",
  //     periodStart: "hour2",
  //     periodStartNum: 2,
  //     day: "Mon",
  //     periodLength: 2,
  //     time: "9AM - 11AM",
  //     color: {
  //       bg: "#fff7ed",
  //       hover: "#ffedd4",
  //       side: "#ffb86a",
  //     },
  //   },
  //   {
  //     id: 2,
  //     code: "COP3503",
  //     location: "CAR 100",
  //     periodStart: "hour2",
  //     periodStartNum: 8,
  //     day: "Wed",
  //     periodLength: 1,
  //     time: "7AM - 8AM",
  //     color: {
  //       bg: "#fff1f2",
  //       hover: "#ffe4e6",
  //       side: "#ffa1ad",
  //     },
  //   },
  //   {
  //     id: 3,
  //     code: "ENT3003",
  //     online: true,
  //     color: {
  //       bg: "#f0fdf4",
  //       hover: "#dcfce7",
  //       side: "#7bf1a8",
  //     },
  //   },
  //   {
  //     id: 4,
  //     code: "EGN3032",
  //     online: true,
  //     color: {
  //       bg: "#f5f3ff",
  //       hover: "#ede9fe",
  //       side: "#c4b4ff",
  //     },
  //   },
  // ];
  const courses: ScheduleCourse[] = [
    {
      id: "1",
      code: "MAC2313",
      courseId: "test",
      online: false,
      meetings: [
        {
          time: {
            days: ["Mon", "Wed"],
            start: DateTime.fromFormat("8:20 AM", formatString, dateTimeOpts),
            end: DateTime.fromFormat("9:20 AM", formatString, dateTimeOpts),
            display: "8:30AM - 10:00AM",
          },

          location: {
            building: "LIT",
            room: "100",
            display: "LIT 100",
          },
        },
      ],

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
      courseId: "test",

      meetings: [
        {
          time: {
            days: ["Tue", "Thu"],
            start: DateTime.fromFormat("3:00 PM", formatString, dateTimeOpts),
            end: DateTime.fromFormat("4:00 PM", formatString, dateTimeOpts),
            display: "3PM - 4PM",
          },

          location: {
            building: "LIT",
            room: "100",
            display: "LIT 100",
          },
        },
        {
          time: {
            days: ["Fri"],
            start: DateTime.fromFormat("6:00 PM", formatString, dateTimeOpts),
            end: DateTime.fromFormat("8:00 PM", formatString, dateTimeOpts),
            display: "6PM - 8PM",
          },

          location: {
            building: "LIT",
            room: "100",
            display: "LIT 100",
          },
        },
      ],

      color: {
        bg: "#fff1f2",
        hover: "#ffe4e6",
        side: "#ffa1ad",
      },
    },
    {
      id: "3",
      code: "ENT3003",
      courseId: "test",
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
      courseId: "test",

      online: true,
      color: {
        bg: "#f5f3ff",
        hover: "#ede9fe",
        side: "#c4b4ff",
      },
    },
  ];

  return (
    <div>
      <Calendar
        courses={courses}
        timeIntervalToRender={getStartingAndEndingCourseTimes(courses)}
        compact
      />
    </div>
  );
}
