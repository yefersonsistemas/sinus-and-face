<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
Use App\Employe;
Use App\Area;
Use App\Billing;
Use App\AreaAssigment;
use App\Disease;
use App\Http\Requests\CreateBillingRequest;
use App\Http\Requests\CreateAreaAssigmentRequest;
use App\Schedule;
use App\TypeArea;
use App\Person;
use App\InputOutput;
use App\Medicine;
use App\Reservation;
use App\Patient;
use App\Allergy;
use App\Cite;
use App\Doctor;
use App\Assistance;
use App\Itinerary;
use Carbon\Carbon;
use RealRashid\SweetAlert\Facades\Alert;
use App\File;
//use App\Http\Controllers\CitaController;


class InController extends Controller
{
    /**
     * Muestra todas las listas
     * de pacientes
     * 
     */
    public function index()
    {
        $reservations = Reservation::whereDate('date', '>=', Carbon::now()->format('Y-m-d'))->with('person', 'patient.image', 'patient.historyPatient', 'patient.inputoutput','speciality')->get();
        // dd($reservations);
        $aprobadas = Reservation::with('person', 'patient.image', 'patient.historyPatient', 'speciality')->whereDate('date', '>=', Carbon::now()->format('Y-m-d'))->whereNotNull('approved')->get(); 
        
        $canceladas = Reservation::with('person', 'patient.image', 'patient.historyPatient', 'speciality')->whereDate('date', '>=', Carbon::now()->format('Y-m-d'))->whereNotNull('cancel')->get(); 
        
        $reprogramadas = Reservation::with('person', 'patient.image', 'patient.historyPatient', 'speciality')->whereDate('date', '>=', Carbon::now()->format('Y-m-d'))->whereNotNull('reschedule')->get(); 

        $suspendidas = Reservation::with('person', 'patient.image', 'patient.historyPatient', 'speciality')->whereDate('date', '>=', Carbon::now()->format('Y-m-d'))->whereNotNull('discontinued')->get();

        // dd($reservations);
       
        return view('dashboard.checkin.index', compact('reservations', 'aprobadas', 'canceladas', 'suspendidas', 'reprogramadas'));
    }

    //========================= Citas del dia (las que estan aprobadas) ======================
    public function day()
    {
        $day = Reservation::whereDate('date', '=', Carbon::now()->format('Y-m-d'))->whereNotNull('approved')->with('person', 'patient.image', 'patient.historyPatient', 'patient.inputoutput','speciality')->get();
        return view('dashboard.checkin.day', compact('day'));
    }


    public function approved()
    {
        $approved = Reservation::with('person', 'patient.image', 'patient.historyPatient', 'speciality')->whereDate('date', '>=', Carbon::now()->format('Y-m-d'))->whereNotNull('approved')->get(); 
        return view('dashboard.checkin.approved', compact('approved'));
    }

    public function pending()
    {
        $pending = Reservation::with('person', 'patient.image', 'patient.historyPatient', 'speciality')->whereDate('date', '>=', Carbon::now()->format('Y-m-d'))->whereNull('approved')->whereNull('discontinued')->whereNull('cancel')->whereNull('reschedule')->get(); 
        return view('dashboard.checkin.pending', compact('pending'));
    }

    /**
     * Muestra las areas y medicos 
     * disponibles en la vista 
     * de asignar consultorio 
     */
    public function create()
    {
        $type_area = TypeArea::where('name','Consultorio')->first(); // Trae los consultorio
        $areas = Area::with('typearea', 'image')->where('type_area_id',$type_area->id)->get(); // Trae la informacion de Consultorios
        // dd($areas);
        
        $employes = Employe::with('image','person.user', 'speciality', 'assistance','areaassigment')->get();
            // dd($employes);
        $em = collect([]);
        if ($employes->isNotEmpty()) {
            foreach ($employes as $employe) {
                if ($employe->person->user->role('doctor') && $employe->position->name == 'doctor') {
                    if ($employe->schedule->isNotEmpty()) {
                        $dia = strtolower(Carbon::now()->locale('en')->dayName); //Trae los medicos del dia 
                        foreach ($employe->schedule as $schedule) {
                            if ($schedule->day == $dia) {
                                $em->push($employe);
                            }
                        }
                    }
                }
            }
        }
        return view('dashboard.checkin.create', compact('areas', 'em'));
    }

