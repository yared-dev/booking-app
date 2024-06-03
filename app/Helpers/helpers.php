<?php

use Carbon\Carbon;

if (!function_exists('getTimeIntervals')) {
    function getTimeIntervals(int $intervalMinutes = 30, $format = 'H:i'): array
    {
        $intervals = [];
        $start = Carbon::createFromTime(0, 0); // Start at 00:00
        $end = Carbon::createFromTime(23, 59);   // End at 23:59

        while ($start <= $end) {
            $intervals[] = $start->format($format);
            $start->addMinutes($intervalMinutes);
        }

        return $intervals;
    }
}
