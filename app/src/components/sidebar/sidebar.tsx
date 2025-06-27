import { SidebarItem } from "./sidebar-item";
import TablerCalendarMonth from "~icons/tabler/calendar-month";
import TablerBook2 from "~icons/tabler/book-2";
import TablerTools from "~icons/tabler/tools";

// https://flowbite.com/docs/components/sidebar/
const Sidebar = () => {
  return (
    <div>
      <aside
        id="sidebar"
        className="fixed top-0 left-0 z-40 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="flex items-center h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium mb-30">
            <SidebarItem label="schedule">
              <TablerCalendarMonth className="text-gray-500" />
            </SidebarItem>
            <SidebarItem>
              <TablerBook2 className="text-gray-500" />
            </SidebarItem>
            <SidebarItem>
              <TablerTools className="text-gray-500" />
            </SidebarItem>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export { Sidebar };
