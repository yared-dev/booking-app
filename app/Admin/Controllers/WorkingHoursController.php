<?php

namespace App\Admin\Controllers;

use App\Admin\Models\WorkingHour;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WorkingHoursController extends Controller
{
    public function store(int $id, Request $request)
    {
        $existingDay = WorkingHour::where('day_of_week', $request->day)
            ->where('user_id', $id)
            ->first();

        if ($existingDay) {
            $existingDay->start_time = $request->start;
            $existingDay->end_time = $request->end;
            $existingDay->save();
        } else {
            $newDay = new WorkingHour();
            $newDay->user_id = $id;
            $newDay->day_of_week = $request->day;
            $newDay->start_time = $request->start;
            $newDay->end_time = $request->end;
            $newDay->save();
        }

        return response()->json(['message' => 'Working hours updated successfully.']);
        //return redirect()->back()->with('success', 'Working hours updated successfully.');
        //return redirect(route('admin.employee.edit', $id));
    }

    public function setEveryDay(int $id, Request $request)
    {
        $daysOfWeek = [
            ['key' => 0],
            ['key' => 1],
            ['key' => 2],
            ['key' => 3],
            ['key' => 4],
            ['key' => 5],
            ['key' => 6],
        ];

        foreach ($daysOfWeek as $day) {
            $existingDay = WorkingHour::where('day_of_week', $day['key'])
                ->where('user_id', $id)
                ->first();

            if ($existingDay) {
                $existingDay->start_time = $request->start;
                $existingDay->end_time = $request->end;
                $existingDay->save();
            } else {
                $newDay = new WorkingHour();
                $newDay->user_id = $id;
                $newDay->day_of_week = $day['key'];
                $newDay->start_time = $request->start;
                $newDay->end_time = $request->end;
                $newDay->save();
            }
        }

        return redirect()->back()->with('success', 'Working hours updated successfully.');
        // return redirect(route('admin.employee.edit', $id));
    }
}
