import useForm from '../hooks/useForm';
import { validateSignin, type UserSigninInformation } from '../utils/validate';

function LoginPage() {
  const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateSignin,
  });

  const handleSubmit = () => {
    console.log(values);
  };

  const isDisabled = Object.values(errors || {}).some((error) => error.length > 0) || Object.values(values).some((val) => !val);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        {/* 이메일 입력란 */}
        <div className="flex flex-col gap-1">
          <input
            {...getInputProps('email')}
            name="email"
            className={`flex flex-col border w-[300px] p-[10px] rounded-sm outline-none transition-colors focus:border-[#807bff]
                      ${errors?.email && touched?.email ? 'border-red-500' : 'border-[#ccc]'}`}
            type="email"
            placeholder="email"
          />
          {errors?.email && touched?.email && <div className="text-red-500 text-sm">{errors.email}</div>}
        </div>

        <div className="flex flex-col gap-1">
          <input
            {...getInputProps('password')}
            name="password"
            className={`flex flex-col border w-[300px] p-[10px] rounded-sm outline-none transition-colors focus:border-[#807bff]
                      ${errors?.password && touched?.password ? 'border-red-500' : 'border-[#ccc]'}`}
            type="password"
            placeholder="password"
          />
          {errors?.password && touched?.password && <div className="text-red-500 text-sm">{errors.password}</div>}
        </div>

        <button
          className={`w-full bg-blue-600 text-white rounded-sm font-medium hover:bg-blue-700 py-3 transition-colors cursor-pointer
            disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed`}
          type="button"
          disabled={isDisabled}
          onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
