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
        Schema::table('school_classes', function (Blueprint $table) {

            $table->string('name')->after('id');

            $table->string('section')->after('name');

            $table->string('academic_year')->after('section');

            $table->foreignId('class_teacher_id')
                  ->nullable()
                  ->after('academic_year')
                  ->constrained('teachers')
                  ->nullOnDelete();

            $table->integer('capacity')
                  ->default(50)
                  ->after('class_teacher_id');

            $table->boolean('active')
                  ->default(true)
                  ->after('capacity');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('school_classes', function (Blueprint $table) {

            $table->dropForeign(['class_teacher_id']);

            $table->dropColumn([
                'name',
                'section',
                'academic_year',
                'class_teacher_id',
                'capacity',
                'active',
            ]);
        });
    }
};
