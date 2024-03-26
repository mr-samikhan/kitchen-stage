import { Add } from '@mui/icons-material'
import { Button, Grid } from '@mui/material'

interface HeroProps {
  onAdd: () => void
}

const Hero = (props: HeroProps) => {
  const { onAdd } = props || {}
  return (
    <Grid item md={12} xs={12} textAlign="end">
      <Button
        size="small"
        color="primary"
        onClick={onAdd}
        startIcon={<Add />}
        variant="contained"
      >
        Add Song
      </Button>
    </Grid>
  )
}

export default Hero
