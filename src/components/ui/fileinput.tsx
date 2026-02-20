import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";

function Component() {
  const id = useId();
  return (
    <div className="space-y-2 min-w-75">
      <Label htmlFor={id}>File input</Label>
      <Input id={id} className="p-0 pe-3 file:me-3 file:border-0 file:border-e" type="file" />
    </div>
  );
}

export { Component };