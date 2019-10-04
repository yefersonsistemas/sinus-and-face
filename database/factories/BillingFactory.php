<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Billing;
use App\Person;
use App\Patient;
use App\TypePayment;
use App\Employe;
use App\Branch;
use App\Procedure;
use Faker\Generator as Faker;

$factory->define(Billing::class, function (Faker $faker) {
    $person = Person::inRandomOrder()->first();
    $procedure = Procedure::inRandomOrder()->first();
    $employe = Employe::inRandomOrder()->first();
    $patient = Patient::inRandomOrder()->first();
    $typepayment = TypePayment::inRandomOrder()->first();
    $branchoffice = Branch::inRandomOrder()->first();
    return [
        'procedure_employe_id' => $procedure->employe->first()->pivot->id, //debido a que pertenece a una tabla pivote
        'person_id' => $procedure->employe->first()->person->id, //para que mantenga la relacion con el id anterior durante el random 
        'patient_id' => $patient->id,
        'type_payment_id' => $typepayment->id,
        'type_currency' => $faker->word,
        'branch_id' => $branchoffice->id,
    ];
});