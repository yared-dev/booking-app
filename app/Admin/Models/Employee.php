<?php

namespace App\Admin\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'created_by'];

    public function services()
    {
        return $this->belongsToMany(Service::class, 'employee_service');
    }
}
