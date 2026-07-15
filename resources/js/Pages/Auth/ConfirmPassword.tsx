import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function ConfirmPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Xác nhận mật khẩu" />

            <div className="mb-6">
                <h2 className="font-serif text-2xl md:text-3xl text-dark-bg font-semibold tracking-wide">
                    Xác nhận mật khẩu
                </h2>
                <p className="mt-2 text-sm text-gray-500 font-light leading-relaxed">
                    Đây là khu vực bảo mật của hệ thống. Vui lòng xác thực mật khẩu tài khoản để tiếp tục.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel 
                        htmlFor="password" 
                        value="Mật khẩu của bạn" 
                        className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2"
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
                            className="mt-0 block w-full rounded-xl border border-gray-200 bg-[#faf9f6] py-3.5 ps-11 pe-12 text-sm text-dark-bg transition-all duration-300 placeholder:text-gray-400 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold/40 shadow-none"
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
                    <InputError message={errors.password} className="mt-2 text-xs font-medium text-rose-500" />
                </div>

                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full justify-center rounded-xl bg-dark-bg hover:bg-dark-bg/90 active:bg-black border-none text-white py-4 px-6 font-semibold uppercase tracking-wider text-xs shadow-md transition-all duration-300 hover:shadow-lg focus:ring-gold focus:ring-offset-2 select-none cursor-pointer flex items-center gap-2 hover:-translate-y-0.5 relative overflow-hidden shimmer-container"
                        disabled={processing}
                    >
                        {processing ? 'Đang xác thực...' : 'Xác nhận'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
