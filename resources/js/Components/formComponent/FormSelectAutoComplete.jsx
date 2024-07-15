import { Autocomplete, Chip } from "@mui/material";
import { Controller } from "react-hook-form";
import TextFieldMUI from "../TextFieldMUI";

export default function FormSelectAutoComplete({ name, control, label = "", rules, size = "medium", options = [], icon = null, posIcon = "start", popupIcon, fullWidth = false, ...props }) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({
                field: { onChange, value},
                fieldState: { error },
                formState,
            }) => (
                <Autocomplete
                    {...props}
                    popupIcon={popupIcon}
                    size={size}
                    onChange={(e, data) => onChange(data)}
                    value={value} 
                    options={options}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    renderInput={(params) => {
                        return (
                            <TextFieldMUI
                                {...params}
                                helperText={error ? error.message : null}
                                error={!!error}
                                value={value}
                                label={label}
                                icon={icon}
                                posIcon={posIcon}
                                fullWidth={fullWidth}
                            />
                        );
                    }}
                renderTags={(tagValue, getTagProps) => {
                    return tagValue.map((value, index) => {
                        return (
                            <Chip
                                label={value.name}
                                key={index}
                                style={{ maxWidth: "8rem" }}
                            />
                        );
                    });
                }}
                />
            )}

        />
    );
};