    /**
     * 
     * busca la historia desde la lista de check-in
     * 
     */
    public function search_history(Request $request, $id){ 
        $rs = Reservation::with('patient.historyPatient')->where('id', $id)
                        ->whereDate('date', '>=', Carbon::now()->format('Y-m-d'))->first();

        $cites = Reservation::with('patient.historyPatient','speciality.employe.person')->whereNotIn('id', [$rs->id])->where('patient_id', $request->patient_id)->get();

        $disease = Disease::get();
        $medicine = Medicine::get();
        $allergy = Allergy::get();

        return view('dashboard.checkin.history', compact('rs', 'cites', 'disease', 'medicine', 'allergy'));
    }

     /**
     * 
     * guarda registros nuevos y editados 
     * en la historia del paciente
     * 
     */


    public function guardar(Request $request, $id)  
    {
        $person = Person::where('dni', $request->dni)->first();
        $reservation = Reservation::find($id);
        if (!is_null($person)) {

            if ($person->historyPatient == null) {
                $data = $request->validate([
                    'gender'        =>  'required',
                    'place'         =>  'required',
                    'birthdate'     =>  'required',
                    'weight'        =>  'required',
                    'occupation'    =>  'required',
                    'profession'    =>  'required',
                    'another_email' =>  'nullable',
                    'another_phone' =>  'nullable'
                ]);

                $age = Carbon::create($data['birthdate'])->diffInYears(Carbon::now());

                $patient = Patient::create([
                    'history_number'=> $this->numberHistory(),
                    'another_phone' =>  $data['another_phone'],
                    'another_email' =>  $data['another_email'],
                    'date'          =>  Carbon::now(),
                    'reason'        =>  $reservation->description,
                    'gender'        =>  $data['gender'],
                    'age'           =>  $age,
                    'person_id'     =>  $person->id,
                    'place'         =>  $data['place'],
                    'birthdate'     =>  Carbon::create($data['birthdate']),
                    'weight'        =>  $data['weight'],
                    'occupation'    =>  $data['occupation'],
                    'profession'    =>  $data['profession'],
                    'previous_surgery'  => $request->previous_surgery,
                    'employe_id'    =>  $reservation->person->id,
                    'branch_id'     =>  1,
                ]);
            }

            $patient = Patient::where('person_id', $person->id)->first();

            if ($person->historyPatient != null && $request->birthdate) {

                $age = Carbon::create($request->birthdate)->diffInYears(Carbon::now());

                $patient->update([
                    'history_number'=> $this->numberHistory(),
                    'another_phone' =>  $request->another_phone,
                    'another_email' =>  $request->another_email,
                    'reason'        =>  $reservation->description,
                    'gender'        =>  $request->gender,
                    'age'           =>  $age,
                    'place'         =>  $request->place,
                    'birthdate'     =>  Carbon::create($request->birthdate),
                    'weight'        =>  $request->weight,
                    'occupation'    =>  $request->occupation,
                    'profession'    =>  $request->profession,
                    'previous_surgery'  => $request->previous_surgery,
                ]);
            }

            if (!is_null($patient)) {
                if (!empty($request->disease)) {
                    foreach ($request->disease as $disease) {
                        $di = Disease::find($disease);
                        $patient->disease()->attach($di); 
                    }
                }

                if (!empty($request->medicine)){

                    foreach ($request->medicine as $medicine) {
                        $me = Medicine::find($medicine);
                        $patient->medicine()->attach($me); 
                    }
                }

                if (!empty($request->allergy)){

                    foreach ($request->allergy as $allergy) {
                        $al = Allergy::find($allergy);
                        $patient->allergy()->attach($al); 
                    }
                }

                Alert::success('Guardado exitosamente');
                return redirect()->route('checkin.index');
            }
        }
    }


