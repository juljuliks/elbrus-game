import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CustomForm from '../Form';
import { loginUser } from '../../redux/actions/users';

const formItems = [
  {
    name: 'username',
    label: 'Your name',
    defaultValue: '',
    rules: [
      {
        required: true,
        message: 'Please input Your name',
      },
    ],
  },
  {
    name: 'email',
    label: 'Email',
    defaultValue: '',
    rules: [
      {
        required: true,
        message: 'Please input valid email',
        type: 'email',
      },
    ],
  },
  {
    name: 'password',
    label: 'Password',
    defaultValue: '',
    password: true,
    rules: [
      {
        required: true,
        min: 6,
        message: 'Password must be at least 6 characters',
      },
    ],
  },
];

export default function RegisterPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  function onSubmit(values) {
    fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }).then((data) => data.json())
      .then((data) => dispatch(loginUser(data)))
      .then(() => history.push('/notebooks'))
      .catch((e) => console.log(e));
  }

  return (
    <CustomForm formItems={formItems} submitHandler={onSubmit} />
  );
}
