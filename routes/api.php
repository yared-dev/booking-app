<?php

use App\Booking\Controllers\AppointmentController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthenticatedSessionController::class, 'apiLogin']);

Route::group([
    'middleware' => 'auth:sanctum',
    'as' => 'api.'
], function () {
    Route::get('user', function (Request $request) {
        return $request->user();
    });

    Route::get('appointments/generate-magic-link', [AppointmentController::class, 'generateMagicLink']);
});
