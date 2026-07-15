import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Đăng ký tài khoản" />

            <div className="mb-8">
                <h2 className="font-serif text-2xl md:text-3xl text-dark-bg font-semibold tracking-wide">
                    Đăng ký tài khoản
                </h2>
                <p className="mt-2 text-sm text-gray-500 font-light leading-relaxed">
                    Tạo tài khoản quản trị mới để tham gia vận hành hệ thống Theq.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                {/* Name Field */}
                <div>
                    <InputLabel 
                        htmlFor="name" 
                        value="Họ và tên" 
                        className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-1.5"
                    />
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 ps-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-gold transition-colors duration-200">
                            <User size={18} strokeWidth={1.8} />
                        </div>
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-0 block w-full rounded-xl border border-gray-200 bg-[#faf9f6] py-3 ps-11 pe-4 text-sm text-dark-bg transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold/40 shadow-none"
                            autoComplete="name"
                            isFocused={true}
                            placeholder="Nguyễn Văn A"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.name} className="mt-1.5 text-xs font-medium text-rose-500" />
                </div>

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
                            placeholder="username@example.com"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1.5 text-xs font-medium text-rose-500" />
                </div>

                {/* Password Field */}
                <div>
                    <InputLabel 
                        htmlFor="password" 
                        value="Mật khẩu" 
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
                            placeholder="••••••••"
                            onChange={(e) => setData('password', e.target.value)}
                            required
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
                        value="Xác nhận mật khẩu" 
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
                            required
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

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                    <Link
                        href={route('login')}
                        className="text-sm text-gray-500 hover:text-dark-bg transition-colors font-light hover:underline focus:outline-none"
                    >
                        Đã có tài khoản?
                    </Link>
                </div>

                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full justify-center rounded-xl bg-dark-bg hover:bg-dark-bg/90 active:bg-black border-none text-white py-4 px-6 font-semibold uppercase tracking-wider text-xs shadow-md transition-all duration-300 hover:shadow-lg focus:ring-gold focus:ring-offset-2 select-none cursor-pointer flex items-center gap-2 hover:-translate-y-0.5 relative overflow-hidden shimmer-container"
                        disabled={processing}
                    >
                        {processing ? 'Đang tạo...' : 'Đăng ký'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
