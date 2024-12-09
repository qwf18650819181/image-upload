import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Box, Paper, IconButton, TextField, ImageList, ImageListItem, Dialog, DialogContent, DialogActions } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

// Styled components
const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 300px 1fr;
  gap: 20px;
  align-items: start;
`;

const StyledBox = styled(Box)`
  border: 1px solid #ccc;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 400px;
`;

const FunctionButton = styled(Button)`
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  padding: 0;
  font-size: 0.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TopButton = styled(IconButton)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #f0f0f0;
  &:hover {
    background-color: #e0e0e0;
  }
`;

function ImageUpload() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [watermarkText, setWatermarkText] = useState('');
  const [fixedSize, setFixedSize] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogImage, setDialogImage] = useState(null);
  const [openConfigDialog, setOpenConfigDialog] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise(resolve => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });
    Promise.all(newImages).then(images => setImages(prevImages => [...prevImages, ...images]));
  };

  const handleSelectImage = (image) => {
    setSelectedImage(image);
  };

  const handleRemoveImage = () => {
    setImages(images.filter(img => img !== selectedImage));
    setSelectedImage(null);
  };

  const handleOpenDialog = (image) => {
    setOpenDialog(true);
    setDialogImage(image);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenConfigDialog = () => {
    setOpenConfigDialog(true);
  };

  const handleCloseConfigDialog = () => {
    setOpenConfigDialog(false);
  };

  return (
    <Container>
      <StyledBox>
        <Button variant="contained" component="label" startIcon={<ImageIcon />} sx={{ mb: 2 }}>
          上传
          <input type="file" multiple hidden accept="image/*" onChange={handleImageChange} />
        </Button>
        <ImageList cols={3} gap={8}>
          {images.map((image, index) => (
            <ImageListItem key={index}>
              <img
                src={image}
                alt={`Uploaded ${index}`}
                loading="lazy"
                style={{ cursor: 'pointer', width: '100%' }}
                onClick={() => handleOpenDialog(image)}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </StyledBox>
      <Box>
        <FunctionButton variant="contained">图传</FunctionButton>
        {/*<TextField fullWidth label="水印内容" value={watermarkText} onChange={e => setWatermarkText(e.target.value)} sx={{ mb: 1 }} />*/}
        <FunctionButton variant="contained">添加水印</FunctionButton>
        {/*<TextField fullWidth label="固定尺寸" placeholder="例如 1000*1200" value={fixedSize} onChange={e => setFixedSize(e.target.value)} sx={{ mb: 1 }} />*/}
        <FunctionButton variant="contained">尺寸导出</FunctionButton>
        <FunctionButton variant="contained" startIcon={<FileDownloadIcon />}>导出图片链接</FunctionButton>
      </Box>
      <StyledBox>
        {selectedImage && (
          <Paper elevation={2} sx={{ position: 'relative' }}>
            <ImagePreview src={selectedImage} alt="Selected" />
            <IconButton onClick={handleRemoveImage} color="error" sx={{ position: 'absolute', right: 0, top: 0 }}>
              <DeleteIcon />
            </IconButton>
          </Paper>
        )}
      </StyledBox>
      <TopButton onClick={handleOpenConfigDialog} color="primary">
        <FileDownloadIcon />
      </TopButton>
      <Dialog open={openConfigDialog} onClose={handleCloseConfigDialog}>
        <DialogContent>
          <TextField fullWidth label="Access Key ID" sx={{ mb: 1 }} />
          <TextField fullWidth label="Secret Access Key" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfigDialog} color="primary">保存配置</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ImageUpload;
