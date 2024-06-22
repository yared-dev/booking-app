<?php

use App\Admin\Controllers\CategoryController;
use App\Admin\Controllers\EmployeeController;
use App\Admin\Controllers\ServiceController;
use App\Admin\Controllers\WorkingHoursController;
use App\Booking\Controllers\AppointmentController;
use App\Booking\Controllers\BookingController;
use App\Employee\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});*/

Route::get('/', function () {
    return redirect()->route('login');
});

/*Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');*/

Route::get('appointment/{code}/{encryptedUserId}', [AppointmentController::class, 'handleMagicLink'])->name('appointment.index');

/*Route::get("booking/{key}", [BookingController::class, 'index'])->name('booking.index');*/
Route::post("booking/available-slots", [BookingController::class, 'availableSlots'])->name('booking.available-slots');

Route::prefix('admin')->middleware(['auth', 'role:admin'])->group(function () {
    Route::get('dashboard', [AdminController::class, 'index'])->name('admin.dashboard');

    Route::get('employee', [EmployeeController::class, 'index'])->name('admin.employee.index');
    Route::get('employee/create', [EmployeeController::class, 'create'])->name('admin.employee.create');
    Route::post('employee', [EmployeeController::class, 'store'])->name('admin.employee.store');
    Route::put('employee/{id}', [EmployeeController::class, 'update'])->name('admin.employee.update');
    Route::get('employee/{employee}/edit', [EmployeeController::class, 'edit'])->name('admin.employee.edit');


    Route::get('service', [ServiceController::class, 'index'])->name('admin.service.index');
    Route::post('category', [CategoryController::class, 'store'])->name('admin.category.store');
});

Route::prefix('employee')->middleware(['auth', 'role:employee'])->group(function () {
    Route::get('profile', [ProfileController::class, 'show'])->name('employee.profile');

    Route::put('edit', [ProfileController::class, 'update'])->name('employee.profile.update');

    Route::get('appointments', [AppointmentController::class, 'index'])->name('user.appointments');
});

Route::middleware(['auth', 'role:admin|employee'])->group(function () {
    Route::post('user/{id}/working-hours', [WorkingHoursController::class, 'store'])->name('admin.working-hours.store');
    Route::post('user/{id}/working-hours/apply-every-day', [WorkingHoursController::class, 'setEveryDay'])->name('admin.working-hours.every-day');


});

/*Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/working-hours', [WorkingHoursController::class, 'show'])->name('working-hours.show');
    Route::post('/working-hours', [WorkingHoursController::class, 'create'])->name('working-hours.create');
});*/

require __DIR__.'/auth.php';
