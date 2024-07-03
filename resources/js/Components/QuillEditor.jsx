import { useState } from 'react';
import { Box } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

    



  export default function QuillEditor({ className = '', ...props }) {

    const _modules = {
        toolbar: [
          [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
          [{size: []}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, 
           {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image', 'video'],
          ['clean']
        ],
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        }
      }
      

    const [value, setValue] = useState('');
  

  return (
      <Box sx={{height:"100%", overflow:'auto'}} >
        <ReactQuill  {...props} value={value} onChange={setValue} modules={_modules}
            style={{
                height: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column"
            }}
        />
      </Box>
    
  );
};


