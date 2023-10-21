import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';

export const Dashboard = () => {
  const { t } = useTranslation();
  const { user, onLogout } = useAuth();
  return (
    <main className="w-screen h-screen flex bg-gray-300">
      <section className="flex flex-col p-4 gap-2 w-1/2 h-1/2 m-auto rounded-xl bg-blue-500">
        <h1 className="m-auto font-extrabold text-7xl text-center">
          {t('dashboard.main')}
        </h1>
            <p className="font-extrabold text-center">{user?.username}</p>
            <p className="font-extrabold text-center">{user?.client}</p>
            <button
              className="bg-red-300 py-2 px-4 rounded-lg text-white font-extrabold"
              onClick={onLogout}
            >
              Logout
            </button>
      </section>
    </main>
  );
};
