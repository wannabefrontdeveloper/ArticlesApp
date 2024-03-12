import {useMutation} from 'react-query';
import {register} from '../api/auth';

export default function useRegister() {
  const mutation = useMutation(register, {
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
