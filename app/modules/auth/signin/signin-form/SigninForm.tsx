import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import SpinnerButton from 'react-native-spinner-button';
import { Strings } from '../../../../constants';
import { useTheme } from '../../../../hooks';
import { AuthSelectors, useAppSelector } from '../../../../redux';
import { Colors } from '../../../../theme';
import styleSheet from './SigninFormStyles';
import { isRemainingToFillForm } from './SigninFormUtils';
import type { SigninFormPropsType } from './SigninFormTypes';

/**
 * The sign in form component.
 * @param {SigninFormPropsType} props - The props for the sign in form.
 * @returns A sign in form component.
 */
export default function SigninForm({
  handleSubmit,
  handleChange,
  values,
  errors
}: SigninFormPropsType): React.ReactElement {
  const { styles, theme } = useTheme(styleSheet);
  const loading = useAppSelector<boolean>(AuthSelectors.getLoading);
  const inputPasswordRef: React.LegacyRef<TextInput> = React.createRef();
  const disabled: boolean = isRemainingToFillForm(values, errors);
  const fieldErrorEmail: string | undefined = values.email?.length ?? 0 ? errors.email : '';
  const fieldErrorPassword: string | undefined =
    values.password?.length ?? 0 ? errors.password : '';

  return (
    <View style={styles.formContainer}>
      <TextInput
        autoFocus
        returnKeyType="next"
        keyboardType="email-address"
        selectionColor={Colors[theme]?.white}
        placeholderTextColor={Colors[theme]?.white}
        underlineColorAndroid="transparent"
        placeholder={Strings.Auth.hintEmail}
        style={styles.textInput}
        onChangeText={handleChange('email')}
        onSubmitEditing={() => {
          inputPasswordRef.current?.focus();
        }}
      />
      <Text style={styles.errorMsg}>{fieldErrorEmail}</Text>
      <TextInput
        secureTextEntry
        ref={inputPasswordRef}
        returnKeyType="done"
        keyboardType="default"
        selectionColor={Colors[theme]?.white}
        placeholderTextColor={Colors[theme]?.white}
        underlineColorAndroid="transparent"
        placeholder={Strings.Auth.hintPassword}
        style={styles.textInput}
        onChangeText={handleChange('password')}
        onSubmitEditing={handleSubmit}
      />
      <Text style={styles.errorMsg}>{fieldErrorPassword}</Text>
      <SpinnerButton
        buttonContainer={StyleSheet.flatten([styles.buttonContainer, styles.buttonTopMargin])}
        buttonStyle={StyleSheet.flatten([styles.spinnerButton, styles.button])}
        disableStyle={styles.disabledButton}
        animatedDuration={150}
        spinnerType="UIActivityIndicator"
        spinnerColor={Colors[theme]?.white}
        disabled={disabled}
        isLoading={loading}
        onPress={handleSubmit}
      >
        <Text style={StyleSheet.flatten([styles.textLabel, styles.buttonText])}>
          {Strings.Auth.btnSignIn}
        </Text>
      </SpinnerButton>
    </View>
  );
}
