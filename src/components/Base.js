import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import React from 'react'

const Base = ({title, description, children}) => {
  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background:"#00695f"}} >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Project
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <header>
<h1>{title}</h1>
</header>
<main>
<h2>{description}</h2>
<div>{children}</div>
</main>
    </div>
  )
}

export default Base