import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { data } from 'react-router-dom';
import { email, z } from 'zod';
import { postSignup } from '../apis/auth';

const schema = z
  .object({
    email: z.string().email({ message: '올바른 이메일 형식이 아닙니다.' }),
    password: z.string().min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }).max(20, { message: '비밀번호는 최대 20자 이하여야 합니다.' }),
    passwordCheck: z.string().min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }).max(20, { message: '비밀번호 확인은 최대 20자 이하여야 합니다.' }),

    name: z.string().min(2, { message: '이름을 입력해주세요.' }),
  })
  .refine((data) => data.password === data.passwordCheck, { message: '비밀번호가 일치하지 않습니다.', path: ['passwordCheck'] });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
    },
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async(data: FormFields) => {
    const { passwordCheck, ...rest } = data;

    const response = await postSignup(rest);
    console.log(response);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...register('email')}
          className={`flex flex-col border w-[300px] p-[10px] rounded-sm outline-none transition-colors focus:border-[#807bff]
            ${errors?.email ? 'border-red-500' : 'border-[#ccc]'} `}
          type="email"
          placeholder="email"
        />
        {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}

        <input
          {...register('password')}
          className={`flex flex-col border w-[300px] p-[10px] rounded-sm outline-none transition-colors focus:border-[#807bff]
                      ${errors?.password ? 'border-red-500' : 'border-[#ccc]'}`}
          type="password"
          placeholder="password"
        />
        {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}

        <input
          {...register('passwordCheck')}
          className={`flex flex-col border w-[300px] p-[10px] rounded-sm outline-none transition-colors focus:border-[#807bff]
                      ${errors?.passwordCheck ? 'border-red-500' : 'border-[#ccc]'}`}
          type="password"
          placeholder="password check"
        />
        {errors.passwordCheck && <div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>}

        <input
          {...register('name')}
          className={`flex flex-col border w-[300px] p-[10px] rounded-sm outline-none transition-colors focus:border-[#807bff]
            ${errors?.name ? 'border-red-500' : 'border-[#ccc]'}`}
          type="text"
          placeholder="name"
        />
        {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}

        <button
          
          className={`w-full bg-blue-600 text-white rounded-sm font-medium hover:bg-blue-700 py-3 transition-colors cursor-pointer
            disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed`}
          type="button"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}>
          sign up
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
