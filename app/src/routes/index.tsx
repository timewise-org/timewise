import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "@/features/schedule/components/calendar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarRight } from "@/components/sidebar-right";
import { LoginForm } from "@/features/auth/components/login-form";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div>
      <Calendar
        classes={[
          {
            id: 1,
            code: "MAC2313",
            location: "LIT 100",
            periodStart: "hour2",
            periodStartNum: 2,
            day: "Mon",
            periodLength: 2,
            time: "9AM - 11AM",
            color: {
              bg: "#fff7ed",
              hover: "#ffedd4",
              side: "#ffb86a",
            },
          },
          {
            id: 2,
            code: "COP3503",
            location: "CAR 100",
            periodStart: "hour2",
            periodStartNum: 8,
            day: "Wed",
            periodLength: 1,
            time: "7AM - 8AM",
            color: {
              bg: "#fff1f2",
              hover: "#ffe4e6",
              side: "#ffa1ad",
            },
          },
          {
            id: 3,
            code: "ENT3003",
            online: true,
            color: {
              bg: "#f0fdf4",
              hover: "#dcfce7",
              side: "#7bf1a8",
            },
          },
          {
            id: 4,
            code: "EGN3032",
            online: true,
            color: {
              bg: "#f5f3ff",
              hover: "#ede9fe",
              side: "#c4b4ff",
            },
          },
        ]}
      />
    </div>
  );
}

// function App() {
//   return (
//     <SidebarProvider>
//       <AppSidebar side="left" />
//       <SidebarInset>
//         <header className="sticky top-0 flex justify-between shrink-0 items-center gap-2 bg-background p-4 z-3">
//           <SidebarTrigger className="-ml-1" />
//           <SidebarTrigger isRightSidebar className="-ml-1" />
//         </header>
//         <div className="flex flex-1 px-4">
//           <div className="grow-1">
//             <Calendar
//               classes={[
//                 {
//                   id: 1,
//                   code: "MAC2313",
//                   location: "LIT 100",
//                   periodStart: "period1",
//                   periodStartNum: 1,
//                   day: "Mon",
//                   periodLength: 2,
//                   time: "9AM - 11AM",
//                   color: {
//                     bg: "#fff7ed",
//                     hover: "#ffedd4",
//                     side: "#ffb86a",
//                   },
//                 },
//                 {
//                   id: 2,
//                   code: "COP3503",
//                   location: "CAR 100",
//                   periodStart: "period8",
//                   periodStartNum: 8,
//                   day: "Wed",
//                   periodLength: 1,
//                   time: "7AM - 8AM",
//                   color: {
//                     bg: "#fff1f2",
//                     hover: "#ffe4e6",
//                     side: "#ffa1ad",
//                   },
//                 },
//                 {
//                   id: 3,
//                   code: "ENT3003",
//                   online: true,
//                   color: {
//                     bg: "#f0fdf4",
//                     hover: "#dcfce7",
//                     side: "#7bf1a8",
//                   },
//                 },
//                 {
//                   id: 4,
//                   code: "EGN3032",
//                   online: true,
//                   color: {
//                     bg: "#f5f3ff",
//                     hover: "#ede9fe",
//                     side: "#c4b4ff",
//                   },
//                 },
//               ]}
//             />
//           </div>
//         </div>
//       </SidebarInset>
//       <SidebarRight side="right" />
//     </SidebarProvider>
//   );
// }
