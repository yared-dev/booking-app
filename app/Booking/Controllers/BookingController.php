<?php

namespace App\Booking\Controllers;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
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
        $initialDate = Carbon::parse($request->get('day'))->toDateString();

        $timeSlots = $this->generateTimeSlots($initialDate);

        return Inertia::render('Booking/Index', [
            'timeSlots' => $timeSlots,
        ]);
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
