import React, { useState, useRef } from 'react';
import { Button, Typography, Box, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ClearIcon from '@mui/icons-material/Clear';

interface ImageDataProps {
  url?: string;
}

const InputBtn: React.FC<ImageDataProps> = ({ url = '' }) => {
  const [previewPhoto, setPreviewPhoto] = useState<string>(url);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const updatePreview = () => {
    const files = inputRef.current?.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewPhoto(e.target?.result as string);
        setFileName(files[0].name);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const clearPreview = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setPreviewPhoto(url);
    setFileName(null);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h6">Upload file</Typography>

      <Box sx={{display:'flex' , justifyContent:'space-between'}}>
      <Box display="flex" alignItems="center" gap={2}>
        <Box>
          {previewPhoto ? (
            <img src={previewPhoto} alt="Preview" style={{ width: 48, height: 48, borderRadius: '50%' }} />
          ) : (
            <AccountCircleIcon fontSize="large" />
          )}
        </Box>

        <input
          type="file"
          accept="image/*,capture=camera"
          ref={inputRef}
          style={{ display: 'none' }}
          onChange={updatePreview}
        />
        <Button
         variant="outlined"
          onClick={() => inputRef.current?.click()}
        >
          Upload
        </Button>

        
      </Box>
       <Box sx={{display:'flex' ,alignItems:'center', margin:'0 0 0 14px' ,backgroundColor:'rgba(173, 173, 173, 0.29)' ,padding:'0 4px' ,borderRadius:'20px'}}>
       <Typography variant="body2"fontSize='small' color="textSecondary">
        {fileName || 'No file chosen'}
      </Typography>
      {fileName && (
          <IconButton onClick={clearPreview}>
            <ClearIcon />
          </IconButton>
        )}
       </Box>
      
      </Box>
      
     
    </Box>
  );
};

export default InputBtn;
