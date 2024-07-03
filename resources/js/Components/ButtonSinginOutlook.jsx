import React from 'react';
import { Button, Grid, Box } from '@mui/material';


function ZmdiOutlook(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 432 432" {...props}><path fill="currentColor" d="M267 93h145q4 0 9.5 5t5.5 12l-127 85h-4l-29-18zm0 115l27 18q2 1 4 1h3l1-1q-2 1 29-19.5t64-41.5l32-21v153q0 12-6.5 18t-16.5 6H267zm-139-39q13 0 20.5 12.5T156 216t-7.5 34t-21.5 12q-13 0-21-12.5T98 216t8-34t22-13M0 51L251 3v426L0 377zm168 218q16-21 16-54t-15.5-53.5T128 141q-26 0-42 21t-16 56q0 32 16 52t41 20t41-21"></path></svg>);
}


export default function ButtonSinginOutlook({ className = '', ...props }) {

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
            <span style={{float:"left", aspectRatio:"1", width:"1.4rem" }}><ZmdiOutlook style={{width:"100%", height:"100%"}}/></span>
            {props.label}
        </Button>
    );
}
