<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TopicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('topics')->insert([
            [
                'id' => 1,
                'section_id' => 2,
                'title' => 'a topic',
                'content' => 'this is some content for the topic',
                'author_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'section_id' => 2,
                'title' => 'another topic',
                'content' => 'some other stuff goes here',
                'author_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'section_id' => 2,
                'title' => 'old topic',
                'content' => 'topic for necro protection testing',
                'author_id' => 1,
                'created_at' => '2018-01-01',
                'updated_at' => '2018-01-01',
            ]
        ]);
    }
}
