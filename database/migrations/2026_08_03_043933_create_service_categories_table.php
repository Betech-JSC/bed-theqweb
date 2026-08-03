<?php
 
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
 
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Create service_categories table
        Schema::create('service_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // 2. Add service_category_id foreign key to services table
        Schema::table('services', function (Blueprint $table) {
            $table->unsignedBigInteger('service_category_id')->nullable()->after('category');
        });

        // 3. Seed default categories
        $categories = [
            [
                'name' => 'Phẫu thuật thẩm mỹ',
                'slug' => 'phau-thuat-tham-my',
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Cấy tóc y khoa',
                'slug' => 'cay-toc-y-khoa',
                'order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Da liễu & Trẻ hóa',
                'slug' => 'da-lieu-tre-hoa',
                'order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ];

        DB::table('service_categories')->insert($categories);

        // 4. Update existing services mapping
        $dbCategories = DB::table('service_categories')->get();
        foreach ($dbCategories as $cat) {
            DB::table('services')
                ->where('category', $cat->name)
                ->update(['service_category_id' => $cat->id]);
        }

        // Add foreign key constraint (optional but recommended for safety)
        Schema::table('services', function (Blueprint $table) {
            $table->foreign('service_category_id')
                ->references('id')
                ->on('service_categories')
                ->onDelete('set null');
        });
    }
 
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropForeign(['service_category_id']);
            $table->dropColumn('service_category_id');
        });

        Schema::dropIfExists('service_categories');
    }
};
