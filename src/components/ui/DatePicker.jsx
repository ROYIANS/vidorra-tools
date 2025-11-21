import * as React from "react"
import { CalendarIcon } from "lucide-react"
import * as Popover from "@radix-ui/react-popover"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { Calendar } from "./Calendar"
import "./DatePicker.css"

export function DatePicker({ value, onChange, placeholder = "请选择日期", disabled, ...props }) {
  const [open, setOpen] = React.useState(false)
  const selectedDate = value ? new Date(value) : undefined

  const handleSelect = (date) => {
    if (date) {
      // 转换为 YYYY-MM-DD 格式
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const day = String(date.getDate()).padStart(2, "0")
      onChange(`${year}-${month}-${day}`)
      setOpen(false)
    }
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          className={`date-picker-trigger ${!selectedDate ? "date-picker-trigger-placeholder" : ""}`}
          disabled={disabled}
          type="button"
        >
          <CalendarIcon className="date-picker-icon" />
          <span>
            {selectedDate ? format(selectedDate, "yyyy年MM月dd日", { locale: zhCN }) : placeholder}
          </span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="date-picker-content" align="start" sideOffset={8}>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
            initialFocus
            {...props}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default DatePicker
