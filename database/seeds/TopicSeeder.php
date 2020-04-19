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
            ],
            [
                'id' => 2,
                'section_id' => 2,
                'title' => 'another topic',
                'content' => 'some other stuff goes here',
                'author_id' => 1,
            ],
        ]);
    }
}
