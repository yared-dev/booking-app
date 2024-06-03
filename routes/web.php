<?php

use App\Admin\Controllers\CategoryController;
use App\Admin\Controllers\EmployeeController;
use App\Admin\Controllers\ServiceController;
use App\Admin\Controllers\WorkingHoursController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
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

Route::prefix('admin')->middleware(['auth', 'role:admin'])->group(function () {
    Route::get('dashboard', [AdminController::class, 'index'])->name('admin.dashboard');

    Route::get('employee', [EmployeeController::class, 'index'])->name('admin.employee.index');
    Route::get('employee/create', [EmployeeController::class, 'create'])->name('admin.employee.create');
    Route::post('employee', [EmployeeController::class, 'store'])->name('admin.employee.store');
    Route::get('employee/{employee}/edit', [EmployeeController::class, 'edit'])->name('admin.employee.edit');

    Route::post('user/{id}/working-hours', [WorkingHoursController::class, 'store'])->name('admin.working-hours.store');
    Route::post('user/{id}/working-hours/apply-every-day', [WorkingHoursController::class, 'setEveryDay'])->name('admin.working-hours.every-day');

    Route::get('service', [ServiceController::class, 'index'])->name('admin.service.index');
    Route::post('category', [CategoryController::class, 'store'])->name('admin.category.store');
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
