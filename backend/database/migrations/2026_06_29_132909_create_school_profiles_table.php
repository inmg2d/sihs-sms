<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('school_profiles', function (Blueprint $table) {

            $table->id();

            $table->string('school_name');
            $table->string('short_name')->nullable();

            $table->string('motto')->nullable();

            $table->string('logo')->nullable();

            $table->text('address')->nullable();

            $table->string('city')->nullable();

            $table->string('region')->nullable();

            $table->string('country')->default('Cameroon');

            $table->string('phone')->nullable();

            $table->string('whatsapp')->nullable();

            $table->string('email')->nullable();

            $table->string('website')->nullable();

            $table->string('principal')->nullable();

            $table->string('director_operations')->nullable();

            $table->string('registrar')->nullable();

            $table->string('bursar')->nullable();

            $table->string('currency')->default('FCFA');

            $table->string('timezone')->default('Africa/Douala');

            $table->string('primary_color')->default('#8B0000');

            $table->string('secondary_color')->default('#FFD700');

            $table->string('school_stamp')->nullable();

            $table->boolean('active')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('school_profiles');
    }
};
