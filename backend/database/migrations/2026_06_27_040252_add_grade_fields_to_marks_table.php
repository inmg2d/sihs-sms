<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
public function up(): void
{
    Schema::table('marks', function (Blueprint $table) {

        if (!Schema::hasColumn('marks', 'grade')) {
            $table->string('grade')->nullable()->after('score');
        }

        if (!Schema::hasColumn('marks', 'remark')) {
            $table->string('remark')->nullable()->after('grade');
        }

        if (!Schema::hasColumn('marks', 'points')) {
            $table->integer('points')->nullable()->after('remark');
        }

    });
}

 public function down(): void
{
    Schema::table('marks', function (Blueprint $table) {

        if (Schema::hasColumn('marks', 'grade')) {
            $table->dropColumn('grade');
        }

        if (Schema::hasColumn('marks', 'remark')) {
            $table->dropColumn('remark');
        }

        if (Schema::hasColumn('marks', 'points')) {
            $table->dropColumn('points');
        }

    });
}
};
