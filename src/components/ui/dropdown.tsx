import { useEffect, useRef, useState } from "react"
import { useDisclosure } from "@mantine/hooks";
import { Command,CommandInput,CommandList,CommandItem, } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Skeleton } from "./skeleton";
import { IconChevronCompactDown, IconChevronCompactUp } from "@tabler/icons-react";
import { Button } from "./button";





export default function Dropdown({items=[], value, placeholder="Select",  handleChange}:any){
    const [opened, handlers] = useDisclosure(false);
    const [search, setSearch] = useState<any>('')
    const triggerRef = useRef<any>(null);
    const [triggerWidth, setTriggerWidth] = useState<any>(0);
    

     useEffect(() => {
        if (triggerRef.current) {
            setTriggerWidth(triggerRef.current.offsetWidth);
        }
    }, []);
    
    const filteredItems = items?.filter((item) =>
        item?.name?.toLowerCase().includes(search.toLowerCase())
    )

    const handleValueChange = (item:any)=> {
        handleChange && handleChange(item)
        handlers.toggle()
    }

    return(
        <>
             <Popover open={opened} onOpenChange={()=>handlers.toggle()}>
                <PopoverTrigger ref={triggerRef} asChild>
                    <Button type="button" variant="outline" className="w-full flex items-center justify-between">
                        <span>{value ?? placeholder}</span>
                        {opened ? <IconChevronCompactUp /> : <IconChevronCompactDown />}
                    </Button>
                </PopoverTrigger>
                <PopoverContent style={{width:triggerWidth}} className="p-0">
                    <Command>
                    <CommandInput
                        value={search}
                        onValueChange={setSearch}
                        placeholder="Search..."
                        className="sticky top-0 bg-white z-10 border-b border-gray-200"
                    />
                    <CommandList>
                        {items ? 
                            <>
                            {filteredItems?.length > 0 ? (
                                filteredItems?.map((item) => (
                                    <CommandItem
                                        key={item.id}
                                        onSelect={() => handleValueChange(item)}
                                        className="flex flex-col items-start"
                                    >
                                      <span  className="text-primary font-sans">{item.name}</span>
                                    </CommandItem>
                                ))
                                ) : (<div className="p-2 text-gray-500">No results found</div>)}
                            </>
                            :
                            <>
                            {Array(15)
                                .fill(0)
                                .map((_, index) => (
                                    <CommandItem key={index}>
                                        <Skeleton  className="h-4 rounded-none w-full" />
                                    </CommandItem>
                                ))} 
                            </>
                        }
                    </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

        </>
    )
}
