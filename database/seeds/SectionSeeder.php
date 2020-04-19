<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sections')->insert([
            [
                'id' => 1,
                'title' => 'Parent section',
                'description' => 'parent section description',
                'parent_id' => null,
            ],
            [
                'id' => 2,
                'title' => 'Subsection to parent',
                'description' => 'this is a subsection',
                'parent_id' => 1,
            ]
        ]);
    }
}
