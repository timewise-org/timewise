import TablerCalendarMonth from "~icons/tabler/calendar-month";
import TablerBook2 from "~icons/tabler/book-2";
import TablerTools from "~icons/tabler/tools";

const Topbar = () => {
  return (
    <div className="flex justify-center items-center py-2 border border-b-1 transition-opacity duration-200">
      <div className="inline-flex h-8 gap-1 items-center justify-center border-0 px-2 text-md font-medium rounded-md text-gray-600 outline-none select-none hover:text-gray-900 hover:bg-gray-200 data-[selected]:text-gray-900">
        <TablerCalendarMonth className="text-gray-500" />
        <span>Schedules</span>
      </div>
      <button className="rounded-md inline-flex gap-1 h-8 items-center justify-center border-0 px-2 text-md font-medium text-gray-600 outline-none select-none hover:text-gray-900 data-[selected]:text-gray-900 hover:bg-gray-200">
        <TablerBook2 className="text-gray-500" />
        <span>Plans</span>
      </button>
      <button className="rounded-md inline-flex gap-1 h-8 items-center justify-center border-0 px-2 text-md font-medium text-gray-600 outline-none select-none hover:text-gray-900 data-[selected]:text-gray-900 hover:bg-gray-200">
        <TablerTools className="text-gray-500" />
        <span>Build</span>
      </button>
    </div>
  );
};

export { Topbar };
