import React from 'react'
import { makeStyles } from '@mui/styles'
import { COLORS } from '@cookup/constant'
import 'react-h5-audio-player/lib/styles.css'
import { Box, Typography } from '@mui/material'
import AudioPlayer from 'react-h5-audio-player'
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined'

interface CustomAudioPlayerProps {
  src: string
  title: string
  artist: string
}

const CustomAudioPlayer = (props: CustomAudioPlayerProps) => {
  const { src, title, artist } = props || {}

  const classes = useStyles()

  const customIcons = {
    play: <PlayArrowOutlinedIcon className={classes.icon} />,
    pause: <PauseOutlinedIcon className={classes.icon} />,
    forward: <img src="/assets/icons/next-icon.svg" alt="" />,
    rewind: <img src="/assets/icons/prev-icon.svg" alt="" />,
  }

  return (
    <React.Fragment>
      <Box my={2}>
        <Typography variant="h3" fontWeight={700}>
          {title}
        </Typography>
        <Typography
          mt={1}
          variant="h6"
          fontWeight={400}
          color={COLORS.grey.main}
        >
          {artist}
        </Typography>
      </Box>
      <AudioPlayer
        src={src}
        customIcons={customIcons}
        customVolumeControls={[]}
        customAdditionalControls={[]}
        // onPlay={(e) => console.log('onPlay')}
      />
    </React.Fragment>
  )
}

export default CustomAudioPlayer

const useStyles = makeStyles((theme: any) => ({
  icon: {
    color: '#ffff',
    fontSize: 50,
  },
}))
