import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Input } from "../ui/input";
import { IconMail, IconLock, IconEye, IconEyeOff } from '@tabler/icons-react';
import { useForm } from '@tanstack/react-form';
import { Field, FieldError, FieldGroup, FieldLabel, } from "../ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput, } from "@/components/ui/input-group";
import { Separator } from "../ui/separator";
import axios from "@/lib/axios";
import { csrf, getLoggedInUser } from "@/lib/auth";
import { loginSchema } from "@/schemas";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import Submitbtn from "../ui/submitbtn";
export default function LoginForm() {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible((prevState) => !prevState);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async (values) => {
        try {
            setLoading(true);
            await csrf();
            await axios.post('/api/login', values);
            const user = await getLoggedInUser();
            if (user) {
                navigate({
                    to: '/account/$role/home',
                    params: { role: user.role },
                    replace: true
                });
            }
        }
        catch (error) {
            if (error.response?.status === 422) {
                setError('Incorrect Password or Email, Please check and try again');
            }
        }
    };
    const form = useForm({
        defaultValues: {
            number: "",
            password: ""
        },
        validators: {
            onSubmit: loginSchema,
        },
        onSubmit: async ({ value }) => {
            await handleLogin(value);
        }
    });
    return (_jsxs(_Fragment, { children: [error && (_jsxs(Alert, { variant: "destructive", className: "max-w-md", children: [_jsx(AlertCircleIcon, {}), _jsx(AlertTitle, { children: "Login failed" }), _jsx(AlertDescription, { children: error })] })), _jsxs("form", { id: "login_form", onSubmit: (e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }, children: [_jsxs(FieldGroup, { children: [_jsx(form.Field, { name: "number", children: (field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (_jsxs(Field, { "data-invalid": isInvalid, children: [_jsx(FieldLabel, { htmlFor: field.name, children: "Phone Number" }), _jsxs(InputGroup, { className: "bg-white py-4", children: [_jsx(InputGroupInput, { id: field.name, name: field.name, value: field.state.value, onBlur: field.handleBlur, onChange: (e) => field.handleChange(e.target.value), "aria-invalid": isInvalid, placeholder: "e.g 070000", 
                                                        //className="bg-white"
                                                        autoComplete: "off" }), _jsx(InputGroupAddon, { align: "inline-start", children: _jsx(IconMail, { className: "text-muted-foreground" }) })] }), isInvalid && (_jsx(FieldError, { errors: field.state.meta.errors }))] }));
                                } }), _jsx(form.Field, { name: "password", children: (field) => {
                                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (_jsxs(Field, { "data-invalid": isInvalid, children: [_jsx(FieldLabel, { htmlFor: field.name, children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: field.name, name: field.name, value: field.state.value, className: "ps-9 bg-white py-4", placeholder: "Enter your password", onBlur: field.handleBlur, onChange: (e) => field.handleChange(e.target.value), "aria-invalid": isInvalid, type: isVisible ? "text" : "password" }), _jsx("div", { className: "text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50", children: _jsx(IconLock, { size: 16, "aria-hidden": "true" }) }), _jsx("button", { className: "text-muted-foreground/80 cursor-pointer hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50", type: "button", onClick: toggleVisibility, children: isVisible ? (_jsx(IconEyeOff, { size: 16, "aria-hidden": "true" })) : (_jsx(IconEye, { size: 16, "aria-hidden": "true" })) })] }), isInvalid && (_jsx(FieldError, { errors: field.state.meta.errors }))] }));
                                } })] }), _jsx(Separator, { className: "my-4" }), _jsx(Submitbtn, { text: "Login", fullwidth: true, type: "submit", loading: loading })] })] }));
}
