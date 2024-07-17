import { InputAdornment } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Controller } from "react-hook-form";

import { useState } from "react";

export default function FormDatePicker({ name, control, label, rules, size, icon = null, posIcon = "start", ...props }) {

    const [isFocused, setIsFocused] = useState(false);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                    formState,

                }) => (
                    <DatePicker
                        className={props.className}
                        value={value}
                        onChange={onChange}
                        label={label}
                        slotProps={{
                            textField: {
                                ...(props.fullWidth && { fullWidth: props.fullWidth }),
                                size: size,
                                helperText: (error ? error.message : null),
                                error: !!error,

                                ...(icon && {
                                    InputProps: {

                                        sx: { paddingLeft: "0.5rem" },
                                        startAdornment: (
                                            <InputAdornment position={posIcon} sx={error ? { color: "#D32F2F" } : undefined}>
                                                {icon}
                                            </InputAdornment>
                                        ),
                                    },
                                    InputLabelProps: {
                                        shrink: isFocused,
                                        sx: { paddingLeft: isFocused ? '0rem' : '1.5rem' },
                                    },
                                    onFocus: () => setIsFocused(true),
                                    onBlur: () => setIsFocused(value instanceof Date)
                                }),
                            }
                        }}
                        {...props}

                    />
                )}
            />
        </LocalizationProvider>
    );
}