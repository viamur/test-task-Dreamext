import { useState } from 'react';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import users from '../utils/usersData';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const resetInput = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = () => {
    /* Якщо пусті інпути то виходимо з функціі */
    if (email === '' || password === '') {
      return;
    }

    /* Скидаємо помилки */
    setError(null);

    /* Перевіряємо чи є такий користувач */
    const user = users.find(user => user.email === email);
    if (!user) {
      setError('User with this email was not found!');
      return;
    }

    /* Перевіряємо пароль користувача */
    const checkPassword = user.password === password;
    if (!checkPassword) {
      setError('Wrong password');
      return;
    }
    /* Якщо логін і пароль вірні то переходимо на home */
    navigation.navigate('Home');

    /* Можна ще очистити інпути */
    //   resetInput()
  };

  const handleUseKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={handleUseKeyboard}>
        <View style={styles.inner}>
          <Text style={styles.header}>Login</Text>
          <View>
            <TextInput
              placeholder="Email"
              onChangeText={setEmail}
              textAlign="center"
              value={email}
              style={styles.textInput}
            />
            <TextInput
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
              textAlign="center"
              secureTextEntry={true}
              style={styles.textInput}
            />
          </View>
          {email && password && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btnContainer}
              onPress={handleSubmit}
            >
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
          )}
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 48,
    fontWeight: '700',
    color: '#282828',
  },
  textInput: {
    height: 40,
    borderColor: '#282828',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: '#3EB489',
    paddingVertical: 10,
    borderRadius: 4,
    marginTop: 12,
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
  errorText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'red',
  },
});

export default LoginScreen;
