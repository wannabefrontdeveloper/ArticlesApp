import {useMutation} from 'react-query';
import {login} from '../api/auth';

export default function useLogin() {
  const mutation = useMutation(login, {
    onSuccess: data => {
      console.log(data);
      /* TODO: 구현예정 */
    },
    onError: error => {
      console.log(error);
      /* TODO: 구현 예정 */
    },
  });
  return mutation;
}
