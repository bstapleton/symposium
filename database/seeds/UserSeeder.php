<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'nickname' => Str::random(10),
            'email' => 'webdev.ben@gmail.com',
            'password' => Hash::make('password'),
            'role_id' => 3
        ]);
    }
}
