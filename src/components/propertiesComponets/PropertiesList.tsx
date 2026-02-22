import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { IconBuilding, IconMap, IconUserScreen, IconUser, IconPlus } from "@tabler/icons-react";
import { IconFolderCode } from "@tabler/icons-react"
import { ArrowUpRightIcon, Proportions } from "lucide-react"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "../ui/empty";

import { Skeleton } from "../ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import PropertyCard from "./PropertyCard";
import type { Property } from "./types/PropertyTypes";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from "../ui/input-group";
import { Search } from "lucide-react"
import { useState } from "react";
import ListPagination from "../ui/list-pagination";
import { Link } from "@tanstack/react-router";




export default function PropertiesList() {
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('')
    const { data: properties, isLoading, isPending } = useQuery({
        queryKey: ["USER_PROPERTIES", { page, query }],
        queryFn: async () => {
            const { data } = await axios.get(`/api/properties?page=${page}&query=${query}`);
            return data;
        }
    });

    const isEmpty = properties?.data.length < 1;
    const hasPagination = properties?.meta.last_page > 1;

    return (
        <>
            <Card className="@container/card">
                <CardHeader>
                    <InputGroup className="max-w-xs">
                        <InputGroupInput placeholder="Search Properties" value={query} onChange={(e) => setQuery(e.target.value)} />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                        <InputGroupAddon align="inline-end">{properties?.meta.total} Results</InputGroupAddon>
                    </InputGroup>
                </CardHeader>
                <CardContent className="px-2 sm:px-6">
                    {isLoading && (
                        <>
                            {Array(3)
                                .fill(0)
                                .map((_, index) => (
                                    <div key={index} className="flex w-fit items-center gap-4">
                                        <Skeleton className="size-10 shrink-0 rounded-full" />
                                        <div className="grid gap-2">
                                            <Skeleton className="h-4 w-37.5" />
                                            <Skeleton className="h-4 w-37.5" />
                                        </div>
                                    </div>

                                ))}
                        </>
                    )}
                    {properties && (
                        <>
                            {isEmpty && (
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon"><IconFolderCode /></EmptyMedia>
                                        <EmptyTitle>No Properties Yet</EmptyTitle>
                                        <EmptyDescription>
                                            You haven&apos;t added any properties yet. Get started by creating
                                            your first property.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                    <EmptyContent className="flex-row justify-center gap-2">
                                        <Button asChild>
                                            <Link to="/account/$role/add_property"><IconPlus /> Add Property</Link>
                                        </Button>
                                    </EmptyContent>
                                </Empty>
                            )}
                            {!isEmpty &&
                                <div className="grid grid-cols-1 gap-2">
                                    {properties.data.map((prop: Property) => (<PropertyCard key={prop.id} property={prop} />))}
                                </div>
                            }
                        </>
                    )}
                    {properties && hasPagination && <ListPagination value={page} totalPages={properties.meta.last_page} onChange={setPage} />}
                </CardContent>
            </Card>

        </>
    )
}
