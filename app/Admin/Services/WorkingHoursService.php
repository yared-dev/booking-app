<?php

namespace App\Admin\Services;

use App\Admin\Models\WorkingHour;
use Illuminate\Support\Collection;

class WorkingHoursService
{
    public function getWorkingHoursData(): Collection
    {
        // Define all days of the week with default values
        $daysOfWeek = [
            ['key' => 0, 'value' => 'Sunday', 'start_time' => null, 'end_time' => null],
            ['key' => 1, 'value' => 'Monday', 'start_time' => null, 'end_time' => null],
            ['key' => 2, 'value' => 'Tuesday', 'start_time' => null, 'end_time' => null],
            ['key' => 3, 'value' => 'Wednesday', 'start_time' => null, 'end_time' => null],
            ['key' => 4, 'value' => 'Thursday', 'start_time' => null, 'end_time' => null],
            ['key' => 5, 'value' => 'Friday', 'start_time' => null, 'end_time' => null],
            ['key' => 6, 'value' => 'Saturday', 'start_time' => null, 'end_time' => null],
        ];

        // Fetch data from the database
        $workingHours = WorkingHour::all();

        // Map the fetched data to the default days of the week
        foreach ($workingHours as $workingHour) {
            $index = $workingHour->day_of_week;
            $daysOfWeek[$index]['start_time'] = substr($workingHour->start_time, 0, 5);
            $daysOfWeek[$index]['end_time'] = substr($workingHour->end_time, 0, 5);
        }

        // Sort data from Monday (1) to Sunday (0)
        return collect($daysOfWeek)->sortBy(function ($item) {
            // Adjust the sorting order so that Sunday (0) comes last
            return $item['key'] == 0 ? 7 : $item['key'];
        })->values(); // Reset keys after sorting
    }
}
