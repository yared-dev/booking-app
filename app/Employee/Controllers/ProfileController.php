<?php

namespace App\Employee\Controllers;

use App\Admin\Services\WorkingHoursService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class ProfileController extends Controller
{
    private WorkingHoursService $workingHoursService;

    public function __construct(WorkingHoursService $workingHoursService)
    {
        $this->workingHoursService = $workingHoursService;
    }

    public function show()
    {
        $user = Auth::user();

        return Inertia::render('Employee/Profile', [
            'timeIntervals' => getTimeIntervals(),
            'workingHours' => $this->workingHoursService->getWorkingHoursData($user),
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => ['required', 'max:100'],
            'last' => ['max:100'],
            'password' => ['nullable', Password::defaults()],
        ]);

        $user->name = $request->name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;

        if ($request->filled('password')) {
            $user->password = bcrypt($request->password);
        }

        $user->save();

        return redirect()->back()->with('success', 'Details updated successfully.');
    }
}
