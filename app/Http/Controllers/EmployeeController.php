<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function profile()
    {
        $user = Auth::user();
        return Inertia::render('Employee/Profile', ['user' => $user]);
    }
}
