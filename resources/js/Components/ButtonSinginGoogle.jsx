import React from 'react';
import { Button, Grid, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

export default function ButtonSinginGoogle({ className = '', ...props }) {

    return (
        <Button
            {...props}
            // startIcon={<GoogleIcon />}
            sx={{
                
                borderColor: 'rgba(0, 0, 0, 0.12)',
                color: 'black',
                '&:hover': {
                    borderColor: 'rgba(0, 0, 0, 0.12)',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
                display:'block',
                
                height:'100%'
                
            }}
        >
            <GoogleIcon sx={{float:"left"}}/>
            {props.label}
        </Button>
    );
}
