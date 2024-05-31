<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $employees = User::role('employee')->get();
        return Inertia::render('Admin/Dashboard', ['employees' => $employees]);
    }
}
