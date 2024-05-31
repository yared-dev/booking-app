<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::create(['name' => 'admin']);
        $employeeRole = Role::create(['name' => 'employee']);

        Permission::create(['name' => 'manage employees']);
        Permission::create(['name' => 'manage bookings']);

        $adminRole->givePermissionTo('manage employees');
        $employeeRole->givePermissionTo('manage bookings');
    }
}
