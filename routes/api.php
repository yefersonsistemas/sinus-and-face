<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*

 Route::group(['middleware' => 'auth:api'], function(){
    Route::post('details', 'API\UserController@details');
    });
*/

// Register, Login
Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'Auth\API\AuthController@login');
    Route::post('register', 'Auth\API\AuthController@register');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('logout', 'Auth\API\AuthController@logout');
        Route::get('user', 'API\UserController@show');
        Route::delete('user/{user}/destroy', 'API\UserController@destroy');
        Route::get('user/notifications', 'API\UserController@notifications');
    });
});


        Route::group(['prefix' => 'patients'], function(){
            Route::get('/', 'API\PatientController@index');
            Route::get('/list','API\PatientController@list');
        });

        Route::group(['prefix' => 'doctors'], function(){
            Route::get('/', 'API\DoctorController@index');
            Route::get('/list','API\DoctorController@list');
        });

        Route::group(['prefix' => 'payments'], function(){
            Route::get('/type', 'API\PaymentController@index');
        });

        Route::group(['prefix' => 'areas'], function(){
            Route::get('/type', 'API\AreasController@type');
        });

        Route::group(['prefix' => 'supplies'], function(){
            Route::get('/type', 'API\SupplieController@type');
        });
        
        //rutas rol seguridad
        Route::group(['prefix' => 'security'], function(){
            Route::get('/', 'API\SecurityController@index');  // se ve
            Route::POST('create', 'API\SecurityController@all_visitor');  // listo
            Route::POST('create/visitor', 'API\SecurityController@create_visitor');  // listo
            Route::POST('inside', 'API\SecurityController@statusIN');  // listo
            Route::POST('outside', 'API\SecurityController@statusOut');  // listo
            Route::POST('search', 'API\SecurityController@search');  // listo
        });

        //rutas rol recepcion
        Route::group(['prefix' => 'reception'], function(){
            Route::get('/', 'API\ReceptionController@index');  // listo
            Route::POST('create', 'API\ReceptionController@create_history');  //lissto
            Route::POST('search', 'API\ReceptionController@search');  // listo
        });

        //rutas generar cita/reservacion
        Route::group(['prefix' => 'cite'], function(){
            Route::POST('create', 'API\CitaController@create_cite'); //listo
            Route::put('/{id}', 'API\CitaController@update_cite'); // listo
            Route::delete('delete/{id}', 'API\CitaController@delete_cite');  //listo
        });

        //rutas rol in y out
        Route::group(['prefix' => 'IO'], function(){
            Route::POST('search', 'API\InController@search');  // listo
            Route::POST('assigment', 'API\InController@assigment');  // listo
            //Route::POST('area', 'API\InController@status');  // listo
            Route::get('list', 'API\InController@list_area');  // listo
            Route::POST('create', 'API\InController@billing');  // listo 
        });

        //rutas rol logistica
        Route::group(['prefix' => 'supplie'], function(){
            Route::get('type_supplie', 'API\LogisticController@type_supplie');
            Route::POST('create', 'API\LogisticController@create_supplie');  // listo
            Route::put('/{id}', 'API\LogisticController@edit_supplie');  // listo
            Route::delete('delete/{id}', 'API\LogisticController@delete_supplie');  // listo 
        });

        Route::group(['prefix' => 'equipment'], function(){
            Route::get('type', 'API\LogisticController@type_equipment');
            Route::POST('create', 'API\LogisticController@create_equipment');  // listo
            Route::put('/{id}', 'API\LogisticController@edit_equipment');  // listo
            Route::delete('delete/{id}', 'API\LogisticController@delete_equipment');  //listo
        });

        Route::group(['prefix' => 'inventory'], function(){
            Route::get('list', 'API\LogisticController@index');  // esta muestra insumos y equipos
            Route::get('/', 'API\LogisticController@list_inventory');  // muestra todo el inventario
            Route::get('area', 'API\LogisticController@list_inventoryarea');  // inventario por area y su img
            Route::get('supplie', 'API\LogisticController@list_supplie');  // muestra inventario solo de insumos
            Route::get('equipment', 'API\LogisticController@list_equipment');  // muestra inventario solo de equipos
            Route::POST('assigment', 'API\LogisticController@assigment'); //
            Route::POST('cleaning', 'API\LogisticController@registercleanig');
            Route::get('record/cleaning', 'API\LogisticController@record_cleaning');
        });

        //rutas rol doctor
        Route::group(['prefix' => 'doctor'], function(){
            Route::get('/', 'API\DoctorController@index');  //se ve
            Route::get('history', 'API\DoctorController@history_patient');  //se ve
            Route::POST('create','API\DoctorController@diagnostic');  // listo
            Route::get('recipe', 'API\DoctorController@recipe');  // se ve
            Route::get('pay', 'API\DoctorController@calculo_week');  // 
        });

        Route::group(['prefix' => 'stocktaking'], function()
        {
            //Insumos
            Route::get('/', 'API\StocktakingController@index');
            Route::post('/create_supplie', 'API\StocktakingController@create_supplie');
            Route::PUT('/edit_supplie', 'API\StocktakingController@edit_supplie');

            //Equipo
            Route::post('/create_equipment', 'API\StocktakingController@create_equipment');
            Route::put('/edit_equipment', 'API\StocktakingController@edit_equipment');
        });

        Route::group(['prefix' => 'create'], function(){
            Route::POST('procedure', 'API\ProcedureController@store');
            Route::POST('exam', 'API\ExamController@store');
            Route::POST('employe', 'API\EmployesController@store');
            Route::get('list', 'API\EmployesController@index');
            Route::get('patients', 'API\DoctorController@patients');
            Route::get('positions', 'API\EmployesController@positions');
            Route::get('speciality', 'API\CitaController@speciality');
            Route::POST('create/speciality', 'API\SpecialityController@store');

        });
//});


            