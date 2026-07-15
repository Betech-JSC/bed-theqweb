import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Mail } from 'lucide-react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Quên mật khẩu" />

            <div className="mb-6">
                <h2 className="font-serif text-2xl md:text-3xl text-dark-bg font-semibold tracking-wide">
                    Quên mật khẩu?
                </h2>
                <p className="mt-2 text-sm text-gray-500 font-light leading-relaxed">
                    Đừng lo lắng. Hãy nhập địa chỉ email đã đăng ký và chúng tôi sẽ gửi liên kết đặt lại mật khẩu mới cho bạn.
                </p>
            </div>

            {status && (
                <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-sm font-medium text-emerald-800 animate-fadeIn">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel 
                        htmlFor="email" 
                        value="Địa chỉ Email" 
                        className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2"
                    />
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 ps-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-gold transition-colors duration-200">
                            <Mail size={18} strokeWidth={1.8} />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-0 block w-full rounded-xl border border-gray-200 bg-[#faf9f6] py-3.5 ps-11 pe-4 text-sm text-dark-bg transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold/40 shadow-none"
                            isFocused={true}
                            placeholder="username@example.com"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2 text-xs font-medium text-rose-500" />
                </div>

                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full justify-center rounded-xl bg-dark-bg hover:bg-dark-bg/90 active:bg-black border-none text-white py-4 px-6 font-semibold uppercase tracking-wider text-xs shadow-md transition-all duration-300 hover:shadow-lg focus:ring-gold focus:ring-offset-2 select-none cursor-pointer flex items-center gap-2 hover:-translate-y-0.5 relative overflow-hidden shimmer-container"
                        disabled={processing}
                    >
                        {processing ? 'Đang gửi...' : 'Gửi liên kết đặt lại'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
