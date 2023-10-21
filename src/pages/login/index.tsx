import Input from '../../components/Input';
import Password from '../../components/Password';
import { useTranslation } from 'react-i18next';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useAuth';

export const LogIn = () => {
  const { t } = useTranslation();
  const { handleChange, form } = useForm({
    client: '',
    username: '',
    password: '',
    captcha: '',
  });
  const { onLogin } = useAuth();

  const handleLogin = async () => {
    await onLogin?.({
      username: String(form.username),
      client: String(form.client),
    });
  };

  return (
    <main className="w-screen h-screen flex bg-gray-300">
      <section className="flex flex-col gap-4 justify-between rounded-lg p-4 lg:p-6 mt-12 mx-auto bg-white w-full max-w-[320px] max-h-[550px] shadow-lg">
        <h4 className="font-semibold leading-tight text-black">
          {t('login.login-to-account')}
        </h4>

        <div className="flex flex-col gap-4 ">
          <Input
            id="client"
            label={t('login.client')}
            onChange={handleChange}
            placeholder={t('login.enter-client')}
          />
          <Input
            id="username"
            label={t('login.username')}
            onChange={handleChange}
            placeholder={t('login.enter-username')}
          />

          <Password onChange={handleChange} />

          <div className="max-w-[100px]">
            <Input
              id="captcha"
              label={t('login.code')}
              placeholder={t('login.enter-code')}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-between w-full">
            <a
              href="forgot-password.html"
              className="font-sans font-normal leading-5 text-gray-700 text-sm underline"
            >
              {t('login.forgot-password')}
            </a>
          </div>

          <div className="grid gap-2">
            <button
              type="submit"
              onClick={handleLogin}
              className="bg-[#501a92] rounded-lg text-white py-2 px-4 select-none block inline-block text-center text-md leading"
            >
              {t('login.login')}
            </button>
            <a
              href="signup.html"
              className="bg-[#888888] rounded-lg text-white py-2 px-4 select-none block inline-block text-center text-md leading"
            >
              {t('login.not-registered-signup')}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
