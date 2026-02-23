import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { IconPhoto, IconX } from "@tabler/icons-react";
export const ImageSelect = ({ onUpload, handleChange, value, disabled, accept = "image/*", label = "Select Picture", image = null }) => {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(image);
    const [loading, setLoading] = useState(false);
    // Sync preview if form already has an image URL (edit mode)
    useEffect(() => {
        if (value) {
            setPreview(value);
        }
    }, [value]);
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        // 1️⃣ Create local preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
        handleChange(file);
        // 2️⃣ Upload later (S3 / Firebase / etc.)
        if (!onUpload)
            return;
        //
        //onUpload(reader.result as string)
        // result should be a public URL
        // ImageSelect does NOT store this
    };
    const handleRemove = () => {
        setPreview(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };
    return (_jsxs("div", { children: [preview ? (_jsxs("div", { className: "relative h-auto max-h-[35vh] min-h-[35vh] w-full overflow-hidden rounded-lg border", children: [_jsx("img", { src: preview, alt: "Selected", className: "h-full w-full object-cover" }), _jsxs(Button, { type: "button", disabled: disabled || loading, onClick: handleRemove, className: "absolute right-1 top-1 rounded  px-2 py-1 text-xs text-white", children: [_jsx(IconX, {}), "Change Picture"] }), loading && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/40 text-xs text-white", children: "Uploading\u2026" }))] })) : (_jsxs(Button, { type: "button", disabled: disabled, onClick: () => inputRef.current?.click(), children: [_jsx(IconPhoto, {}), " ", label] })), _jsx("input", { ref: inputRef, type: "file", accept: accept, disabled: disabled, onChange: handleFileChange, className: "hidden" })] }));
};
