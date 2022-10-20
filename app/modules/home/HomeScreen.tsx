import React, { type FC } from 'react';
import { Button, Text, View } from 'react-native';
import { ROUTES, Strings } from '../../constants';
import { useTheme } from '../../hooks';
import { navigateWithParam } from '../../utils';
import styleSheet from './HomeStyles';
/**
 * The HomeScreen component with two buttons for navigation respected screen.
 * @returns {React.ReactElement} A React element.
 */
const HomeScreen: FC = () => {
  const { styles, changeTheme } = useTheme(styleSheet);

  return (
    <View style={styles.screenView}>
      <Text style={styles.textView}>{Strings.Home.homeScreenTitle}</Text>
      <Button title="Details" onPress={() => navigateWithParam(ROUTES.Details)} />
      <Button title="SignIn" onPress={() => navigateWithParam(ROUTES.SignIn)} />
      <Button title="light theme" onPress={() => changeTheme('light')} />
      <Button title="dark theme" onPress={() => changeTheme('dark')} />
    </View>
  );
};

export default HomeScreen;
