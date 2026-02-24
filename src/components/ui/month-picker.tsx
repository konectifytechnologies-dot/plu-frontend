import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useDisclosure } from "@mantine/hooks"

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

type MonthPickerProps = {
  value?: string
  onChange: (value: string) => void
}

export function MonthPicker({ value, onChange }: MonthPickerProps) {
  const [open, handlers] = useDisclosure(false);


  function selectMonth(month:string) {
    //const month = String(monthIndex + 1).padStart(2, "0")
    onChange(month)
    handlers.toggle()
  }

  return (
    <Popover open={open} onOpenChange={()=>handlers.toggle()}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start font-normal"
        >
          {value ? value : "Select month"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-3">
        {/* Year selector */}
    

        {/* Month grid */}
        <div className="grid grid-cols-3 gap-2">
          {MONTHS.map((month:string) => {
            const isSelected = month === value
            return (
              <Button
                key={month}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => selectMonth(month)}
                className={cn(
                  "text-xs",
                  isSelected && "pointer-events-none"
                )}
              >
                {month}
              </Button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
