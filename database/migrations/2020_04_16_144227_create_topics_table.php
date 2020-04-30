<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTopicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('topics', function (Blueprint $table) {
            $table->id();
            $table->integer('section_id');
            $table->string('title')->nullable();
            $table->longText('content');
            $table->integer('author_id');
            $table->integer('post_count')->default(0);
            $table->boolean('is_reported')->default(false);
            $table->boolean('is_sticky')->default(false);
            $table->boolean('is_published')->default(1);
            $table->boolean('is_hidden')->default(0);
            $table->boolean('is_locked')->default(0);
            $table->dateTime('hidden_at')->nullable();
            $table->boolean('is_announcement')->default(false);
            $table->integer('downvotes')->default(0);
            $table->integer('upvotes')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('topics');
    }
}
