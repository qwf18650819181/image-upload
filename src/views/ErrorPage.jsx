import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ErrorPage() {
  const CenteredContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    height: '100vh', // 确保容器填满视口的高度
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: '16px',
    padding: '10px 20px',
    borderRadius: '5px',
    marginTop: theme.spacing(4),
    color: 'white',
    textDecoration: 'none',
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', // 添加阴影效果
    ':hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.5)', // 加深阴影效果
    }
  }));

  const Big404 = styled(Typography)({
    fontSize: '10rem',
    fontWeight: 'bold',
    color: '#333',
  });

  return (
    <CenteredContainer>
      <Big404>404</Big404>
      <StyledButton variant="contained" href="/" underline="none">
        返回首页
      </StyledButton>
    </CenteredContainer>
  );
}