    //======================== para indicar que el paciente entro a las instalacion ===============
    public function statusIn($id)
    {

        // dd($registro);
        // $busqueda =  Reservation::with('employe.person')->whereDate('date', Carbon::now()->format('Y-m-d'))->where('patient_id', $registro)->first();

        $busqueda = Reservation::with('employe.person')->where('id',$id)->whereDate('date', Carbon::now()->format('Y-m-d'))->first();
        // dd($busqueda);
    
        $paciente = $busqueda->patient_id;
        $doctor = $busqueda->person_id; // en tabla person
        $employe = Employe::where('person_id', $doctor)->first();
        $doctos = Doctor::where('employe_id',$employe->id)->first();

        $itinerary = Itinerary::where('reservation_id', $id)->first();

        $p = Patient::where('person_id', $paciente)->first();

        $io = InputOutput::where('person_id', $p->person_id)->where('employe_id', $employe->id)->first();
        // dd($io);
        if ($io == null) {
            
            $inputOutput= InputOutput::create([       
                'person_id' =>  $paciente,  //paciente tratado
                'inside' => 'dentro',
                'outside' => null,
                'employe_id' =>  $employe->id,  //medico asociado para cuando se quiera buscar todos los pacientes visto por el mismo medico
                'branch_id' => 1,
            ]);

            $itinerary->status ='dentro';
            $itinerary->save();

        }
        else{
            Alert::error('Paciente ya esta dentro');
            return redirect()->back();
        };

        Alert::success('Paciente dentro de las instalaciones');
        return redirect()->back();
    }

    //========================= dentro del consultorio =================
    public function insideOffice($id)
    {
        // dd($id);
        $reservation = Reservation::with('employe.person')->where('id',$id)->whereDate('date', Carbon::now()->format('Y-m-d'))->first();
        // $busqueda =  Reservation::with('employe.person')->whereDate('date', Carbon::now()->format('Y-m-d'))->where('patient_id', $registro)->first();
        // dd($reservation);

        $paciente = $reservation->patient_id;
        $doctor = $reservation->person_id;

        $employe = Employe::where('person_id', $doctor)->first();
        // dd($employe);

        $io = InputOutput::where('person_id', $paciente)->where('employe_id', $employe->id)->first();
        $itinerary = Itinerary::where('reservation_id', $reservation->id)->first();
        $itinerary->status = 'dentro_office';
        $itinerary->save();

        if (empty($io->inside_office)) {
            $io->inside_office = 'dentro';
            $io->save();
            // dd($io);
        }else{
            Alert::error('Paciente ya esta dentro del consultorio');
            return redirect()->back();
        }

        Alert::success('Paciente dentro del consultorio');
        return redirect()->back();
    }
    

    public function status(Request $request)
    {
        $data = $request->validate([
            'reservation_id'    =>  'required',
            'type'              =>  'required',
            'motivo'            =>  'required',
        ]);

        $reservation = Reservation::where('id', $data['reservation_id'])->where('status', '!=', $data['type'])->first();

        if (!is_null($reservation)) {
            if($data['type'] == 'Suspendida'){
                $reservation->discontinued = Carbon::now();
                $cita = Cite::create([
                    'reservation_id'    =>  $data['reservation_id'],
                    'reason'            =>  $data['motivo'],
                    'branch_id'         => 1,
                ]);
                Alert::success('Cita suspendida exitosamente');

            }elseif ($data['type'] == 'Cancelada') {
                if ($reservation->discontinued != null) {
                    $reservation->discontinued = null;
                }elseif ($reservation->approved != null) {
                    $reservation->approved = null;
                }

                $cita = Cite::create([
                    'reservation_id'    =>  $data['reservation_id'],
                    'reason'            =>  $data['motivo'],
                    'branch_id'         => 1,
                ]);
                $reservation->cancel = Carbon::now();
                Alert::success('Cita Cancelada exitosamente');

            }elseif ($data['type'] == 'Aprobada') {
                $reservation->approved = Carbon::now();
                if ($reservation->discontinued != null) {
                    $reservation->discontinued = null;
                }

                Alert::success('Cita Aprobada exitosamente');
            }
            
            $reservation->status = $data['type'];
            $reservation->save();

            return redirect()->route('checkin.index');
        }else{
            Alert::error('No se puede '.$data['type'].' esta cita');
            return redirect()->back();
        }

    }


