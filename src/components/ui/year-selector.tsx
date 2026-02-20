import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type YearSelectorProps = {
  value?: number
  onChange: (year: number) => void
  minYear?: number
}

export function YearSelector({value,onChange,minYear = 2000}: YearSelectorProps) {
  const currentYear = new Date().getFullYear()
  const selectedYear = value ?? currentYear

  const canGoNext = selectedYear < currentYear
  const canGoPrev = selectedYear > minYear

  return (
    <div className="inline-flex items-center gap-2 rounded-md border p-1">
      {/* Previous year */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={!canGoPrev}
        onClick={() => onChange(selectedYear - 1)}
      >
        ←
      </Button>

      {/* Current value */}
      <div
        className={cn(
          "px-3 py-1 text-sm font-medium",
          selectedYear === currentYear && "text-muted-foreground"
        )}
      >
        {selectedYear}
      </div>

      {/* Next year (disabled beyond current year) */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={!canGoNext}
        onClick={() => onChange(selectedYear + 1)}
      >
        →
      </Button>
    </div>
  )
}
