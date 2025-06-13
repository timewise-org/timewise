import type { InPersonCourse } from "@/features/_shared/types";

type CourseBlockProps = {
  course: InPersonCourse;
};

const CourseBlock = ({ course }: CourseBlockProps) => {
  return (
    <div
      className="flex absolute w-full cursor-pointer z-2"
      style={{
        height: `${60 * (course.time.end - course.time.start) - 1}px`,
        backgroundColor: course.color.bg,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = course.color.hover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = course.color.bg;
      }}
    >
      <div
        className="w-[3px] h-full"
        style={{
          backgroundColor: course.color.side,
        }}
      ></div>
      <div className="w-full">
        <p className="px-1 pt-1 font-medium truncate w-full text-[11px] sm:text-sm">
          {course.code}
        </p>
        <div className="flex items-center py-1 sm:py-2">
          <span className="hidden px-1 sm:block text-xs">⏰</span>
          <span className="text-[10px] pl-1 sm:pl-0 sm:text-xs">
            {course.time.display}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-destructive hidden px-1 sm:block text-xs">
            📍
          </span>
          <span className="text-[10px] pl-1 sm:pl-0 sm:text-xs">
            {course.location.display}
          </span>
        </div>
      </div>
    </div>
  );
};

export { CourseBlock };
