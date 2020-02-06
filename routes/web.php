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
    Route::post('search/reception/patient','CitaController@search_patient')->name('search.patient');

    //eliminar
    Route::post('doctor/eliminar/enfermedad', 'DoctorController@enfermedad_eliminar')->name('doctor.enfermedad_eliminar');  // eliminar examen
    Route::post('doctor/eliminar/alergia', 'DoctorController@alergia_eliminar')->name('doctor.alergia_eliminar');  // eliminar examen
    Route::post('doctor/eliminar/cirugia_previas', 'DoctorController@cirugia_borrar')->name('doctor.cirugia_borrar');  // eliminar examen
    Route::post('doctor/eliminar/medicamento', 'InController@medicine_borrar')->name('checkin.medicine_borrar');  // eliminar examen

    //agregar
    Route::post('doctor/enfermedad', 'DoctorController@agregar_enfermedad')->name('doctor.agregar_enfermedad');  // eliminar examen     
    Route::post('doctor/alergias', 'DoctorController@agregar_alergias')->name('doctor.agregar_alergias');  // eliminar examen

    Route::group(['middleware' => ['role:recepcion']], function () {
        Route::get('citas', 'CitaController@index')->name('citas.index');
    });

     //======================= rutas para el usuario ckeckin ====================
    Route::group(['middleware' => ['role:IN, director']], function () {
        Route::get('cite/day', 'InController@day')->name('checkin.day');
        Route::get('record/cite', 'InController@record')->name('checkin.record');
        Route::get('cite/approved', 'InController@approved')->name('checkin.approved');
        Route::get('cite/pending', 'InController@pending')->name('checkin.pending');
        Route::get('cite', 'InController@index')->name('checkin.index');
        Route::get('history/{patient_id}/{id}', 'InController@search_history')->name('checkin.history');
        Route::post('assigment/area', 'InController@assigment')->name('checkin.assigment');
        Route::post('search/area','InController@search_area')->name('search.area');  //revisa si el area esta ocupada
        Route::post('search/medico','InController@search_medico')->name('search.medico');  //revisa si el medico esta ocupado
        Route::get('inside/{registro}', 'InController@statusIn')->name('checkin.statusIn'); // cambia estado depaciente dentro del consultorio
        Route::get('insideOffice/{id}', 'InController@insideOffice')->name('checkin.insideOffice'); // cambia estado depaciente a dentro del consultorio
        Route::get('assigment', 'InController@create')->name('checkin.create');                    //asigna consultorio
        Route::post('assigment/create', 'InController@assigment_area')->name('checkin.assigment_area');
        Route::post('create', 'InController@store')->name('checkin.store');
        Route::get('medicos/list', 'EmployesController@doctor_on_day')->name('checkin.doctor');
        Route::get('list/todos', 'EmployesController@doctor_on_todos')->name('checkin.doctor_todos');
        Route::post('Doctor/asistencia', 'EmployesController@assistance')->name('checkin.asistencia');
        Route::post('horario', 'InController@horario')->name('checkin.horario');
        Route::POST('save/{id}', 'InController@guardar')->name('save.history');
        Route::post('status', 'InController@status')->name('checkin.status');
        Route::post('exams_previos', 'InController@exams_previos')->name('checkin.exams');
        Route::post('guardar_foto', 'InController@guardar_foto')->name('checkin.avatar');
        Route::get('mostrar', 'InController@consultorio')->name('checkin.consultorio');  //muestra los consultorios
        Route::get('change/{id}', 'InController@change')->name('checkin.cambiar');

        // Recepcion
        Route::get('cite/create','CitaController@create')->name('reservations.create');
        Route::get('cite/edit/{cite}','CitaController@edit')->name('reservation.edit');
        // Route::post('search/reception/patient','CitaController@search_patient')->name('search.patient');
        Route::post('cite/store','CitaController@store')->name('reservation.store');
        Route::post('cite/status', 'CitaController@status')->name('reservation.status');
        Route::get('approved/cite/{reservation}', 'CitaController@approved')->name('cita.aprobada');

        Route::put('cite/edit/{cite}','CitaController@update')->name('reservations.update');
        Route::get('patient/create/{reservation}', 'CitaController@createHistory')->name('patients.generate');
        Route::post('patient/create/{reservation}','CitaController@storeHistory')->name('patients.store');
        Route::delete('delete/{id}','CitaController@delete_cite')->name('delete.cite');

        
        Route::post('patient/diseases','InController@diseases')->name('checkin.diseases'); //para agregar las enfermedades que tiene el paciente
        Route::post('patient/allergies','InController@allergies')->name('checkin.allergies'); //para agregar las alergias que tiene el paciente
        Route::post('patient/medicines','InController@medicines')->name('checkin.medicines'); //para agregar las medicamentos que toma el paciente
        Route::post('cita/foto', 'CitaController@tomar_foto')->name('cita.foto');

        Route::POST('patient/diseases/create', 'InController@diseases_create')->name('checkin.diseases_create');
        Route::POST('patient/allergies/create', 'InController@allergies_create')->name('checkin.allergies_create');
        Route::POST('patient/medicines/create', 'InController@medicines_create')->name('checkin.medicines_create');
    });

    //======================= rutas para el usuario ckeckout ====================
        Route::group(['middleware' => ['role:OUT, director']], function () {
        Route::get('citas/deldia', 'OutController@index')->name('checkout.index');                          // mostrar pacientes del dia
        Route::get('cirugias', 'OutController@index_cirugias')->name('checkout.index_cirugias');   // mostrar cirugias
        Route::get('procedimientos', 'OutController@index_procedimientos')->name('checkout.index_procedimientos');   // mostrar cirugias
        Route::get('cirugias/detalles/{id}/{cirugia}', 'OutController@cirugias_detalles')->name('checkout.cirugias_detalles');  // detalles de cirugias
        Route::get('facturacion', 'OutController@create')->name('checkout.facturacion');           // para generar factura
        Route::get('facturacion/paciente/{id}', 'OutController@createF')->name('checkout.facturacionLista');           // para generar factura

        Route::post('search/patient','OutController@search_patient')->name('checkout.patient');    // buscar paciente
        Route::post('factura/generar', 'OutController@guardar_factura')->name('checkout.guardar_factura');  // guardando datos del P/D/P
        Route::get('procedimiento/{registro}', 'OutController@search_procedure')->name('checkout.search_procedure');  // buscar procedimiento
        Route::POST('registro', 'OutController@create_cliente')->name('checkout.person');
                 // mostrar factura
        Route::get('generar/examen/{patient}','OutController@crearExamen')->name('checkout.crear_examen');

        Route::post('imprimir', 'OutController@imprimir_factura')->name('checkout.imprimir_factura');           // mostrar factura
        Route::get('imprimir/itinerary/{id}', 'OutController@imprimir_factura2')->name('checkout.imprimir_factura2');           // mostrar factura

        Route::get('imprimir/examen/{id}', 'OutController@imprimir_examen')->name('checkout.imprimir_examen');           // imprimir examen
        Route::get('imprimir/recipe/{id}', 'OutController@imprimir_recipe')->name('checkout.imprimir_recipe');           // imprimir recipe
        Route::get('constancia/{id}','OutController@imprimir_constancia')->name('checkout.imprimir_constancia');  // imprimir constancia
        Route::get('reposo/{id}','OutController@imprimir_reposo')->name('checkout.imprimir_reposo');  // imprimir reposo medico
        Route::get('referencia/{id}','OutController@imprimir_referencia')->name('checkout.imprimir_referencia'); // imprimir referencia medica
        Route::get('informe/{id}','OutController@imprimir_informe')->name('checkout.imprimir_informe'); // imprimir informe medico

        Route::post('guardar/examens/{patient}','OutController@storeDiagnostic')->name('checkout.diagnostic.store');

        Route::get('programar/{id}','SurgerysController@create')->name('checkout.programar_cirugia');  // para enviar a la vista programar cirugia el mismo dia de la candidatura
        Route::get('programar_cirugia','SurgerysController@create_surgery')->name('checkout.programar-cirugia');  // para enviar a la vista programar cirugia el mismo dia de la candidatura
        Route::post('search/checkout/patients','SurgerysController@search_patients_out')->name('search.patients'); //busca los pacientes que agendan dias despues de ser candidato a cirugia
        Route::post('surgery/search/doctor','SurgerysController@search_doctor')->name('search.doctor'); // busca los doctores asociados a una cirugia
        Route::post('surgery/store','SurgerysController@store')->name('surgerys.store'); // agenda las cirugias
        Route::get('surgeries/list', 'OutController@surgeries_list')->name('checkout.lista_cirugias'); //Lista de cirugias
        Route::get('agendar/cirugia/ambulatoria','SurgerysController@create_surgery_ambulatoria')->name('checkout.agendar-ambulatoria');
        Route::post('buscar/medico','SurgerysController@buscar_doctor')->name('buscar.medico');


    });

    Route::group(['middleware' => ['role:doctor, director']], function () {
        Route::get('/doctor', 'DoctorController@index')->name('doctor.index');
        // Route::get('doctor', 'DoctorController@index')->name('doctor.index');
        // Route::get('doctor/store', 'DoctorController@store')->name('doctor.index');
        Route::get('doctor/diagnostico/{patient}','DoctorController@crearDiagnostico')->name('doctor.crearDiagnostico');
        Route::post('doctor/diagnostico/{patient}','DoctorController@storeDiagnostic')->name('diagnostic.store');
        Route::get('doctor/Referencia/{patient}','DoctorController@crearReferencia')->name('doctor.crearReferencia');
        Route::resource('doctor', 'DoctorController');
        Route::post('procedures_realizados', 'DoctorController@procedures_realizados')->name('doctor.procedures_realizados');  // guardar los procedimientos realizados en la consulta
        Route::post('examR', 'DoctorController@examR')->name('doctor.examR'); // guardar los examenes que se realizara el paciente
        Route::post('proceduresP', 'DoctorController@proceduresP')->name('doctor.proceduresP'); // guardar los posibles procedimientos
        Route::post('surgerysP', 'DoctorController@surgerysP')->name('doctor.surgerysP');   // guardar las posibles cirugias
        Route::post('doctor/Referencia','DoctorController@referenceStore')->name('reference.store');
        Route::get('doctor/edit/{id}','DoctorController@edit')->name('doctor.editar');
        Route::put('doctor/update/{id}','DoctorController@update')->name('doctor.update'); //actualizar historia
        Route::post('doctor/recipe/medicamentos','DoctorController@recipeStore')->name('recipe.store');
        Route::get('doctor/surgeries/list','DoctorController@surgeries_list')->name('doctor.lista_cirugias');

        //-----------actualizar registros-------------
        Route::post('doctor/examUpdate', 'DoctorController@exam_update')->name('doctor.exam_actualizar');  // guardar los procedimientos realizados en la consulta
        Route::post('doctor/proceduresRUpdate', 'DoctorController@proceduresR_update')->name('doctor.proceduresR_actualizar');  // guardar los procedimientos realizados en la consulta

        Route::post('doctor/proceduresUpdate', 'DoctorController@procedures_update')->name('doctor.procedures_actualizar');  // guardar los procedimientos realizados en la consulta
        Route::post('doctor/surgeryUpdate', 'DoctorController@surgerysP_update')->name('doctor.surgery_actualizar');  // guardar los procedimientos realizados en la consulta

        Route::post('doctor/referenceUpdate', 'DoctorController@reference_update')->name('doctor.reference_update');  // actualizar referecnia


        Route::post('doctor/cirugias', 'DoctorController@agregar_cirugias')->name('doctor.agregar_cirugias');  // eliminar examen
        //-------------------elimnar-------------------
        Route::post('doctor/eliminar/examen/actualizar', 'DoctorController@exam_eliminar')->name('doctor.exam_eliminar');  // eliminar examen
        Route::post('doctor/eliminar/procedimientos_realizados/actualizar', 'DoctorController@procedureR_eliminar')->name('doctor.procedureR_eliminar');  // eliminar examen
        // Route::post('doctor/eliminar/posible_cirugia/actualizar', 'DoctorController@cirugiaR_eliminar')->name('doctor.cirugiaP_eliminar');

        Route::post('doctor/eliminar/examen', 'DoctorController@exam_eliminar2')->name('doctor.exam_eliminar2');  // eliminar examen
        Route::post('doctor/eliminar/procedure', 'DoctorController@procedureR_eliminar2')->name('doctor.procedureR_eliminar2');  // eliminar examen
        Route::post('doctor/eliminar/posible_procedimiento', 'DoctorController@procedureP_eliminar2')->name('doctor.procedureP_eliminar2');  // eliminar examen
        Route::post('doctor/eliminar/cirugia', 'DoctorController@cirugiaP_eliminar2')->name('doctor.cirugiaP_eliminar2');  // eliminar examen

    
        
    });

    Route::group(['middleware' => ['role:director']], function(){

        //inicio de rutas para crear
        Route::get('empleados', 'DirectorController@index')->name('employe.index');
        Route::get('doctores/create', 'DirectorController@create')->name('doctores.create');
        Route::POST('/doctores', 'DirectorController@store')->name('doctores.store');
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
        Route::get('classification/surgery/create', 'TypeSurgerysController@create_classification')->name('classification.create');
        Route::POST('/classsification', 'TypeSurgerysController@store_classification')->name('classification.store');

        //inicio de rutas para editar
        Route::get('list','DirectorController@all_register')->name('all.register');
        Route::get('alergia/{id}', 'AllergyController@edit')->name('alergia.edit');
        Route::put('alergia/update/{id}', 'AllergyController@update')->name('alergia.update');
        Route::get('clase/{id}', 'TypeDoctorController@edit')->name('clase.edit');
        Route::put('clase/update/{id}', 'TypeDoctorController@update')->name('clase.update');
        Route::get('doctores/{id}', 'DirectorController@edit')->name('doctores.edit');
        Route::put('doctores/update/{id}', 'DirectorController@update')->name('doctores.update');
        Route::get('empleado/{id}', 'EmployesController@edit')->name('empleado.edit');
        Route::put('empleado/update/{id}', 'EmployesController@update')->name('empleado.update');
        Route::get('enfermedad/{id}', 'DiseasesController@edit')->name('enfermedad.edit');
        Route::put('enfermedad/update/{id}', 'DiseasesController@update')->name('enfermedad.update');
        Route::get('examen/{id}', 'ExamController@edit')->name('examen.edit');
        Route::put('examen/update/{id}', 'ExamController@update')->name('examen.update');
        Route::get('medicina/{id}', 'MedicinesController@edit')->name('medicina.edit');
        Route::put('medicina/update/{id}', 'MedicinesController@update')->name('medicina.update');
        Route::get('cargo/{id}', 'PositionsController@edit')->name('cargo.edit');
        Route::put('cargo/update/{id}', 'PositionsController@update')->name('cargo.update');
        Route::get('precio/{id}', 'DirectorController@edit_price')->name('precio.edit');
        Route::put('precio/update/{id}', 'DirectorController@update_price')->name('precio.update');
        Route::get('area/{id}', 'AreasController@edit')->name('area.edit');
        Route::put('area/update/{id}', 'AreasController@update')->name('area.update');
        Route::get('servicio/{id}', 'ServiceController@edit')->name('servicio.edit');
        Route::put('servicio/update/{id}', 'ServiceController@update')->name('servicio.update');
        Route::get('especialidad/{id}', 'SpecialityController@edit')->name('especialidad.edit');
        Route::put('especialidad/update/{id}', 'SpecialityController@update')->name('especialidad.update');
        Route::get('cirugia/{id}', 'TypeSurgerysController@edit')->name('cirugia.edit');
        Route::put('cirugia/update/{id}', 'TypeSurgerysController@update')->name('cirugia.update');
        Route::get('tipo/area/{id}', 'TypeAreasController@edit')->name('tipo-area.edit');
        Route::put('tipo/area/update/{id}', 'TypeAreasController@update')->name('tipo-area.update');
        Route::get('procedure/{id}', 'ProcedureController@edit')->name('procedure.edit');
        Route::put('procedure/update/{id}', 'ProcedureController@update')->name('procedure.update');
        Route::get('tipo/pago/{id}', 'TypePaymentsController@edit')->name('pago.edit');
        Route::put('pago/update/{id}', 'TypePaymentsController@update')->name('pago.update');
        Route::get('tipo/cirugia/{id}', 'TypeSurgerysController@edit_classification')->name('tipo-cirugia.edit');
        Route::put('clasificacion/cirugia/update/{id}', 'TypeSurgerysController@update_classification')->name('tipo-cirugia.update');

        //inicio de rutas para eliminar
        Route::delete('employe/{id}', 'EmployesController@destroy')->name('empleado.delete');
        Route::delete('position/{id}', 'PositionsController@destroy')->name('cargo.delete');
        Route::delete('service/{id}', 'ServiceController@destroy')->name('servicio.delete');
        Route::delete('especialidad/{id}', 'SpecialityController@destroy')->name('especialidad.delete');
        Route::delete('procedimiento/{id}', 'ProcedureController@destroy')->name('procedimiento.delete');
        Route::delete('cirugia/{id}', 'TypeSurgerysController@destroy')->name('cirugia.delete');
        Route::delete('alergia/{id}', 'AllergyController@destroy')->name('alergia.delete');
        Route::delete('enfermedad/{id}', 'DiseasesController@destroy')->name('enfermedad.delete');
        Route::delete('medicina/{id}', 'MedicinesController@destroy')->name('medicina.delete');
        Route::delete('examen/{id}', 'ExamController@destroy')->name('examen.delete');
        Route::delete('tipo/{id}', 'TypeAreasController@destroy')->name('tipo.delete');
        Route::delete('area/{id}', 'AreasController@destroy')->name('area.delete');
        Route::delete('clase/{id}', 'TypeDoctorController@destroy')->name('clase.delete');
        Route::delete('consulta/{id}', 'DirectorController@destroy_consulta')->name('consulta.delete');
        Route::delete('pago/{id}', 'TypePaymentsController@destroy')->name('pago.delete');
        Route::delete('clasificacion/{id}', 'TypeSurgerysController@destroy_cirugia')->name('clasificacion.delete');

    });
});
