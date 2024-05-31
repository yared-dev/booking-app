<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class EmployeeUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(['name' => 'employee']);

        if (!User::where('email', 'employee@booking.com')->exists()) {
            $admin = User::create([
                'name' => 'Employee User',
                'email' => 'employee@booking.com',
                'password' => bcrypt('employee'),
            ]);

            $admin->assignRole($adminRole);
        }
    }
}
