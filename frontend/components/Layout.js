import NavBar from './NavBar';
import Container from '@mui/material/Container';

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <Container sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
}
