<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('posts')->insert([
            [
                'id' => 2,
                'author_id' => 1,
                'parent_post_id' => null,
                'content' => 'i totally agree',
                'topic_id' => 1,
            ],
            [
                'id' => 3,
                'author_id' => 1,
                'parent_post_id' => 2,
                'content' => 'nah fam, you an idiot',
                'topic_id' => 1,
            ]
        ]);
    }
}
