import type { ScheduleCourse } from "@/types";

type OnlineSectionProps = {
  courses: ScheduleCourse[];
};
const OnlineSection = ({ courses }: OnlineSectionProps) => {
  const onlineClasses = courses.filter((c) => c.online);

  return (
    onlineClasses.length > 0 && (
      <div className="flex w-full text-sm">
        <div
          // className="text-[10px] sm:text-xs text-muted-foreground"
          className="text-[10px] text-muted-foreground relative -left-1"
          style={{
            width: "34px",
          }}
        >
          Online
        </div>
        <div className="grow-1">
          {onlineClasses.map((c) => {
            return (
              <div
                key={c.id}
                className="relative min-h-15 border-dashed border-r-1 border-b-1 border-outline"
              >
                <div
                  className="flex absolute w-full h-full cursor-pointer z-50"
                  style={{
                    backgroundColor: c.color.bg,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = c.color.hover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = c.color.bg;
                  }}
                >
                  <div
                    className="w-1 h-full"
                    style={{
                      backgroundColor: c.color.side,
                    }}
                  ></div>
                  <div className="px-1 text-[11px] sm:text-sm">
                    <p className="py-1 font-sm">{c.code}</p>
                    <p className="text-muted-foreground font-xs">💻 Online</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export { OnlineSection };
