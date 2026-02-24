import { useState } from "react"
import { Input } from "../ui/input"
import { IconMail , IconLock, IconEye, IconEyeOff, IconUser, IconPhone} from '@tabler/icons-react';
import { useForm } from '@tanstack/react-form'
import {   Field,
  FieldError,
  FieldGroup,
  FieldLabel,
 } from "../ui/field";
 import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Separator } from "../ui/separator";
import axios from "@/lib/axios";
import { csrf, getLoggedInUser } from "@/lib/auth";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import Submitbtn from "../ui/submitbtn";

 

export default function RegisterForm(){
    const [isVisible, setIsVisible] = useState<Boolean>(false);
    const toggleVisibility = () => setIsVisible((prevState) => !prevState);
    const [error, setError] = useState<String | null>(null)
    const [loading, setLoading] = useState<Boolean>(false);
    const navigate = useNavigate()

    const handleLogin = async(values)=> {
        try{
            setLoading(true)
            await csrf();
            const params = {
                name:values.name,
                email:values.email,
                number:values.number,
                role:'agent',
                password:values.password,
                password_confirmation:values.password
            }
            await axios.post('/api/register', params);
            const user = await getLoggedInUser();
            if(user){
                navigate({
                    to:'/account/$role/home',
                    params:{role:user.role},
                    replace:true
                })
            }
        }catch (error: any) {
            if (error.response?.status === 422) {
               setError('Incorrect Password or Email, Please check and try again') 
            }
        }
    }

    const form = useForm({
        defaultValues: {
            name:'',
            email:'',
            number: "",
            role:'agent',
            password:""
        },
        onSubmit:async({value})=> {
            await handleLogin(value)
        }
    })

    

    return(
        <>
             {error && (
                <Alert variant="destructive" className="max-w-md">
                <AlertCircleIcon />
                <AlertTitle>Login failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <form 
                id="login_form"
                onSubmit={(e)=> {
                    e.preventDefault()
                    form.handleSubmit()
                }}
            >
                <form.Field
                        name="name"
                        children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                                <InputGroup className="bg-white py-4">
                                    <InputGroupInput 
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        aria-invalid={isInvalid}
                                        placeholder="e.g 070000"
                                        //className="bg-white"
                                        autoComplete="off"
                                    />
                                    <InputGroupAddon align="inline-start">
                                        <IconUser className="text-muted-foreground" />
                                    </InputGroupAddon>
                                </InputGroup>
                                {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field>
                            )
                        }}
                />
                <form.Field
                        name="email"
                        children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                            <Field data-invalid={isInvalid} className="py-4">
                                <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                                <InputGroup className="bg-white py-4">
                                    <InputGroupInput 
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        aria-invalid={isInvalid}
                                        //className="bg-white"
                                        autoComplete="off"
                                    />
                                    <InputGroupAddon align="inline-start">
                                        <IconMail className="text-muted-foreground" />
                                    </InputGroupAddon>
                                </InputGroup>
                                {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field>
                            )
                        }}
                    />
                <FieldGroup>
                    <form.Field
                        name="number"
                        children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                                <InputGroup className="bg-white py-4">
                                    <InputGroupInput 
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        aria-invalid={isInvalid}
                                        placeholder="e.g 070000"
                                        //className="bg-white"
                                        autoComplete="off"
                                    />
                                    <InputGroupAddon align="inline-start">
                                        <IconPhone className="text-muted-foreground" />
                                    </InputGroupAddon>
                                </InputGroup>
                                {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field>
                            )
                        }}
                    />

                    <form.Field
                        name="password"
                        children={(field) => {
                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                <div className="relative">
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        className="ps-9 bg-white py-4"
                                        placeholder="Enter your password"
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        aria-invalid={isInvalid}
                                        type={isVisible ? "text" : "password"}
                                    />
                                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                        <IconLock size={16} aria-hidden="true" />
                                    </div>
                                    <button
                                        className="text-muted-foreground/80 cursor-pointer hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                        type="button"
                                        onClick={toggleVisibility}
                                    >
                                    {isVisible ? (
                                        <IconEyeOff size={16} aria-hidden="true" />
                                    ) : (
                                        <IconEye size={16} aria-hidden="true" />
                                    )}
                                    </button>
                                </div>
                                {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                                )}
                            </Field>
                            )
                        }}
                    />
                    
                </FieldGroup>
                <Separator className="my-4" />
                <Submitbtn text="Create Account" fullwidth={true} type="submit" loading={loading} />
            </form>
        </>
    )
}