import React from 'react'
import { makeStyles } from '@mui/styles'
import { COLORS } from '@cookup/constant'
import 'react-h5-audio-player/lib/styles.css'
import { useBreakPoints } from '@cookup/hooks'
import AudioPlayer from 'react-h5-audio-player'
import { Box, Divider, Typography } from '@mui/material'
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined'

interface CustomAudioPlayerProps {
  src: string
  title: string
  artist: string
}

const CustomAudioPlayer = (props: CustomAudioPlayerProps) => {
  const { src, title, artist } = props || {}

  const { mobileMode, tabMode } = useBreakPoints()

  const [isPlay, setIsPlay] = React.useState(false)

  const classes = useStyles()

  const customIcons = {
    play: <PlayArrowOutlinedIcon className={classes.icon} />,
    pause: <PauseOutlinedIcon className={classes.icon} />,
    forward: <img src="/assets/icons/next-icon.svg" alt="" />,
    rewind: <img src="/assets/icons/prev-icon.svg" alt="" />,
  }

  return (
    <React.Fragment>
      {!mobileMode && !tabMode && (
        <Divider
          variant="inset"
          orientation="vertical"
          className={classes.divider}
        />
      )}
      <Box px={5}>
        <Box my={2} ml={2}>
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
          autoPlay={false}
          customIcons={customIcons}
          customVolumeControls={[]}
          autoPlayAfterSrcChange={false}
          customAdditionalControls={[]}
          onPlay={() => setIsPlay(true)}
          onPause={() => setIsPlay(false)}
        />
      </Box>
    </React.Fragment>
  )
}

export default CustomAudioPlayer

const useStyles = makeStyles((theme: any) => ({
  icon: {
    color: '#ffff',
    fontSize: 50,
  },
  divider: {
    marginLeft: 0,
    height: '100%',
    borderRadius: '5px',
    position: 'absolute',
    border: '6px solid #D9D9D9',
  },
}))
