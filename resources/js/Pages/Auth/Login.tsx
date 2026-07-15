import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Đăng nhập" />

            <div className="mb-8">
                <h2 className="font-serif text-2xl md:text-3xl text-dark-bg font-semibold tracking-wide">
                    Đăng nhập
                </h2>
                <p className="mt-2 text-sm text-gray-500 font-light leading-relaxed">
                    Chào mừng bạn đến với cổng quản trị Theq. Vui lòng điền thông tin bên dưới để tiếp tục.
                </p>
            </div>

            {status && (
                <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-sm font-medium text-emerald-800 animate-fadeIn">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                {/* Email Field */}
                <div>
                    <InputLabel 
                        htmlFor="email" 
                        value="Tài khoản Email" 
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
                            autoComplete="username"
                            isFocused={true}
                            placeholder="username@example.com"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>

                    <InputError message={errors.email} className="mt-2 text-xs font-medium text-rose-500" />
                </div>

                {/* Password Field */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <InputLabel 
                            htmlFor="password" 
                            value="Mật khẩu" 
                            className="text-xs font-semibold tracking-wider uppercase text-gray-500"
                        />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs text-gold hover:text-gold-dark transition-colors font-medium hover:underline focus:outline-none"
                            >
                                Quên mật khẩu?
                            </Link>
                        )}
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 ps-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-gold transition-colors duration-200">
                            <Lock size={18} strokeWidth={1.8} />
                        </div>
                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className="mt-0 block w-full rounded-xl border border-gray-200 bg-[#faf9f6] py-3.5 ps-11 pe-12 text-sm text-dark-bg transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold/40 shadow-none"
                            autoComplete="current-password"
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

                    <InputError message={errors.password} className="mt-2 text-xs font-medium text-rose-500" />
                </div>

                {/* Remember Me & Submit */}
                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center cursor-pointer select-none">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            className="rounded-md border-gray-300 text-gold focus:ring-gold focus:ring-offset-0 h-4.5 w-4.5 transition-all duration-200 cursor-pointer"
                            onChange={(e) =>
                                setData(
                                    'remember',
                                    (e.target.checked || false) as false,
                                )
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600 font-light hover:text-dark-bg transition-colors duration-250">
                            Duy trì đăng nhập
                        </span>
                    </label>
                </div>

                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full justify-center rounded-xl bg-dark-bg hover:bg-dark-bg/90 active:bg-black border-none text-white py-4 px-6 font-semibold uppercase tracking-wider text-xs shadow-md transition-all duration-300 hover:shadow-lg focus:ring-gold focus:ring-offset-2 select-none cursor-pointer flex items-center gap-2 hover:-translate-y-0.5 relative overflow-hidden shimmer-container"
                        disabled={processing}
                    >
                        {processing ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Đang xử lý...
                            </span>
                        ) : (
                            'Đăng nhập'
                        )}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
