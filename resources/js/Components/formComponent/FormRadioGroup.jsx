import { Controller } from "react-hook-form";
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, FormHelperText } from "@mui/material";

export default function FormRadioGroup({ name, control, label, rules = null, options = [], sx = null, bpSize = "medium", checkedIcon, bpIcon, disabledExcept = null, fullWidth=false, ...props }) {

  const generateRadioOptions = () => {
    return options.map((option) => (
      <FormControlLabel
        {...(disabledExcept !== null && { disabled: !(option.id === disabledExcept) })}
        key={option.id}
        value={option.id}
        label={option.label}
        control={<Radio size={bpSize} {...checkedIcon && ({ checkedIcon: checkedIcon })} {...bpIcon && ({ icon: bpIcon })} />}
      />
    ));
  };

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
          <RadioGroup
            {...(props.row && { sx: { justifyContent: "space-between" } })}
            value={value ? (value.id + "") : ''}
            onChange={(e) => {
              const selectedOption = options.find(option => option.id + "" === e.target.value);
              onChange(selectedOption);
            }}
            {...props}
          >
            {generateRadioOptions()}
          </RadioGroup>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
