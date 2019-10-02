<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $table = 'reservations';

    protected $fillable = [
        'date', 'description', 'status', 'schedule_id', 'branch_id'
    ];

    public function employe()
    {
        return $this->belongsTo('App\Emplopye','employe_id');
    }

    public function consultationType()
    {
        return $this->belongsTo('App\ConsultationType');
    }

    public function schedule()
    {
        return $this->belongsTo('App\Schedule','schedule_id');
    }

    public function person()
    {
        return $this->belongsTo('App\Person');
    }

    public function branch()
    {
        return $this->belongsTo('App\Branch');
    }


}
