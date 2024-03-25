import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

const CustomAudioPlayer = () => {
  return (
    <AudioPlayer
      customIcons={{
        play: <img src="/assets/icons/circle.svg" alt="play" />,
        pause: <img src="/assets/icons/circle.svg" alt="pause" />,

        forward: <img src="/assets/icons/next-icon.svg" alt="" />,
        rewind: <img src="/assets/icons/prev-icon.svg" alt="" />,
        loop: <img src="" alt="" />,
      }}
      src=" https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
      onPlay={(e) => console.log('onPlay')}
      customAdditionalControls={[]}
      customVolumeControls={[]}
    />
  )
}

export default CustomAudioPlayer
