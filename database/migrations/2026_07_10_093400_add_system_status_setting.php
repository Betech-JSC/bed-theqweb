<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $settings = [
            [
                'key' => 'system_status',
                'value' => 'active',
                'label' => 'Trạng thái hệ thống (active, maintenance, scheduled)',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'maintenance_message',
                'value' => 'Hệ thống đang bảo trì định kỳ. Quý khách vui lòng quay lại sau ít phút!',
                'label' => 'Thông báo bảo trì',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        foreach ($settings as $setting) {
            DB::table('settings')->updateOrInsert(
                ['key' => $setting['key']],
                [
                    'value' => $setting['value'],
                    'label' => $setting['label'],
                    'created_at' => $setting['created_at'],
                    'updated_at' => $setting['updated_at'],
                ]
            );
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('settings')->whereIn('key', ['system_status', 'maintenance_message'])->delete();
    }
};
