import {useState, useEffect} from 'react';
import {Dimensions, ScaledSize} from 'react-native';

export default function useOrientation() {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    Dimensions.get('window').height >= Dimensions.get('window').width
      ? 'portrait'
      : 'landscape',
  );

  const onChange = ({window}: {window: ScaledSize}) => {
    if (window.height >= window.width) setOrientation('portrait');
    else setOrientation('landscape');
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', onChange);

    // clean up the event listener
    return () => subscription?.remove();
  }, []);

  return orientation;
}
