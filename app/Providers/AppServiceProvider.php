<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use View;
use Carbon\Carbon;
use App\Reservation;
use App\Stock_pharmacy;
use App\AsignacionMedicine;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // Schema::defaultStringLength(191);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $day = Reservation::whereDate('date', '=', Carbon::now()->format('Y-m-d'))->whereNotNull('approved')->with('person', 'patient.image', 'patient.historyPatient', 'patient.inputoutput','speciality')->get();

        $atendidos = collect([]);

        foreach ($day as $key) {
            if (!empty($key->patient->inputoutput->first()->inside_office) && !empty($key->patient->inputoutput->first()->inside) && !empty($key->patient->inputoutput->first()->outside_office)){
               $atendidos->push($key);
            }
        }

         //contadores de citas mensuales y anuales
        $mes = Carbon::now()->format('m');
        $año = Carbon::now()->format('Y');
        $reserva1 = Reservation::whereMonth('created_at', '=', $mes)->get();
        $reserva2 = Reservation::whereYear('created_at', '=', $año)->get();

        $all = $reserva1->intersect($reserva2);


        // contadores de out
        // contador reservaciones confirmadas de todos los doctores
        $approved = Reservation::with('person', 'patient.image', 'patient.historyPatient', 'speciality')->whereDate('date', '>=', Carbon::now()->format('Y-m-d'))->whereNotNull('approved')->get();

        // contador pacientes en espera de todos los doctores
        $enespera =  Reservation::with('patient.inputoutput')->whereDate('date', Carbon::now()->format('Y-m-d'))->whereNotNull('approved')->get();
        // dd($poratender->count());

        $poratender = collect([]);

        foreach ($enespera as $item) {
            if (empty($item->patient->inputoutput->first()->inside_office) && !empty($item->patient->inputoutput->first()->inside) && empty($item->patient->inputoutput->first()->outside_office) && empty($item->patient->inputoutput->first()->outside)){
               $poratender->push($item);
            }
        }


        //contadores de farmaceuta
            //total de insumos
            $stock = Stock_pharmacy::all();
            $total = 0;
            foreach($stock as $item){
                $total = $total + $item->total;
            }

            //total de insumos asignados
            $stock_asignados = AsignacionMedicine::all();
            $total_asignados = 0;
            // dd($stock_asignados);
            if(!empty($stock_asignados->first())){
                foreach($stock_asignados as $item){
                    $total_asignados = $total_asignados + $item->cantidad;
                }
            }

            // dd($total_asignados);


        View::share('citasDelDia', $day->count());
        View::share('atendidos', $atendidos->count());
        View::share('citasDelMes', count($all));
        View::share('citasAnual', count($reserva2));
        View::share('citasConfirmadas', count($approved));
        View::share('porAtender', count($poratender));

        //farmaceuta
        View::share('totalInsumos', $total);
        View::share('totalAsignados', $total_asignados);

    }










}
