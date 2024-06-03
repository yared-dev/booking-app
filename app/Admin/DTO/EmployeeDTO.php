<?php

namespace App\Admin\DTO;

class EmployeeDTO
{
    public int $id;
    public string $name;
    public ?string $lastName;
    public string $email;

    /**
     * @param int $id
     * @param string $name
     * @param string|null $lastName
     * @param string $email
     */
    public function __construct(int $id, string $name, ?string $lastName = null, string $email)
    {
        $this->id = $id;
        $this->name = $name;
        $this->lastName = $lastName;
        $this->email = $email;
    }
}
