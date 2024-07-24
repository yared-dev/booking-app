<?php

namespace App\Admin\Controllers;

use App\Admin\Models\Employee;
use App\Admin\Models\Service;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $categories = auth()->user()->category;

        return Inertia::render('Admin/Service', [
            'categories' => $categories,
            'services' => Service::with('employees', 'category')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|integer|exists:categories,id',
            'duration' => 'required|integer',
            'price' => 'required|numeric',
            'employee' => 'required|array',
            'employee.*' => 'integer|exists:employees,id',
        ]);

        $service = Service::create([
            'name' => $validatedData['name'],
            'category_id' => $validatedData['category'],
            'duration' => $validatedData['duration'],
            'price' => $validatedData['price'],
        ]);

        $service->employees()->sync($validatedData['employee']);

        $categories = auth()->user()->category;

        return Inertia::render('Admin/Service', [
            'categories' => $categories,
            'services' => Service::with('employees', 'category')->get()
        ]);
    }
}
