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
        Schema::create('fee_structures', function (Blueprint $table) {
            $table->id();

            $table->foreignId('school_class_id')
                  ->constrained('school_classes')
                  ->cascadeOnDelete();

            $table->foreignId('fee_category_id')
                  ->constrained('fee_categories')
                  ->cascadeOnDelete();

            $table->string('academic_year');

            $table->string('term');

            $table->decimal('amount', 12, 2);

            $table->date('due_date')->nullable();

            $table->boolean('active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fee_structures');
    }
};
