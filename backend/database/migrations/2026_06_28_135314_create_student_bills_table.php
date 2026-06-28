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
        Schema::create('student_bills', function (Blueprint $table) {

            $table->id();

            $table->foreignId('student_id')
                  ->constrained('students')
                  ->cascadeOnDelete();

            $table->foreignId('school_class_id')
                  ->constrained('school_classes')
                  ->cascadeOnDelete();

            $table->string('academic_year');

            $table->string('term');

            $table->decimal('total_amount', 12, 2);

            $table->decimal('amount_paid', 12, 2)->default(0);

            $table->decimal('balance', 12, 2);

            $table->enum('status', [
                'Pending',
                'Partial',
                'Paid'
            ])->default('Pending');

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_bills');
    }
};
