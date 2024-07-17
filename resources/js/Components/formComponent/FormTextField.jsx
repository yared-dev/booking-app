import { Controller } from 'react-hook-form';
import TextFieldMUI from "../TextFieldMUI";

export default function FormTextField({ name, control, label = 'TextField', rules, icon = null, ...props }) {
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
                <TextFieldMUI
                    {...props}
                    helperText={error ? error.message : null}
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    label={label}
                    icon={icon}
                />
            )}
        />
    );
};