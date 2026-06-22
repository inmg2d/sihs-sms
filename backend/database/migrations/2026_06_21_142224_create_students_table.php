<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();

            $table->string('matricule')->unique();

            $table->string('first_name');
            $table->string('last_name');

            $table->enum('gender', ['Male', 'Female']);

            $table->date('date_of_birth')->nullable();

            $table->string('phone')->nullable();

            $table->string('parent_name')->nullable();
            $table->string('parent_phone')->nullable();

            $table->string('class')->nullable();

            $table->enum('section', [
                'Grammar',
                'Science',
                'Commercial',
                'Technical'
            ])->nullable();

            $table->string('photo')->nullable();

            $table->boolean('active')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
