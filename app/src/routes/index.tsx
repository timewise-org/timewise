import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { Select } from "@base-ui-components/react/select";
import { Plan } from "@/features/plan/components";
import type { Course } from "@/types/plan";
import { Calendar } from "@/features/schedule/components/calendar";
import { DateTime } from "luxon";
import type { ScheduleCourse } from "@/types";
import { getStartingAndEndingCourseTimes } from "@/features/schedule/components/calendar/utils";

const coursesaa: Course[] = [
  {
    id: "1",
    code: "MAC2303",
    name: "Calculus 3",
    description: "this is a description",

    credits: {
      min: 4,
      max: 4,
      display: "4",
    },
  },

  {
    id: "2",
    code: "ENT3003",
    name: "Intro to Entrepreneurship",
    description: "this is a description",

    credits: {
      min: 3,
      max: 3,
      display: "3",
    },
  },

  {
    id: "3",
    code: "ACG2001",
    name: "Financial Accounting",
    description: "this is a description",

    credits: {
      min: 4,
      max: 4,
      display: "4",
    },
  },
];
const formatString = "h:mm a";
const dateTimeOpts = {
  zone: "utc",
};

const coursestest: ScheduleCourse[] = [
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
export const Route = createFileRoute("/")({
  component: App,
});

function ExampleSelect() {
  return (
    <Select.Root defaultValue="sans">
      <Select.Trigger className="flex min-w-36 items-center justify-between gap-3 rounded-md border border-gray-200 pr-3 pl-3.5 text-base text-gray-900 select-none hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100 data-[popup-open]:bg-gray-100">
        <Select.Value placeholder="Sans-serif" />
        <Select.Icon className="flex">
          <ChevronUpDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner className="outline-none" sideOffset={8}>
          <Select.ScrollUpArrow className="top-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute before:top-[-100%] before:left-0 before:h-full before:w-full before:content-[''] data-[direction=down]:bottom-0 data-[direction=down]:before:bottom-[-100%]" />
          <Select.Popup className="group [max-height:var(--available-height)] origin-[var(--transform-origin)] overflow-y-auto rounded-md bg-[canvas] py-1 text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:scale-100 data-[ending-style]:opacity-0 data-[ending-style]:opacity-100 data-[ending-style]:transition-none data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
            <Select.Item
              className="grid min-w-[var(--anchor-width)] cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 text-sm leading-4 outline-none select-none group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4 data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-gray-50 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-gray-900"
              value="sans"
            >
              <Select.ItemIndicator className="col-start-1">
                <CheckIcon className="size-3" />
              </Select.ItemIndicator>
              <Select.ItemText className="col-start-2">
                Sans-serif
              </Select.ItemText>
            </Select.Item>
            <Select.Item
              className="grid min-w-[var(--anchor-width)] cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 text-sm leading-4 outline-none select-none group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4 data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-gray-50 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-gray-900"
              value="serif"
            >
              <Select.ItemIndicator className="col-start-1">
                <CheckIcon className="size-3" />
              </Select.ItemIndicator>
              <Select.ItemText className="col-start-2">Serif</Select.ItemText>
            </Select.Item>
            <Select.Item
              className="grid min-w-[var(--anchor-width)] cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 text-sm leading-4 outline-none select-none group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4 data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-gray-50 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-gray-900"
              value="mono"
            >
              <Select.ItemIndicator className="col-start-1">
                <CheckIcon className="size-3" />
              </Select.ItemIndicator>
              <Select.ItemText className="col-start-2">
                Monospace
              </Select.ItemText>
            </Select.Item>
            <Select.Item
              className="grid min-w-[var(--anchor-width)] cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 text-sm leading-4 outline-none select-none group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4 data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-gray-50 data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-1 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1] data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-gray-900"
              value="cursive"
            >
              <Select.ItemIndicator className="col-start-1">
                <CheckIcon className="size-3" />
              </Select.ItemIndicator>
              <Select.ItemText className="col-start-2">Cursive</Select.ItemText>
            </Select.Item>
          </Select.Popup>
          <Select.ScrollDownArrow className="bottom-0 z-[1] flex h-4 w-full cursor-default items-center justify-center rounded-md bg-[canvas] text-center text-xs before:absolute before:top-[-100%] before:left-0 before:h-full before:w-full before:content-[''] data-[direction=down]:bottom-0 data-[direction=down]:before:bottom-[-100%]" />
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

function ChevronUpDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M0.5 4.5L4 1.5L7.5 4.5" />
      <path d="M0.5 7.5L4 10.5L7.5 7.5" />
    </svg>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="currentcolor"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      {...props}
    >
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}

function App() {
  return (
    <div>
      <Topbar />
      <div className="mt-2 flex ml-75 items-center">
        <div className="inline-flex h-8 gap-1 items-center justify-center border-0 px-2 text-sm rounded-mdoutline-none select-none">
          <ExampleSelect />
        </div>
        <button className="rounded-md inline-flex gap-1 h-8 items-center justify-center border-0 px-2 text-sm font-medium text-gray-600 outline-none select-none hover:text-gray-900 data-[selected]:text-gray-900 hover:bg-gray-200">
          <span>Plans</span>
        </button>
      </div>
      <div className="flex mt-5 justify-center max-w-[1200px]">
        {/* <Plan
          fourYearPlan={[
            {
              semesters: {
                fall: {
                  courses,
                },
                spring: {
                  courses,
                },
                summer: {
                  courses,
                },
              },
            },
            {
              semesters: {
                fall: {
                  courses,
                },
                spring: {
                  courses,
                },
                summer: {
                  courses,
                },
              },
            },
          ]}
        /> */}
        <div className="flex-1">Test</div>
        <div className="flex-1">
          <Calendar
            courses={coursestest}
            timeIntervalToRender={getStartingAndEndingCourseTimes(coursestest)}
          />
        </div>
      </div>
    </div>
  );
}
