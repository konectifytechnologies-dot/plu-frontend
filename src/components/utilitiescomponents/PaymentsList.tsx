import axios from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export default function PaymentList(){
    const [page, setPage] = useState(1)
    const [month, setMonth] = useState('')
    const [query, setQuery] = useState('');
    const [year, setYear] = useState(new Date().getFullYear())
    const MONTHS = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ]

    const {data:payments, isLoading} = useQuery({
        queryKey:['PAYMENTS', {page, month, year, query}],
        queryFn: async()=> {
            const {data} = await axios.get(`/api/payments?page=${page}&query=${query}&year=${year}&month=${month}`)
            return data
        }
    })
    console.log(payments);
    return(
        <>

        </>
    )
}