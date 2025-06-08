type BlockProps = {
  children: React.ReactNode;
  hour: number;
  day: string;
};

const Block = ({ hour, day, children }: BlockProps) => {
  return (
    <div
      className="relative min-h-19 border-dashed border-r-1 border-b-1 border-calendar-border hover:bg-calendar-block-hover"
      style={{
        gridArea: `hour${hour} / ${day}`,
      }}
    >
      {children}
    </div>
  );
};

export { Block };
