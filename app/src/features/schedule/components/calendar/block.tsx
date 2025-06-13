import clsx from "clsx";

type BlockProps = {
  children?: React.ReactNode;
  hour: number;
  day: string;
  collapsed: boolean;
};

const Block = ({ hour, day, collapsed = false, children }: BlockProps) => {
  return (
    <div
      className={clsx(
        "relative border-dashed border-r-1 border-b-1 border-calendar-border hover:bg-calendar-block-hover",
        collapsed ? "h-5" : "min-h-15",
      )}
      style={{
        gridArea: `hour${hour} / ${day}`,
      }}
    >
      {children}
    </div>
  );
};

export { Block };
