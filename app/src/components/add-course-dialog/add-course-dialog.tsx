import Modal from "@/components/modal";
import { SearchIcon } from "@/components/icons/search-icon";
import { Input } from "@headlessui/react";
import clsx from "clsx";
import type { Course } from "@/types";
import { useState } from "react";
import { SearchResult } from "./search-result";
import { Dialog } from "@base-ui-components/react/dialog";

type SearchProps = {
  isOpen: boolean;
  toggle: () => void;
  onAddCourse?: (courseCode: string) => void;
};

function AddCourseDialog({ isOpen, toggle, onAddCourse }: SearchProps) {
  const [searchResults] = useState<Course[]>([
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
      id: "3",
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
      id: "5",
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
      id: "4",
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
      id: "8",
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
      id: "7",
      code: "MAC2303",
      name: "Calculus 3",
      description: "this is a description",

      credits: {
        min: 4,
        max: 4,
        display: "4",
      },
    },
  ]);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <>
        <div className="p-2 space-y-3">
          <Dialog.Title>Spring 2025</Dialog.Title>
          <div className="flex items-center rounded-md px-1 border-1">
            <SearchIcon />
            <Input
              type="text"
              className={clsx(
                "block w-full rounded-lg px-2 py-1.5 outline-none text-md",
              )}
              placeholder="Search a course"
              autoFocus
            />
          </div>
          <div>
            <p className="text-sm">3 Results</p>
          </div>
        </div>
        <div className="max-h-106 overflow-y-auto overflow-x-hidden">
          <div className="p-2">
            {searchResults.map((result) => (
              <SearchResult
                key={result.id}
                result={result}
                onAddCourse={onAddCourse}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-4 justify-between p-2">
          <p className="text-sm w-[80%]">
            NOTE: Not all courses will be offered for the semester you have
            chosen. Make sure you check its availability on ONE.UF before your
            registration time!
          </p>
          <button
            className="p-2 cursor-pointer text-red-400 hover:bg-slate-100 rounded-md"
            onClick={toggle}
          >
            Cancel
          </button>
        </div>
      </>
    </Modal>
  );
}

export { AddCourseDialog };
