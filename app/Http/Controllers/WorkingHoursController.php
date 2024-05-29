<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WorkingHoursController extends Controller
{
    public function show(Request $request): Response
    {
        $days = [
            [
                'key' => 0,
                'value' => 'Sunday'
            ],
            [
                'key' => 1,
                'value' => 'Monday'
            ],
            [
                'key' => 2,
                'value' => 'Tuesday'
            ],
            [
                'key' => 3,
                'value' => 'Wednesday'
            ],
            [
                'key' => 4,
                'value' => 'Thursday'
            ],
            [
                'key' => 5,
                'value' => 'Friday'
            ],
            [
                'key' => 6,
                'value' => 'Saturday'
            ],
        ];

        return Inertia::render('WorkingHour/Show', [
            'days' => $days,
            'status' => session('status')
        ]);
    }
}
