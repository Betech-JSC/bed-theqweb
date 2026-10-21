<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            if (!Schema::hasColumn('articles', 'status')) {
                $table->string('status')->default('published')->after('is_highlight');
            }
            if (!Schema::hasColumn('articles', 'focus_keyword')) {
                $table->string('focus_keyword')->nullable()->after('status');
            }
            if (!Schema::hasColumn('articles', 'image_alt')) {
                $table->string('image_alt')->nullable()->after('image');
            }
            if (!Schema::hasColumn('articles', 'views')) {
                $table->unsignedBigInteger('views')->default(0)->after('focus_keyword');
            }
        });
    }

    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn(['status', 'focus_keyword', 'image_alt', 'views']);
        });
    }
};
