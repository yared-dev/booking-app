<?php

namespace App\Admin\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $categories = auth()->user()->category;
        //dd($categories);
        return Inertia::render('Admin/Service', [
            'categories' => $categories,
        ]);
    }
}
