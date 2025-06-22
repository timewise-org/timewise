import { DateTime, Interval } from "luxon";

const formatString = "h:mm a";

const excludedBlocks = [
  {
    start: DateTime.fromFormat("1:00 AM", formatString),
    end: DateTime.fromFormat("8:01 AM", formatString),
  },
];

const courses = [
  {
    id: "1",
    code: "MAC2313",
    online: false,

    meetings: [
      {
        time: {
          days: ["Mon", "Wed"],
          start: DateTime.fromFormat("8:00 AM", formatString),
          end: DateTime.fromFormat("10:00 AM", formatString),
        },

        location: {
          building: "test",
          room: "300",
        },
      },
      {
        time: {
          days: ["Tue"],
          start: DateTime.fromFormat("3:30 PM", formatString),
          end: DateTime.fromFormat("4:30 PM", formatString),
        },

        location: {
          building: "test",
          room: "300",
        },
      },
    ],
  },
  {
    id: "2",
    code: "COP3503",
    online: false,

    meetings: [
      {
        time: {
          days: ["Thu", "Fri"],
          start: DateTime.fromFormat("9:45 AM", formatString),
          end: DateTime.fromFormat("10:45 AM", formatString),
        },

        location: {
          building: "test",
          room: "300",
        },
      },
      {
        time: {
          days: ["Mon"],
          start: DateTime.fromFormat("7:30 PM", formatString),
          end: DateTime.fromFormat("8:30 PM", formatString),
        },

        location: {
          building: "test",
          room: "300",
        },
      },
    ],
  },
  // {
  //   id: "3",
  //   code: "ENT3003",
  //   online: true,

  //   color: {
  //     bg: "#f0fdf4",
  //     hover: "#dcfce7",
  //     side: "#7bf1a8",
  //   },
  // },

  // {
  //   id: "4",
  //   code: "EGN3032",
  //   online: true,
  //   color: {
  //     bg: "#f5f3ff",
  //     hover: "#ede9fe",
  //     side: "#c4b4ff",
  //   },
  // },
];

function build(courses, excludedBlocks) {
  let validCourses = [];

  courses.forEach((course) => {
    let isCourseInvalid = false;

    for (let i = 0; i < course.meetings.length; i++) {
      const meeting = course.meetings[i];
      const time = meeting.time;

      const interval = Interval.fromDateTimes(time.start, time.end);

      for (let j = 0; j < excludedBlocks.length; j++) {
        const filter = excludedBlocks[j];

        const interval2 = Interval.fromDateTimes(filter.start, filter.end);

        if (interval.overlaps(interval2)) {
          isCourseInvalid = true;
          break;
        }
      }

      if (isCourseInvalid) break;
    }

    if (!isCourseInvalid) {
      validCourses.push(course);
    }
  });

  return validCourses;
}

console.log(build(courses, excludedBlocks));
