import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { zhCN } from "date-fns/locale"
import "./Calendar.css"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  fromYear = 1900,
  toYear = new Date().getFullYear(),
  captionLayout = "dropdown-buttons",
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={`calendar ${className || ''}`}
      locale={zhCN}
      captionLayout={captionLayout}
      fromYear={fromYear}
      toYear={toYear}
      classNames={{
        months: "calendar-months",
        month: "calendar-month",
        caption: "calendar-caption",
        caption_label: "calendar-caption-label calendar-vhidden",
        caption_dropdowns: "calendar-caption-dropdowns",
        dropdown: "calendar-dropdown",
        dropdown_month: "calendar-dropdown-month",
        dropdown_year: "calendar-dropdown-year",
        dropdown_icon: "calendar-dropdown-icon",
        vhidden: "calendar-vhidden",
        nav: "calendar-nav",
        nav_button: "calendar-nav-button",
        nav_button_previous: "calendar-nav-button-previous",
        nav_button_next: "calendar-nav-button-next",
        table: "calendar-table",
        head_row: "calendar-head-row",
        head_cell: "calendar-head-cell",
        row: "calendar-row",
        cell: "calendar-cell",
        day: "calendar-day",
        day_range_end: "calendar-day-range-end",
        day_selected: "calendar-day-selected",
        day_today: "calendar-day-today",
        day_outside: "calendar-day-outside",
        day_disabled: "calendar-day-disabled",
        day_range_middle: "calendar-day-range-middle",
        day_hidden: "calendar-day-hidden",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="calendar-chevron" />,
        IconRight: ({ ...props }) => <ChevronRight className="calendar-chevron" />,
      }}
      {...props}
    />
  )
}

export { Calendar }
