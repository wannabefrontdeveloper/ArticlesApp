import {useMutation} from 'react-query';
import {login} from '../api/auth';
import {AuthError} from '../api/types';
import {useNavigation} from '@react-navigation/core';
import {useUserState} from '../contexts/UserContext';
import {RootStackNavigationProp} from '../screens/types';

export default function useLogin() {
  const [, setUser] = useUserState();
  const navigation = useNavigation<RootStackNavigationProp>();
  const mutation = useMutation(login, {
    onSuccess: data => {
      setUser(data.user);
      navigation.pop();
      /* TODO: 구현예정 */
    },
    onError: (error: AuthError) => {
      console.log(error);
      /* TODO: 구현 예정 */
    },
  });
  return mutation;
}
