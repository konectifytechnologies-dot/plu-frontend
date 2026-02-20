import { MoveRight } from "lucide-react";
import { Button } from "./button";
import { Spinner } from "./spinner";
import { cn } from "@/lib/utils";
import type { MouseEventHandler } from "react";

type SubmitbtnProps = {
    text:string
    fullwidth?:Boolean
    loading?:Boolean
    //disabled?:Boolean | undefined
    type?: 'button' | 'submit' | 'reset',
    btnfn?: MouseEventHandler<HTMLButtonElement>
}

export default function Submitbtn({text, fullwidth = false, type = "submit", loading, btnfn }: SubmitbtnProps) {
    //const btntype = type ? type : 'submit';
    const variant =  loading ? 'outline' : 'default';

    return (
        <>
            <Button type={type} className={cn('cursor-pointer', fullwidth && 'w-full')}  variant={variant} onClick={btnfn ? btnfn : undefined} >
                {loading ?
                    <span className="flex items-center gap-2">
                        <span className="text-muted-foreground font-text tracking-tight text-sm">Loading...</span>
                        <Spinner />
                    </span> :
                    <span className="flex items-center gap-2 font-sans">
                        <span>{text}</span>
                        <span><MoveRight /></span>
                    </span>
                }
            </Button>
        </>
    )
}