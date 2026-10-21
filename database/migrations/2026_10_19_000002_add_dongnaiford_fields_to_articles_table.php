<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            if (!Schema::hasColumn('articles', 'related_urls')) {
                $table->text('related_urls')->nullable()->after('focus_keyword');
            }
            if (!Schema::hasColumn('articles', 'redirect_urls')) {
                $table->text('redirect_urls')->nullable()->after('related_urls');
            }
        });
    }

    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn(['related_urls', 'redirect_urls']);
        });
    }
};
