<?php

namespace App\Http\Controllers;

use App\TypeArea;
use App\Image;
use App\Area;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AreasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $type = TypeArea::get();
        return view('dashboard.director.area', compact('type'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'type_area_id' => 'required'
           
        ]);

        $area = Area::create([
            'name' => $data['name'],
            'type_area_id' => $request->type_area_id,
            'branch_id' => 1
        ]);

        $image = $request->file('image');
        $path = $image->store('public/Areas');  
        $path = str_replace('public/', '', $path);
        $image = new Image;
        $image->path = $path;
        $image->imageable_type = "App\Area";
        $image->imageable_id = $area->id;
        $image->branch_id = 1;
        $image->save();

        return redirect()->back()->withSuccess('Registro creado correctamente');
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
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
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

    public function list_area(){
        $a = Area::all();

        return response()->json([
            'area' => $a,
        ]);
    }

    
}