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
                'id' => 1,
                'author_id' => 1,
                'parent_id' => null,
                'content' => 'this is some content for the topic',
                'topic_id' => 1,
            ],
            [
                'id' => 2,
                'author_id' => 1,
                'parent_id' => 1,
                'content' => 'i totally agree',
                'topic_id' => 1,
            ],
            [
                'id' => 3,
                'author_id' => 1,
                'parent_id' => 2,
                'content' => 'nah fam, you an idiot',
                'topic_id' => 1,
            ]
        ]);
    }
}
