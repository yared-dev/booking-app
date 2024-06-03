<?php

namespace App\Admin\Controllers;

use App\Admin\Models\Employee;
use App\Admin\Repositories\EmployeeRepository;
use App\Admin\Services\WorkingHoursService;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class EmployeeController extends Controller
{
    private EmployeeRepository $employeeRepository;

    private WorkingHoursService $workingHoursService;

    /**
     * @param EmployeeRepository $employeeRepository
     */
    public function __construct(
        EmployeeRepository $employeeRepository,
        WorkingHoursService $workingHoursService,
    )
    {
        $this->employeeRepository = $employeeRepository;
        $this->workingHoursService = $workingHoursService;
    }

    public function index()
    {
        return Inertia::render('Admin/Employee/Index', [
            'employees' => $this->employeeRepository->findAll(),
        ]);
    }

    public function create()
    {

        return Inertia::render('Admin/Employee/Create', [
            'timeIntervals' => getTimeIntervals(),
            'workingHours' => $this->workingHoursService->getWorkingHoursData(),
        ]);
    }

    public function store(Request $request)
    {
        if (!Auth::getUser()->hasPermissionTo('manage employees')) {
            abort(403, 'Unauthorized action.');
        }

        $request->validate([
            'name' => ['required', 'max:100'],
            'last' => ['max:100'],
            'email' => ['required', 'email', 'max:100'],
            'password' => ['nullable', 'required_with:password', 'min:8'],
        ]);

        $employeeRole = Role::firstOrCreate(['name' => 'employee']);

        try {
            DB::transaction(function () use ($request, $employeeRole) {
                $user = User::create([
                    'name' => $request->name,
                    'last_name' => $request->last_name,
                    'email' => $request->email,
                    'password' => bcrypt($request->password),
                ]);

                $user->assignRole($employeeRole);

                $employee = new Employee([
                    'id' => $user->id,
                ]);

                Auth::getUser()->employee()->save($employee);
            });
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(
                ['code' => $e->getCode(), 'message' => 'An error occurred while creating the employee.'],
                'employeeError'
            );
        }



        return redirect()->route('admin.employee.index');
    }

    public function edit(int $id)
    {
        //dd($employee);
        return Inertia::render('Admin/Employee/Create', [
            'employee' => $this->employeeRepository->findEmployee($id),
            'timeIntervals' => getTimeIntervals(),
            'workingHours' => $this->workingHoursService->getWorkingHoursData(),
        ]);
    }
}
