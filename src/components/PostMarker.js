import { Marker } from 'react-map-gl';

import styles from './PostMarker.module.css';

function PostMarker({ latitude, longitude, postId, title }) {
  return (
    <Marker latitude={latitude} longitude={longitude} offsetLeft={-20} offsetTop={-10}>
      <div>
        <img className={styles.image} src={`/images/${postId}.jpg`} alt={title} />
      </div>
    </Marker>
  );
}

export default PostMarker;