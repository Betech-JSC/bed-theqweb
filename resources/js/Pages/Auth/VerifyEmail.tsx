import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    const isLinkSent = status === 'verification-link-sent';

    return (
        <GuestLayout>
            <Head title="Xác thực Email" />

            <div className="mb-6">
                <h2 className="font-serif text-2xl md:text-3xl text-dark-bg font-semibold tracking-wide">
                    Xác thực Email
                </h2>
                <p className="mt-2 text-sm text-gray-500 font-light leading-relaxed">
                    Cảm ơn bạn đã đăng ký! Trước khi bắt đầu, vui lòng xác nhận địa chỉ email của bạn bằng cách nhấp vào liên kết chúng tôi vừa gửi qua email.
                </p>
            </div>

            {isLinkSent && (
                <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-sm font-medium text-emerald-800 animate-fadeIn">
                    Một liên kết xác thực mới đã được gửi đến địa chỉ email bạn đã cung cấp khi đăng ký.
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div className="flex items-center justify-between pt-2">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-sm text-gray-500 hover:text-dark-bg transition-colors font-light hover:underline focus:outline-none cursor-pointer"
                    >
                        Đăng xuất
                    </Link>
                </div>

                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full justify-center rounded-xl bg-dark-bg hover:bg-dark-bg/90 active:bg-black border-none text-white py-4 px-6 font-semibold uppercase tracking-wider text-xs shadow-md transition-all duration-300 hover:shadow-lg focus:ring-gold focus:ring-offset-2 select-none cursor-pointer flex items-center gap-2 hover:-translate-y-0.5 relative overflow-hidden shimmer-container"
                        disabled={processing}
                    >
                        {processing ? 'Đang gửi lại...' : 'Gửi lại Email xác thực'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
