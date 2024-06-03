<?php

namespace App\Admin\Repositories;

use App\Admin\DTO\EmployeeDTO;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class EmployeeRepository
{
    private function newQuery(): Builder
    {
        // This method should return an instance of the query builder.
        // Adjust this method to match your actual implementation.
        return DB::table('employees');
    }

    /**
     * @return Collection|EmployeeDTO[]
     */
    public function findAll(): array|Collection
    {
        $queryBuilder = $this->newQuery();

        return $queryBuilder->select('e.id', 'u.name', 'u.last_name', 'u.email')
            ->from('employees as e')
            ->join('users as u', 'e.id', '=', 'u.id')
            ->where('e.created_by', auth()->id())
            ->get()
            ->map(function ($employee) {
                return new EmployeeDTO(
                    $employee->id,
                    $employee->name,
                    $employee->last_name,
                    $employee->email
                );
            });
    }

    /**
     * @return EmployeeDTO|null
     */
    public function findEmployee(int $id): ?EmployeeDTO
    {
        $employee = $this->newQuery()->select('e.id', 'u.name', 'u.last_name', 'u.email')
            ->from('employees as e')
            ->join('users as u', 'e.id', '=', 'u.id')
            ->where('e.created_by', auth()->id())
            ->where('e.id', $id)
            ->first();

        if ($employee) {
            return new EmployeeDTO(
                $employee->id,
                $employee->name,
                $employee->last_name,
                $employee->email
            );
        };
        return null;
    }
}
