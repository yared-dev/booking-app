<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WorkingHoursController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/*Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');*/

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('admin/employees', [AdminController::class, 'index'])->name('admin.employees.index');
});

/*Route::get('/employee', function () {
   return Inertia::render('EmployeeLogin');
});*/

Route::middleware(['auth', 'role:employee'])->group(function () {
    Route::get('employee/profile', [EmployeeController::class, 'profile'])->name('employee.profile');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/working-hours', [WorkingHoursController::class, 'show'])->name('working-hours.show');
    Route::post('/working-hours', [WorkingHoursController::class, 'create'])->name('working-hours.create');
});

require __DIR__.'/auth.php';
