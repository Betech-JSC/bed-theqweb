<?php

use App\Models\User;
use App\Models\Setting;

test('settings can be updated to empty string', function () {
    $user = User::factory()->create();
    
    // Seed settings
    Setting::updateOrCreate(
        ['key' => 'site_logo_dark'],
        ['value' => '/images/LOGO-KT-NGANG-DEN-BAN-MOI-NHAT-07-2-1.png', 'label' => 'Logo dark']
    );

    $response = $this
        ->actingAs($user)
        ->post('/admin/settings', [
            'settings' => [
                'site_logo_dark' => ''
            ]
        ]);

    $response->assertSessionHasNoErrors();
    
    $setting = Setting::where('key', 'site_logo_dark')->first();
    $this->assertNull($setting->value);
});
