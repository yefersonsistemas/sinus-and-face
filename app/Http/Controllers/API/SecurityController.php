<?php

namespace App\Http\Controllers\API;

use App\Employe;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Reservation;
Use App\Visitor;
Use App\Person;
Use App\Image;
Use App\Patient;
use Carbon\Carbon;
use App\Http\Requests\CreateVisitorRequest;
use App\Events\Security;

class SecurityController extends Controller
{
   /* protected $data = [
        'patients'
    ];*/
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       
        $reservations = Reservation::whereDate('date', Carbon::now()->format('Y-m-d'))->get(); //mostrar las reservaciones solo del dia
        //dd($visitors);

        if (!empty($reservations)) {

            $patients = $reservations->map(function ($item) {
                $patient = Person::where('id', $item->patient_id)->first();
                    return $patient;
            });

            if ($patients->isNotEmpty()) {
                foreach ($patients as $patient) {
                    Visitor::create([
                        'person_id' => $patient->id,
                        'type_visitor' => 'Paciente',
                        'inside'    => null,
                        'outside'   => null,
                        'branch_id' => 1
                    ]);
                }
            }

            $visitors = Visitor::with('person.image')->whereDate('created_at', Carbon::now()->format('Y-m-d'))
                            ->where('type_visitor', 'Visitante')
                            ->orWhere('type_visitor', 'Paciente')->get(); //obtener solo registros creados hoy
    
            return response()->json([
                'all' => $visitors,
            ]);
        }
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
       //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\CAHttp\Response
     */
    public function update(CARequest $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    
    public function search(Request $request)
    {
       // $persons = Person::all()->dd();
        $person = Person::where('dni', $request->dni)->first(); //busco dni para saber si existe

        if (!is_null($person)) {  //si existe
           $this->create_visitor($person); //lleno solo la tabla visitor

            return response()->json([
                'message' => 'Visitante creado',
                'activo' => 'true',
            ]);

        }else{  //caso de que no exista
            return response()->json([
                'message' => 'Visitante no encontrado debe de crearlo',
                'activo' => 'false',
            ]);
        }
    }

    /**
     * Funcion que permite registrar
     * solamente una persona, sin ejecutar
     * ninguna otra accion
     */
    public function only_person(CreateVisitorRequest $request){
        
        $person = Person::create([
            'type_dni'    => $request->type_dni,
            'dni'         => $request->dni,
            'name'        => $request->name,
            'lastname'    => $request->lastname,
            'address'     => $request->address,
            'phone'       => $request->phone,
            'email'       => $request->email,
            'branch_id'   => 1,
        ]);

        /**
         * Registro de la fotografia 
         */
        if ($request->file('file') != null) {
            $photo = $request->file('file');
            $path = $photo->store('persons');
            $image = new Image;
            $image->path = $path;
            $image->imageable_type = "App\Person";
            $image->imageable_id = $person->id;
            $image->save();
        }

        return response()->json([
            'message' => 'Registrado correctamente',
        ]);
    }

    public function all_visitor(CreateVisitorRequest $request)
    {                                 //no hay registro de esa persona
        $person = Person::create([  //agregar un visitante ya sea un futuro paciente o no
            'type_dni'    => $request->type_dni,
            'dni'         => $request->dni,
            'name'        => $request->name,
            'lastname'    => $request->lastname,
            'address'     => $request->address,
            'phone'       => $request->phone,
            'email'       => $request->email,
            'branch_id'   => 1,
        ]);
        
        $this->create_visitor($person);

        return response()->json([
            'message' => 'Visitante creado',
        ]);

    }

    public function create_visitor(Person $person)
    {
        $visitor = Visitor::create([
            'person_id'      => $person->id,
            'type_visitor'   => 'Visitante', 
            'inside'         => Carbon::now(),
            'outside'        => null,
            'branch_id'      => 1
        ]);

        $person->visitor()->associate($visitor->id); //asociar un visitante a una persona que ya tiene registro

        return response()->json([
            'message' => 'Visitante registrado y dentro de las instalaciones',
        ]);
    }

    public function statusIn(Request $request){
        
        $visitor = Visitor::where('person_id', $request->id)->first();
    
        if (!empty($visitor)) {
            $visitor->type_visitor = 'Paciente';
            $visitor->inside = Carbon::now();

            if ($visitor->save()){
                // event(new Security($visitor)); //envia el aviso a recepcion de que el paciente citado llego 
                return response()->json([
                    'message' => 'Paciente dentro de las instalaciones', 
                ]);
            }else{
                return response()->json([
                    'message' => 'No guardo', 
                ]);
            }
        }else{
            return response()->json([
                'message' => 'No actualizo', 
            ]);
        }
    }

    public function statusOut(Request $request)
    {
        $visitor = Visitor::where('person_id', $request->id)->first();
       // dd($visitor);
    
        if (!empty($visitor) && !empty($visitor->inside)) {
            $visitor->type_visitor = $visitor->type_visitor;
            $visitor->outside = Carbon::now();

            if ($visitor->save()){
                return response()->json([
                    'message' => $visitor->type_visitor.' fuera de las instalaciones', 
                ]);
            }else{
                return response()->json([
                    'message' => 'No guardo', 
                ]);
            }
        }else{
            return response()->json([
                'message' => 'No actualizo', 
            ]);
        }
    }

    // public function statusIn(Request $request)
    // {
    //     $person = Person::where('id', $request->id)->first(); //busco el id 
    //     //$v = Visitor::where('person_id', $request->id)->first(); 
       
    //     if (!is_null($person)) {
    //        // $v->delete(); //borrado logico

    //            $visitor = Visitor::create([       //se crea y se guarda automaticamente el cambio de estado
    //                'person_id' => $person->id,
    //                'type_visitor' => 'Paciente',
    //                'status' => 'dentro',
    //                'branch_id' => 1,
    //            ]);

    //         // event(new Security($visitor)); //envia el aviso a recepcion de que el paciente citado llego 

    //         return response()->json([
    //             'message' => 'Visitante dentro de las instalaciones',
    //         ]);
    //     }
    // }

    // public function statusOut(Request $request)
    // {
    //     $person = Visitor::where('person_id', $request->person_id)->orderBy('created_at', 'desc')->first(); //busco el visitante comparando los id 
    //     $v = Visitor::where('person_id', $request->person_id)->first();
        
    //     if (!is_null($person)) {
    //         $v->delete();

    //         $visitors = Visitor::create([                      
    //             'person_id' => $person->person_id,
    //             'type_visitor' => $person->type_visitor,
    //             'status' => 'fuera',
    //             'branch_id' => 1
    //             ]);

    //         return response()->json([
    //             'message' => 'Visitante fuera de las instalaciones',
    //         ]);
    //     }
    // }
}
