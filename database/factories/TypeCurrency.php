<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\TypeCurrency;
use App\Branch;
use Faker\Generator as Faker;

$factory->define(TypeCurrency::class, function (Faker $faker) {
    $branchoffice = Branch::inRandomOrder()->first();
    return [
        'name'        => $faker->randomElement(['RD', 'USD', 'EUR']),
        'branch_id'   => $branchoffice->id,
    ];
});
