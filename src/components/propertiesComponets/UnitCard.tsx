import { IconTrash } from "@tabler/icons-react";
import Addnew from "../ui/add-new";
import AddUnit from "./AddUnit";
import type { UnitType } from "./types/PropertyTypes"
import { Button } from "../ui/button";

interface UnitProps {
    unit:UnitType,
}
export default function UnitCard({unit}:UnitProps){
    const {name, tenant, bedrooms} = unit;
    return(
        <>
            <div className="bg-white border rounded-2xl py-2 px-4 flex flex-col md:flex-row items-center justify-between">
                <button className="flex items-center gap-2">
                    <div className="bg-purple-100 font-medium text-slate-900 rounded-2xl w-16 h-16 grid place-items-center ">
                        <span className="font-semibold">{name}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-left">Tenant: {tenant}</p>
                        <span className="text-sm font-semibold">Number of Bedrooms: {bedrooms}</span>
                    </div>
                </button>
                <div className="flex items-center gap-2">
                    <Addnew 
                        label="Edit Unit"
                        title="Edit Unit"
                        description="Edit This Unit"
                        fullwidth={false}
                    >
                        <AddUnit initialData={unit} />
                    </Addnew>
                    <Button>
                        <IconTrash /> Delete
                    </Button>
                </div>
            </div>
        </>
    )
}