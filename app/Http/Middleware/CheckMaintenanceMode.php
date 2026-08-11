<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Setting;
use Symfony\Component\HttpFoundation\Response;

class CheckMaintenanceMode
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Skip check for admin, authentication, local developer, and file assets routes
        if ($request->is('admin*') || 
            $request->is('login*') || 
            $request->is('register*') || 
            $request->is('dashboard*') || 
            $request->is('logout*') || 
            $request->is('uploads*') || 
            $request->is('images*') || 
            $request->is('videos*') || 
            $request->is('build*') || 
            $request->is('_inertia*') ||
            $request->is('up')
        ) {
            return $next($request);
        }

        // 2. Fetch the system status from settings
        $status = Setting::getValue('system_status', 'active');

        if ($status === 'maintenance') {
            $message = Setting::getValue('maintenance_message', 'Hệ thống đang bảo trì định kỳ. Quý khách vui lòng quay lại sau ít phút!');
            return response($this->renderMaintenancePage($message), 503)
                ->header('Content-Type', 'text/html; charset=utf-8');
        }

        return $next($request);
    }

    /**
     * Render a gorgeous, premium maintenance landing page.
     */
    private function renderMaintenancePage(string $message): string
    {
        return <<<HTML
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hệ Thống Đang Bảo Trì - Theq</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Outfit', sans-serif;
            background: linear-gradient(135deg, #0e1118 0%, #05070a 100%);
            color: #e2e8f0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            overflow: hidden;
            position: relative;
        }
        /* Background Glow Orbs */
        .orb {
            position: absolute;
            border-radius: 50%;
            filter: blur(100px);
            opacity: 0.15;
            z-index: 1;
        }
        .orb-1 {
            width: 400px;
            height: 400px;
            background: #b8860b;
            top: -100px;
            left: -100px;
        }
        .orb-2 {
            width: 500px;
            height: 500px;
            background: #d4af37;
            bottom: -200px;
            right: -100px;
        }
        .container {
            max-width: 600px;
            width: 100%;
            background: rgba(30, 41, 59, 0.4);
            border: 1px solid rgba(212, 175, 55, 0.2);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 24px;
            padding: 3rem 2.5rem;
            text-align: center;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            position: relative;
            z-index: 10;
            animation: fadeInUp 0.8s ease-out;
        }
        .logo {
            font-size: 2.2rem;
            font-weight: 700;
            letter-spacing: 2px;
            margin-bottom: 2rem;
            background: linear-gradient(135deg, #d4af37 0%, #f3e5ab 50%, #aa7c11 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
        }
        .icon-container {
            width: 80px;
            height: 80px;
            background: rgba(212, 175, 55, 0.1);
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 2rem;
            color: #d4af37;
            animation: pulse 2s infinite;
        }
        h1 {
            font-size: 1.8rem;
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 1rem;
            letter-spacing: 0.5px;
        }
        p {
            font-size: 1rem;
            color: #94a3b8;
            line-height: 1.7;
            margin-bottom: 2.5rem;
            font-weight: 300;
        }
        .footer-text {
            font-size: 0.8rem;
            color: #475569;
            text-transform: uppercase;
            letter-spacing: 1.5px;
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4);
            }
            70% {
                box-shadow: 0 0 0 15px rgba(212, 175, 55, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
            }
        }
    </style>
</head>
<body>
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="container">
        <div class="logo">Theq</div>
        <div class="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        </div>
        <h1>Hệ Thống Đang Bảo Trì</h1>
        <p>{$message}</p>
        <div class="footer-text">Theq Nail Centre</div>
    </div>
</body>
</html>
HTML;
    }
}
