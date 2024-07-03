import { TextField, OutlinedInput, MenuItem } from "@mui/material";


export default function GoogleCalendar({ className = '', ...props }) {

    return(
        <TextField
            {...props}
            select
            value={undefined}
            
            input={<OutlinedInput />}
            inputProps={{ 'aria-label': 'Without label' }}
        >
            {/* {data.map((element) => (
                        <MenuItem
                            key={element}
                            value={element}
                        >
                            {element}
                        </MenuItem>
                    ))} */}
            <MenuItem/>
        </TextField>
    );

}
