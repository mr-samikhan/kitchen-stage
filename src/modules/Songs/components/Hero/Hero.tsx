import { Add } from '@mui/icons-material'
import { Button, Grid } from '@mui/material'

const Hero = () => {
  return (
    <Grid item md={12} xs={12} textAlign="end">
      <Button
        size="small"
        color="primary"
        startIcon={<Add />}
        variant="contained"
      >
        Add Song
      </Button>
    </Grid>
  )
}

export default Hero
