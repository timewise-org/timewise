import { WEEK_DAYS } from "./constants";

const DaysHeader = () => {
  return WEEK_DAYS.map((day) => (
    <div
      key={day}
      className="day-header border-dashed border-b-1 border-calendar-border text-muted-foreground"
      style={{
        gridArea: day,
      }}
    >
      {day}
    </div>
  ));
};

export { DaysHeader };
