<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Create authors table
        Schema::create('authors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('avatar')->nullable();
            $table->string('role')->nullable();
            $table->text('bio')->nullable(); // short bio shown under each article
            $table->longText('description')->nullable(); // full details for author page
            
            // SEO Meta tags for Author page
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();
            $table->string('meta_robots')->nullable();
            $table->string('canonical_link')->nullable();
            $table->string('meta_image')->nullable();
            
            $table->timestamps();
        });

        // 2. Modify articles table
        Schema::table('articles', function (Blueprint $table) {
            $table->unsignedBigInteger('author_id')->nullable()->after('id');
            $table->longText('schema')->nullable()->after('category');
            
            // Rename legacy string column author -> legacy_author
            $table->renameColumn('author', 'legacy_author');
            
            $table->foreign('author_id')
                ->references('id')
                ->on('authors')
                ->onDelete('set null');
        });

        // 3. Modify services table
        Schema::table('services', function (Blueprint $table) {
            $table->longText('schema')->nullable()->after('is_highlight');
        });

        // 4. Modify submissions table
        Schema::table('submissions', function (Blueprint $table) {
            $table->date('booking_date')->nullable()->after('branch');
            $table->string('booking_time')->nullable()->after('booking_date');
            $table->unsignedBigInteger('doctor_id')->nullable()->after('booking_time');

            $table->foreign('doctor_id')
                ->references('id')
                ->on('doctors')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // 1. Revert submissions table
        Schema::table('submissions', function (Blueprint $table) {
            $table->dropForeign(['doctor_id']);
            $table->dropColumn(['booking_date', 'booking_time', 'doctor_id']);
        });

        // 2. Revert services table
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('schema');
        });

        // 3. Revert articles table
        Schema::table('articles', function (Blueprint $table) {
            $table->dropForeign(['author_id']);
            $table->dropColumn(['author_id', 'schema']);
            $table->renameColumn('legacy_author', 'author');
        });

        // 4. Drop authors table
        Schema::dropIfExists('authors');
    }
};
