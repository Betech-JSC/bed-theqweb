import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Đặt lại mật khẩu" />

            <div className="mb-8">
                <h2 className="font-serif text-2xl md:text-3xl text-dark-bg font-semibold tracking-wide">
                    Đặt lại mật khẩu
                </h2>
                <p className="mt-2 text-sm text-gray-500 font-light leading-relaxed">
                    Vui lòng tạo một mật khẩu mới an toàn cho tài khoản của bạn.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                {/* Email Field */}
                <div>
                    <InputLabel 
                        htmlFor="email" 
                        value="Địa chỉ Email" 
                        className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-1.5"
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
                            className="mt-0 block w-full rounded-xl border border-gray-200 bg-[#faf9f6] py-3 ps-11 pe-4 text-sm text-dark-bg transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold/40 shadow-none"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1.5 text-xs font-medium text-rose-500" />
                </div>

                {/* Password Field */}
                <div>
                    <InputLabel 
                        htmlFor="password" 
                        value="Mật khẩu mới" 
                        className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-1.5"
                    />
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 ps-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-gold transition-colors duration-200">
                            <Lock size={18} strokeWidth={1.8} />
                        </div>
                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className="mt-0 block w-full rounded-xl border border-gray-200 bg-[#faf9f6] py-3 ps-11 pe-12 text-sm text-dark-bg transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold/40 shadow-none"
                            autoComplete="new-password"
                            isFocused={true}
                            placeholder="••••••••"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pe-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none cursor-pointer"
                        >
                            {showPassword ? (
                                <EyeOff size={18} strokeWidth={1.8} />
                            ) : (
                                <Eye size={18} strokeWidth={1.8} />
                            )}
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-1.5 text-xs font-medium text-rose-500" />
                </div>

                {/* Confirm Password Field */}
                <div>
                    <InputLabel 
                        htmlFor="password_confirmation" 
                        value="Xác nhận mật khẩu mới" 
                        className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-1.5"
                    />
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 ps-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-gold transition-colors duration-200">
                            <Lock size={18} strokeWidth={1.8} />
                        </div>
                        <TextInput
                            id="password_confirmation"
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-0 block w-full rounded-xl border border-gray-200 bg-[#faf9f6] py-3 ps-11 pe-12 text-sm text-dark-bg transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold/40 shadow-none"
                            autoComplete="new-password"
                            placeholder="••••••••"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pe-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none cursor-pointer"
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={18} strokeWidth={1.8} />
                            ) : (
                                <Eye size={18} strokeWidth={1.8} />
                            )}
                        </button>
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-1.5 text-xs font-medium text-rose-500" />
                </div>

                <div className="pt-4">
                    <PrimaryButton 
                        className="w-full justify-center rounded-xl bg-dark-bg hover:bg-dark-bg/90 active:bg-black border-none text-white py-4 px-6 font-semibold uppercase tracking-wider text-xs shadow-md transition-all duration-300 hover:shadow-lg focus:ring-gold focus:ring-offset-2 select-none cursor-pointer flex items-center gap-2 hover:-translate-y-0.5 relative overflow-hidden shimmer-container"
                        disabled={processing}
                    >
                        {processing ? 'Đang lưu...' : 'Đặt lại mật khẩu'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
