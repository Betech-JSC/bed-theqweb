<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title inertia>{{ $seo['title'] ?? config('app.name', 'Học Viện Đào Tạo Spa & Thẩm Mỹ TheQ') }}</title>
        @if(!empty($seo['description']))
        <meta name="description" content="{{ $seo['description'] }}">
        @endif
        @if(!empty($seo['canonical']))
        <link rel="canonical" href="{{ $seo['canonical'] }}">
        @endif

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Cài đặt GSC, GA4 & Favicon từ bảng settings phục vụ đo lường SEO -->
        @php
            $siteSettings = $page['props']['settings'] ?? [];
            $faviconUrl = $siteSettings['site_logo_square'] ?? null;
            $gscCode = $siteSettings['gsc_verification'] ?? null;
            $ga4Id = $siteSettings['ga4_measurement_id'] ?? null;
        @endphp
        @if(!empty($gscCode))
        <meta name="google-site-verification" content="{{ $gscCode }}">
        @endif
        @if(!empty($ga4Id))
        <script async src="https://www.googletagmanager.com/gtag/js?id={{ $ga4Id }}"></script>
        <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','{{ $ga4Id }}');</script>
        @endif
        @if(!empty($faviconUrl))
        <link rel="icon" type="image/png" href="{{ $faviconUrl }}">
        @endif

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
