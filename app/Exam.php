<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    protected $table = 'exams';

    protected $fillable = [ 
        'name', 'branch_id'
    ];

    public function patient()
    {
        return $this->belongsToMany('App\Patient');
    }

    public function branch()
    {
        return $this->belongsTo('App\Branch');
    }
}