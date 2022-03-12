import { useTheme } from '@react-navigation/native';

const Colors = () => {
  const { colors } = useTheme();

  return colors;
};

export default Colors;
