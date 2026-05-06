<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

// 1. Create the Administrator Account
        User::factory()->create([
            'name' => 'System Admin',
            'email' => 'admin@commonthread.com',
            'password' => Hash::make('password'), // Easy default password for local testing
            'role' => 'admin', // You will need to make sure your users table has a 'role' or 'is_admin' column
        ]);

        // 2. Create a standard Customer Account for testing the storefront
        User::factory()->create([
            'name' => 'James Bond',
            'email' => 'james@example.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
        ]);
    }
}
