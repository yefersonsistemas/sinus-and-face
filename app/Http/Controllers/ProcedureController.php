<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Procedure;
use App\Employe;
use App\Speciality;

//use Carbon\Carbon;


class ProcedureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Employe $doctor)
    {   
        // $procedures = $doctor->procedures;
        // $doctors   = Employe::role('doctor')->get();

        $speciality = Speciality::get();
        return view('dashboard.director.procedure',compact('speciality'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $doctor = Employe::find($request->doctor);

        $data =  $request->validate([
            'name'   => 'required',
            'description' => 'required',
            'price'   => 'required',
            'speciality_id' => 'required',
            'price.required' => 'Es obligatorio precio del procedimiento.',
        ]);

        $procedure =  Procedure::create([
            'name'            => $data['name'],
            'description'     => $data['description'],
            'price'           => $data['price'],
            'speciality_id'   => $request->speciality_id,
            'branch_id'       => 1
        ]);

        // $doctor->procedures()->attach($procedure->id);
        
        // return response()->json([
        //     'message' => 'Procedimiento creado satisfactoriamente',
        // ]);

        return redirect()->back()->withSuccess('Registro agregado correctamente');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Procedure  $procedure
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Procedure $procedure)
    {
       
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Procedure  $procedure
     * @return \Illuminate\Http\Response
     */
    public function edit(Procedure $procedure, $id)
    {
        $procedure = Procedure::with('speciality')->where('id', $id)->first();
        $speciality = Speciality::all();
        return view('dashboard.director.procedure-edit', compact('procedure', 'speciality'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Procedure  $procedure
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        // dd($request);
        $procedure = Procedure::with('speciality')->where('id', $request->id)->first();
        $procedure->name          =  $request->name;
        $procedure->price         =  $request->price;
        $procedure->description   =  $request->description; 
        $procedure->save();   
        
        $procedure->speciality()->sync($request->speciality);
        return redirect()->route('all.register')->withSuccess('Registro modificado');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Procedure  $procedure
     * @return \Illuminate\Http\Response
     */
    public function destroy(Procedure $procedure)
    {/*
        $doctor = $procedure->doctors->first();
        $doctor->procedures()->detach($procedure->id);
        $procedure->delete();
        return redirect()->back()->withSuccess('Se ha Eliminacion correctamente');*/
    }
}

