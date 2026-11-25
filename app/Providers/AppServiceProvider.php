<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Tự động tách thông số từ DATABASE_URL / POSTGRES_URL do tích hợp Neon trên Vercel cấp
        $neonUrl = $_ENV['DATABASE_URL'] ?? $_SERVER['DATABASE_URL'] ?? $_ENV['POSTGRES_URL'] ?? $_SERVER['POSTGRES_URL'] ?? null;
        if (is_string($neonUrl) && $neonUrl !== '') {
            $parsed = parse_url($neonUrl);
            if (!empty($parsed['host'])) {
                $host = $parsed['host'];
                // Giữ nguyên mật khẩu gốc vì FrankenPHP dùng libpq hiện đại hỗ trợ SNI + SCRAM-SHA-256
                $pass = isset($parsed['pass']) ? rawurldecode($parsed['pass']) : '';
                config([
                    'database.connections.pgsql.url' => null,
                    'database.connections.pgsql.host' => $host,
                    'database.connections.pgsql.port' => $parsed['port'] ?? 5432,
                    'database.connections.pgsql.database' => ltrim($parsed['path'] ?? '/neondb', '/'),
                    'database.connections.pgsql.username' => isset($parsed['user']) ? rawurldecode($parsed['user']) : 'neondb_owner',
                    'database.connections.pgsql.password' => $pass,
                    'database.connections.pgsql.sslmode' => 'require',
                ]);
            }
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Ép toàn bộ đường dẫn tài nguyên và route dùng HTTPS khi chạy trên Vercel Production
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }

        Vite::prefetch(concurrency: 3);
    }
}
