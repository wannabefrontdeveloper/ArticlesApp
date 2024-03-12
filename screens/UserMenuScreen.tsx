import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import MenuItem from '../components/MenuItem';
import {RootStackNavigationProp} from './types';
import {clearToken} from '../api/client';
import {useUserState} from '../contexts/UserContext';

function UserMenuScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();

  const [user, setUser] = useUserState();

  const onLogin = () => navigation.navigate('Login');
  const onRegister = () => navigation.navigate('Register');
  const onLogout = () => {
    setUser(null);
    clearToken();
  };

  return (
    <View>
      {user ? (
        <MenuItem name="로그아웃" onPress={onLogout} />
      ) : (
        <>
          <MenuItem name="로그인" onPress={onLogin} />
          <MenuItem name="회원가입" onPress={onRegister} />
        </>
      )}
    </View>
  );
}

export default UserMenuScreen;
