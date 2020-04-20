<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->integer('author_id');
            $table->integer('parent_post_id')->nullable(); // If it's a reply to a post
            $table->integer('topic_id')->nullable();
            $table->integer('downvotes')->default(0);
            $table->integer('upvotes')->default(0);
            $table->integer('hierarchical_level')->default(0); // To restrict excessive nesting - TODO: not sure if we need this...
            $table->longText('content');
            $table->integer('comment_count')->default(0);
            $table->boolean('is_reported')->default(false);
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
        Schema::dropIfExists('posts');
    }
}
