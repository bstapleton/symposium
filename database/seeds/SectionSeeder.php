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
                'slug' => 'parent-section',
                'description' => 'parent section description',
                'parent_section_id' => null,
            ],
            [
                'id' => 2,
                'title' => 'Subsection to parent',
                'slug' => 'subsection',
                'description' => 'this is a subsection',
                'parent_section_id' => 1,
            ]
        ]);
    }
}
