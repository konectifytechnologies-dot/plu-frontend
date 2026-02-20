import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { cn } from "@/lib/utils"
import { IconPlus } from "@tabler/icons-react"
import type { ReactNode } from 'react'

type AddNewProps = {
    label:string,
    title:string,
    description:string,
    fullwidth:Boolean,
    children:any

}

export default function Addnew(props:AddNewProps){
    const {label, title, description, fullwidth=true, children} = props
    return(
        <>
            <Dialog>
            <DialogTrigger asChild>
                <Button className={cn('w-fit cursor-pointer', fullwidth && 'w-full')}><IconPlus />{label}</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] bg-gray-50 flex flex-col">
                <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto py-2">
                {children}
                </div>

                <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
    )
}