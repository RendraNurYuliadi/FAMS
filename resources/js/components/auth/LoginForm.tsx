
import { useForm } from '@inertiajs/react';
import LoginInput from './LoginInput';
import PasswordInput from './PasswordInput';

export default function LoginForm() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post('/login', {
            onFinish: () => setData('password', ''),
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <LoginInput
                label="Email"
                type="email"
                value={data.email}
                onChange={(value) => setData('email', value)}
                error={errors.email}
            />

            <PasswordInput
                value={data.password}
                onChange={(value) => setData('password', value)}
                error={errors.password}
            />

            <button
                type="submit"
                disabled={processing}
                className="w-full rounded-lg bg-blue-700 px-4 py-3
                           font-medium text-white transition
                           hover:bg-blue-800 disabled:opacity-50"
            >
                {processing ? 'Memproses...' : 'Masuk'}
            </button>
        </form>
    );
}
