<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function() {
    return redirect()->route('login');
})->name('welcome');

Auth::routes();


Route::group(['middleware' => 'auth'], function (){

    Route::get('/home', function() {
        return view('home');
    })->name('home');

    Route::post('person','PersonController@store')->name('person.create');
    Route::post('search/doctor','DoctorController@searchDoctor')->name('search.medic');
    Route::post('search/doctor/schedule','DoctorController@search_schedule')->name('search.schedule');
    Route::get('outside/{id}', 'OutController@statusOut')->name('checkout.statusOut'); // cambia estado depaciente a fuera del consultorio


    Route::get('doctor/recipe/{patient}/{employe}','DoctorController@crearRecipe')->name('doctor.crearRecipe');
    Route::post('doctor/recipe/medicamentos','DoctorController@recipeStore')->name('recipe.store');


    Route::group(['middleware' => ['role:recepcion']], function () {
        Route::get('citas', 'CitaController@index')->name('citas.index');
    });

     //======================= rutas para el usuario ckeckin ====================
    Route::group(['middleware' => ['role:IN']], function () {
        Route::get('cite/day', 'InController@day')->name('checkin.day');
        Route::get('cite/approved', 'InController@approved')->name('checkin.approved');
        Route::get('cite/pending', 'InController@pending')->name('checkin.pending');
        Route::get('cite', 'InController@index')->name('checkin.index');
        Route::get('history/{patient_id}', 'InController@search_history')->name('checkin.history');
        Route::post('assigment/area', 'InController@assigment')->name('checkin.assigment');
        Route::post('search/area','InController@search_area')->name('search.area');  //revisa si el area esta ocupada
        Route::post('search/medico','InController@search_medico')->name('search.medico');  //revisa si el medico esta ocupado
        Route::get('inside/{registro}', 'InController@statusIn')->name('checkin.statusIn'); // cambia estado depaciente dentro del consultorio
        Route::get('insideOffice/{id}', 'InController@insideOffice')->name('checkin.insideOffice'); // cambia estado depaciente a dentro del consultorio
        Route::get('assigment', 'InController@create')->name('checkin.create');
        Route::post('assigment/create', 'InController@assigment_area')->name('checkin.assigment_area');
        Route::post('create', 'InController@store')->name('checkin.store');
        Route::get('list', 'EmployesController@doctor_on_day')->name('checkin.doctor');
        Route::get('list/todos', 'EmployesController@doctor_on_todos')->name('checkin.doctor_todos');
        Route::post('Doctor/asistencia', 'EmployesController@assistance')->name('checkin.asistencia');
        Route::post('horario', 'InController@horario')->name('checkin.horario');
        Route::POST('save/{id}', 'InController@guardar')->name('save.history');
        Route::post('status', 'InController@status')->name('checkin.status');
 

        // Recepcion
        Route::get('cite/create','CitaController@create')->name('reservations.create');
        Route::get('cite/edit/{cite}','CitaController@edit')->name('reservation.edit');
        Route::post('search/reception/patient','CitaController@search_patient')->name('search.patient');
        Route::post('cite/store','CitaController@store')->name('reservation.store');
        Route::post('cite/status', 'CitaController@status')->name('reservation.status');
        
        Route::put('cite/edit/{cite}','CitaController@update')->name('reservations.update');
        Route::get('patient/create/{reservation}', 'CitaController@createHistory')->name('patients.generate');
        Route::post('patient/create/{reservation}','CitaController@storeHistory')->name('patients.store');
    });


    //======================= rutas para el usuario ckeckout ====================
    Route::group(['middleware' => ['role:OUT']], function () {
        Route::get('index', 'OutController@index')->name('checkout.index');                          // mostrar pacientes del dia
        Route::get('cirugias', 'OutController@index_cirugias')->name('checkout.index_cirugias');   // mostrar cirugias
        Route::get('procedimientos', 'OutController@index_procedimientos')->name('checkout.index_procedimientos');   // mostrar cirugias
        Route::get('cirugias/detalles/{id}', 'OutController@cirugias_detalles')->name('checkout.cirugias_detalles');  // detalles de cirugias
        Route::get('facturacion', 'OutController@create')->name('checkout.facturacion');           // para generar factura
        Route::post('search/patient','OutController@search_patient')->name('checkout.patient');    // buscar paciente    
        Route::post('factura/generar', 'OutController@guardar_factura')->name('checkout.guardar_factura');  // guardando datos del P/D/P
        Route::get('procedimiento/{registro}', 'OutController@search_procedure')->name('checkout.search_procedure');  // buscar procedimiento

        Route::POST('registro', 'OutController@create_cliente')->name('checkout.person');           // mostrar factura
        Route::post('imprimir', 'OutController@imprimir_factura')->name('checkout.imprimir_factura');           // mostrar factura

        Route::get('imprimir/examen/{id}', 'OutController@imprimir_examen')->name('checkout.imprimir_examen');           // imprimir examen
        Route::get('imprimir/recipe/{id}', 'OutController@imprimir_recipe')->name('checkout.imprimir_recipe');           // imprimir recipe
        Route::get('generar/examen/{patient}','OutController@crearExamen')->name('checkout.crear_examen');
        Route::post('guardar/examens/{patient}','OutController@storeDiagnostic')->name('checkout.diagnostic.store');
        Route::get('constancia/{id}','OutController@imprimir_constancia')->name('checkout.imprimir_constancia'); // imprimir constancia
        Route::get('reposo/{id}','OutController@imprimir_reposo')->name('checkout.imprimir_reposo'); // imprimir reposo medico
        Route::get('referencia/{id}','OutController@imprimir_referencia')->name('checkout.imprimir_referencia'); // imprimir referencia medica
        Route::get('informe/{id}','OutController@imprimir_informe')->name('checkout.imprimir_informe'); // imprimir informe medico
    });

    Route::group(['middleware' => ['role:doctor']], function () {
        Route::get('/doctor', 'DoctorController@index')->name('doctor.index');
        // Route::get('doctor', 'DoctorController@index')->name('doctor.index');
        // Route::get('doctor/store', 'DoctorController@store')->name('doctor.index');
        Route::get('doctor/diagnostico/{patient}','DoctorController@crearDiagnostico')->name('doctor.crearDiagnostico');
        Route::post('doctor/diagnostico/{patient}','DoctorController@storeDiagnostic')->name('diagnostic.store');
        Route::get('doctor/Referencia/{patient}','DoctorController@crearReferencia')->name('doctor.crearReferencia');
        Route::resource('doctor', 'DoctorController');
        Route::post('doctor/Referencia','DoctorController@referenceStore')->name('reference.store');
    });

    Route::group(['middleware' => ['role:director']], function(){

        //inicio de rutas para crear
        Route::get('', 'DirectorController@index')->name('employe.index');
        Route::get('doctor/create', 'DirectorController@create')->name('doctor.create');
        Route::POST('/doctor', 'DirectorController@store')->name('doctor.store');
        Route::get('create', 'EmployesController@create')->name('employe.create');
        Route::POST('/employe', 'EmployesController@store')->name('employe.store');
        Route::get('typearea/create', 'TypeAreasController@create')->name('type-area.create');
        Route::POST('/typearea', 'TypeAreasController@store')->name('type-area.store');
        Route::get('consultorio/create', 'AreasController@create')->name('consultorio.create');
        Route::POST('/consultorio', 'AreasController@store')->name('consultorio.store');
        Route::get('exam/create', 'ExamController@create')->name('exam.create');
        Route::POST('/exam', 'ExamController@store')->name('exam.store');
        Route::get('medicine/create', 'MedicinesController@create')->name('medicine.create');
        Route::POST('/medicine', 'MedicinesController@store')->name('medicine.store');
        Route::get('disease/create', 'DiseasesController@create')->name('disease.create');
        Route::POST('disease', 'DiseasesController@store')->name('disease.store');
        Route::get('speciality/create', 'SpecialityController@create')->name('speciality.create');
        Route::POST('/speciality', 'SpecialityController@store')->name('speciality.store');
        Route::get('position/create', 'PositionsController@create')->name('position.create');
        Route::POST('/position', 'PositionsController@store')->name('position.store');
        Route::get('procedure/create', 'ProcedureController@create')->name('procedure.create');
        Route::POST('/procedure', 'ProcedureController@store')->name('procedure.store');
        Route::get('service/create', 'ServiceController@create')->name('service.create');
        Route::POST('/service', 'ServiceController@store')->name('service.store');
        Route::get('surgery/create', 'TypeSurgerysController@create')->name('surgery.create');
        Route::POST('/surgery', 'TypeSurgerysController@store')->name('surgery.store');
        Route::get('allergy/create', 'AllergyController@create')->name('allergy.create');
        Route::POST('/allergy', 'AllergyController@store')->name('allergy.store');
        Route::get('clase/create', 'TypeDoctorController@create')->name('clase.create');
        Route::POST('/clase', 'TypeDoctorController@store')->name('clase.store');
        Route::get('price/create', 'DirectorController@create_price')->name('price.create');
        Route::POST('/price', 'DirectorController@store_price')->name('price.store');
        Route::get('payment/create', 'TypePaymentsController@create')->name('payment.create');
        Route::POST('/payment', 'TypePaymentsController@store')->name('payment.store');

        //inicio de rutas para editar
        Route::get('list','DirectorController@all_register')->name('all.register');
        Route::get('allergy/{id}', 'AllergyController@edit')->name('allergy.edit');
        Route::put('allergy/update/{id}', 'AllergyController@update')->name('allergy.update');
        Route::get('area/{id}', 'AreasController@edit')->name('area.edit');
        Route::put('area/update/{id}', 'AreasController@update')->name('area.update');
    });
});
