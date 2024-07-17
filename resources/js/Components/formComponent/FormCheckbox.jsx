import { Controller } from "react-hook-form";
import { FormControl, FormControlLabel, FormLabel, FormGroup, Checkbox, FormHelperText } from "@mui/material";

export default function FormCheckboxGroup({ name, control, label, rules = null, options = [], sx = null, ckSize = "medium", checkedIcon, ckIcon, disabledExcept = null, fullWidth = false, defaultCheckedColor=null, checkedColor=null, ...props }) {

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
             }) => (
                <FormControl component="fieldset" sx={sx} error={!!error} {...(fullWidth && { fullWidth: fullWidth })}>
                    {label && (<FormLabel component="legend">{label}</FormLabel>)}
                    <FormGroup {...(props.row && { sx: { justifyContent: "space-between" } })} {...props}>
                        {options.map((option) => (
                            <FormControlLabel
                                key={option.id}
                                control={
                                    <Checkbox
                                        size={ckSize}
                                        //checked={value ? value.some(item=>item.id === option.id):[]}
                                        checked={value.some(item => item.id === option.id)}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            const updatedValues = checked
                                                ? [...value, option]
                                                : value.filter((item) => item.id !== option.id);
                                            onChange(updatedValues);
                                        }}
                                        {...checkedIcon && { checkedIcon: checkedIcon }}
                                        {...ckIcon && { icon: ckIcon }}
                                        {...checkedColor &&  {sx:{...(defaultCheckedColor && { color: defaultCheckedColor }),'&.Mui-checked': {
                                            color: checkedColor,
                                          } }}}
                                    />
                                }
                                label={option.label}
                                {...(disabledExcept !== null && { disabled: option.id !== disabledExcept })}
                            />
                        ))}
                        
                    
                    </FormGroup>
                    {error && <FormHelperText>{error.message}</FormHelperText>}
                </FormControl>
            )}
        />
    );
}
