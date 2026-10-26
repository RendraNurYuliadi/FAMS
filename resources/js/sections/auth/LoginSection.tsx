
import LoginForm from '@/components/auth/LoginForm';

export default function LoginSection() {
    return (
        <section className="w-full max-w-md">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    Login FAMS
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Masuk untuk mengelola aset dan fasilitas fakultas.
                </p>
            </div>

            <LoginForm />
        </section>
    );
}
