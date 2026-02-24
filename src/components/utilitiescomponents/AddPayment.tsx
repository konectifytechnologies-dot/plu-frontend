import { useQuery } from "@tanstack/react-query";
import { useGetProperties } from "@/hooks/useGetProperties";
import axios from "@/lib/axios";
import Dropdown from "../ui/dropdown";
import { Field, FieldLabel } from "../ui/field";
import TenantsDropdown from "../propertiesComponets/TenantsDropdown";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Submitbtn from "../ui/submitbtn";
import { apiRequest } from "@/lib/apirequest";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { randomId } from "@mantine/hooks";
import { MonthPicker } from "../ui/month-picker";

export default function AddPayment() {
    const { properties } = useGetProperties()
    const [loading, setLoading] = useState<any>(false);
    const [property, setProperty] = useState<any>(null);
    const [tenancy, setTenancy] = useState<any>(null);
    const [costs, setCosts] = useState<any>(null)
    const [payment_method, setPaymentMethod] = useState<any>('')
    const [month, setMonth] = useState<any>('')

    const propItems = properties && properties.data.map((prop) => {
        return { name: prop.name, id: prop.id }
    })

    const { data: tenants } = useQuery({
        queryKey: ['PROPERTY_TENANTS', { id: property ? property.id : null }],
        queryFn: async () => {
            const { data } = await axios.get(`/api/property/tenants/${property ? property.id : null}`)
            return data;
        },
        enabled: !!property
    })

    useEffect(() => {
        if (tenancy) {
            const items = tenancy.costs.map((cost) => {
                return {
                    cost: cost.cost,
                    id: cost.id,
                    title: cost.title,
                    property_id: cost.property_id,
                    amount_paid: 0,
                    description: '',
                    reference_code: '',
                }
            })
            const rent = {
                id: randomId(),
                cost: tenancy.rent,
                title: 'rent',
                property_id: property.id || null,
                amount_paid: 0,
                description: '',
                reference_code: '',
            }
            const allCosts = [rent, ...items]
            setCosts(allCosts);
        }
    }, [tenancy])

    function updateCost(id, field, value) {
        setCosts((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        [field]: value,
                    }
                    : item
            )
        );
    }

    const handleAddPayment = async () => {
        setLoading(true);
        const params = {
            property_id: property.id,
            user_id: tenancy.user_id,
            tenancy_id: tenancy.id,
            payment_method,
            date: month,
            costs,
        }
        console.log(params);
        const url = `/api/payment`
        const { data, error } = await apiRequest(() =>
            axios.post(url, params)
        )
        console.log(data, error);
        if (error) {
            setLoading(false)
            console.log(error)
        }
        if (data) {
            setLoading(false);
            setProperty(null)
            setTenancy(null)
            setCosts(null)
            setPaymentMethod(null)
            setMonth(null)
            //!isEditMode && form.reset()
            toast(data.message, { position: 'top-center' })
        }
    }
    return (
        <>
            <form >
                <Field>
                    <FieldLabel>Select Property</FieldLabel>
                    <Dropdown
                        items={propItems}
                        placeholder="Select Property"
                        value={property ? property.name : ''}
                        handleChange={(item) => setProperty(item)}
                    />
                </Field>
                <br />
                {tenants && (
                    <Field>
                        <FieldLabel>Select Tenant</FieldLabel>
                        <TenantsDropdown
                            items={tenants}
                            placeholder="Select Tenants"
                            value={tenancy ? tenancy.name : ''}
                            handleChange={(item) => setTenancy(item)}
                        />
                    </Field>
                )}

                <div className="py-4">
                    <label>Payment Method</label>
                    <Input type="text" value={payment_method} onChange={(e) => setPaymentMethod(e.target.value)} />
                </div>
                <div className="py-2">
                    <label>Select Payment Month</label>
                    <MonthPicker value={month} onChange={(value) => setMonth(value)} />
                </div>
                <br />
                {costs && (
                    <div className="gird grid-cols-1 gap-2">
                        {costs.map((cost) => (
                            <div key={cost.id} className="border-b py-2">
                                <h6 className="uppercase">{cost.title}</h6>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 py-4">
                                    <div className="col-span-full sm:col-span-3">
                                        <label>Payment For</label>
                                        <Input type="text" readOnly value={cost.title} />
                                    </div>
                                    <div className="col-span-full sm:col-span-3">
                                        <label>Amount Paid</label>
                                        <Input
                                            type="number"
                                            value={cost.amount_paid}
                                            onChange={(e) => updateCost(cost.id, 'amount_paid', e.target.valueAsNumber)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label>Reference Code</label>
                                    <Input
                                        type="text"
                                        value={cost.reference_code}
                                        onChange={(e) => updateCost(cost.id, 'reference_code', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>Description</label>
                                    <Textarea value={cost.description} onChange={(e) => updateCost(cost.id, 'description', e.target.value)} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <br />
                <Submitbtn text="Add Payment" type="button" btnfn={handleAddPayment} fullwidth={true} loading={loading} />
            </form>
        </>
    )
}