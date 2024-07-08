<?php

namespace App\Booking\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index(Request $request, string $employeeKey)
    {
        return Inertia::render('Booking/Index', [
            'employeeKey' => $employeeKey,
        ]);
    }

    public function availableSlots(Request $request)
    {
        $user = User::where('id', $request->get('employee'))->first();

        if (!$user->hasRole('employee')) {
            return redirect()->back()->withErrors(
                ['code' => 419, 'message' => 'An error occurred while creating the employee.'],
                'employeeError'
            );
        }

        $initialDate = Carbon::parse($request->get('day'))->toDateString();

        $timeSlots = $this->generateTimeSlots($initialDate);

        return response()->json(['timeSlots' => $timeSlots]);
    }

    private function generateTimeSlots($date)
    {
        $start = Carbon::parse($date)->startOfDay();
        $end = Carbon::parse($date)->endOfDay();

        $timeSlots30Min = [];
        $timeSlots1Hour = [];

        $current = clone $start;
        while ($current->lessThanOrEqualTo($end)) {
            $timeSlots30Min[] = $current->toTimeString();
            $current->addMinutes(30);
        }

        $current = clone $start;
        while ($current->lessThanOrEqualTo($end)) {
            $timeSlots1Hour[] = $current->toTimeString();
            $current->addHour();
        }

        return [
            '30_min_intervals' => $timeSlots30Min,
            '1_hour_intervals' => $timeSlots1Hour
        ];
    }

}
