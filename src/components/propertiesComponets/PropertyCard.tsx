import { Link } from "@tanstack/react-router"
import { Button } from "../ui/button"
import type { Property } from "./types/PropertyTypes"
import { IconEdit, IconEye } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"

interface PropertyProps {
    property: Property
}
export default function PropertyCard({property}:PropertyProps){
    const { role } = useParams({ strict: false })
    const {id, name, picture, landlord, agent} = property

    return(
        <>
            <div className="w-full justify-between flex items-center gap-3 rounded-2xl border p-2 text-left ">
                <div className="flex items-center gap-3">
                    <img src={picture as string} alt={name + 'Picture'} className="h-18 w-18 object-cover rounded-2xl bg-muted/30" />
                    <div className="flex-1 min-w-0 space-y-0.5">
                        <p className="text-sm font-medium truncate">{name}</p>
                        <span className="text-sm block">Owned By: {landlord}</span>
                        <span className="text-sm">Managed By: {agent}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2"> 
                    <Button asChild>
                        <Link 
                            to={`/account/${role}/property/${id}`}
                            //params={{role, id}}
                        >
                            <IconEye />View Property
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link 
                            to={`/account/$role/add_property?property_id=${id}`}
                            //search={{property_id:id}}
                        >
                            <IconEdit />
                            Edit Property
                        </Link>

                    </Button>
                </div>
            </div>
        </>
    )
}