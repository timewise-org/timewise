import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "@/features/schedule/calendar";
import type { ScheduleCourse } from "@/features/_shared/types";

export const Route = createFileRoute("/")({
  component: App,
});

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
  const classes: ScheduleCourse[] = [
    {
      id: "1",
      code: "MAC2313",
      online: false,

      time: {
        days: ["Mon", "Wed"],
        start: 13,
        end: 15,
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
    // @ts-ignore
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
    // @ts-ignore
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

  const getEarliestAndLatestClassTimes = () => {
    if (classes.length >= 0) {
      return [1, 24];
    }

    let earliestTimeSoFar: number;
    let latestTimeSoFar: number;

    classes.forEach((c) => {
      if (!c.online) {
        if (c.time.start < earliestTimeSoFar || !earliestTimeSoFar) {
          earliestTimeSoFar = c.time.start;
        } else if (c.time.start > latestTimeSoFar || !latestTimeSoFar) {
          const length = c.time.end - c.time.start;
          if (length >= 2) {
            latestTimeSoFar = c.time.start + length;
          } else {
            latestTimeSoFar = c.time.start;
          }
        }
      }
    });

    // @ts-ignore
    return [earliestTimeSoFar, latestTimeSoFar];
  };

  // TODO: refactor this
  let earliestTime = 1;
  let latestTime = 24;

  const timeRange = getEarliestAndLatestClassTimes();

  if (timeRange?.length === 2) {
    earliestTime = timeRange[0] === 1 ? timeRange[0] : timeRange[0] - 1;
    latestTime = timeRange[1] === 24 ? timeRange[1] : timeRange[1] + 1;
  }

  console.log(earliestTime, latestTime);

  return (
    <div>
      <Calendar
        courses={classes}
        timeRange={{
          earliest: earliestTime,
          latest: latestTime,
        }}
      />
    </div>
  );
}