    public function numberHistory()
    {
        $patient    = Patient::all()->last();
        if ($patient == null) {
            $number = 1;
        } else {
            $number = $patient->id + 1;
        }

        if (strlen($number) == 1) {
            $history_number = 'P-000' . $number;
        } elseif (strlen($number) == 2) {
            $history_number = 'P-00' . $number;
        } elseif (strlen($number) == 3) {
            $history_number = 'P-0' . $number;
        } else {
            $history_number = 'P-' . $number;
        }
        return $history_number;
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
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


    public function destroy($id)
    {
        //
    }
/**
     * busca el area para la
     * asignacion del consultorio
     * 
     */
    public static function search_area(Request $request)
    {
        // dd($request);
        $area = Area::Where('id', $request->id)->first(); 
        // dd($area);
        if ($area != null) {  //si existe
            $areas= $area->name;
            return response()->json([
                'areas' => $areas,
            ]);
            
        }else{  //caso de que no exista
            return response()->json([
                'message' => 'Consultorio no encontrado',
            ]);
        }
    }

/**
     * busca el medico que sera asignado 
     * a un consultorio
     * 
     */
    public static function search_medico(Request $request)
    {
        // dd($request);
        $employe = Employe::with('person')->Where('id', $request->id)->first(); 
        // dd($area);
        if ($employe != null) {  //si existe
            $employes= $employe->person->name;
            return response()->json([
                'employes' => $employes,
            ]);
            
        }else{  //caso de que no exista
            return response()->json([
                'message' => 'Medico no encontrado',
            ]);
        }
    }

    /**
     * 
     * busca el horario que se muestra
     * en lalista de medico
     * 
     */
    public static function horario(Request $request){
        // dd($request);

        $employe = Employe::with('schedule')->where('id', $request->id)->first();

        if(!empty($employe)){
            return response()->json([
                'employe' => $employe,201
            ]);
        }else{
            return response()->json([
                'employe' => 202
            ]);
        }
    }

    /**
     *  
     * guarda el consultorio
     * asignado al medico
     * 
     */


    public static function assigment_area(Request $request) //asignacion de consultorio
    {
            // dd($request);
        $e = $request->employe_id;
        $a = $request->area_id;
// si los datos no estas vacios 
    if($e != null && $a != null){
        
        $existe = AreaAssigment::where('employe_id',$e)->where('area_id', $a)->first();

        if(empty($existe)){
            $areaAssigment = AreaAssigment::create([
            'employe_id'  => $e,
            'area_id'     => $a,
            'branch_id' => 1,
            ]);

            // dd($areaAssigment);

            $act = Area::find($request->area_id);

            $act->status = 'ocupado';
            $act->save();

            // dd($act);

            return redirect()->route('checkin.index')->withSuccess('Consultorio Asignado');
            }
        }else{
            return withSuccess('No se pudo asignar');
        }
    }

    public function update_area(Request $request)
    {
        $a = Area::find($request->id);

        if (!empty($a)) {
        
            $a->status = 'ocupado';
            $a->save();

            // if ($a->save()){
            //    return response()->json([
            //         'message' => 'ocupado', 
            //     ]);
            // }
        }
    }


    public function exams_previos(Request $request)
    {
        $p = Patient::where('id', $request->id)->first();

        File::create([
            'filiable_type' => 'Paciente',
            'filiable_id' => $p->id,

        ]);

        $request->file('nombre del archivo')->store('Exams');
    }
}
