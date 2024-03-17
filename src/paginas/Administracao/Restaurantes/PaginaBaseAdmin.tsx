import { AppBar, Box, Button, Container, Toolbar, Typography, Link, Paper } from "@mui/material"

import { Outlet, Link as RouterLink } from 'react-router-dom'

const PaginaBaseAdmin = () => {
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Link component={RouterLink} to="/admin/" underline="none"> 
                            <Typography variant="h4" sx={{ color: 'white', textDecoration: 'none' }}> 
                                Área Administrativa - DevFood
                            </Typography>
                        </Link>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', gap: 2 }}>

                                <Link component={RouterLink} to="/admin/restaurantes/">
                                    <Button sx={{ my: 2, 
                                        color: "white", 
                                        fontWeight: 'bold', 
                                        bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
                                    >
                                        Restaurantes
                                    </Button>
                                </Link>

                                <Link component={RouterLink} to="/admin/restaurantes/novo">
                                    <Button sx={{ my: 2, 
                                        color: "white", 
                                        fontWeight: 'bold', 
                                        bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
                                    >
                                        Novo Restaurante
                                    </Button>
                                </Link>

                                <Link component={RouterLink} to="/admin/pratos">
                                    <Button sx={{ my: 2, 
                                        color: "white", 
                                        fontWeight: 'bold', 
                                        bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
                                    >
                                        Pratos
                                    </Button>
                                </Link>

                                <Link component={RouterLink} to="/admin/pratos/novo">
                                    <Button 
                                        sx={{ my: 2, 
                                        color: "white", 
                                        fontWeight: 'bold', 
                                        bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
                                    >
                                        Novo Prato
                                    </Button>
                                </Link>

                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Outlet />
                    </Paper>
                </Container>
            </Box>

        </>
    )
}

export default PaginaBaseAdmin