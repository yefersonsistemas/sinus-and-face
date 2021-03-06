@extends('dashboard.layouts.app')

@php
    use Carbon\Carbon;
@endphp

@section('css')
    <link rel="stylesheet" href="{{ asset('assets\plugins\datatable\dataTables.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets\plugins\datatable\fixedeader\dataTables.fixedcolumns.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets\plugins\datatable\fixedeader\dataTables.fixedheader.bootstrap4.min.css') }}">
@endsection

@section('title','Todas los registros')

@section('content')

<style>
    .dataTables_filter label{
        color: #434a54;
    }
    .dataTables_filter label input:focus{
        border: 2px solid #00506b;
    }
    .btn_azul{
        color:#00506b
    }
</style>

@can('ver lista de registros')
<div class="section-body  py-4">
    <div class="container-fluid">
        <div class="row clearfix">

            {{-- Tabs de registros --}}
            <div class="col-md-2 mt-3">
                <ul class="nav row nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item col-md-12">
                        <a class="nav-link btn-block  mb-2 p-2 d-flex flex-row justify-content-center btn btn btn-azuloscuro " id="pills-position-tab" data-toggle="pill" href="#pills-position" role="tab" aria-controls="pills-position" aria-selected="true">Cargos</a>
                    </li>
                    <li class="nav-item col-md-12">
                        <a class="nav-link btn-block mb-2 p-2 d-flex flex-row justify-content-center  btn btn btn-azuloscuro" id="pills-service-tab" data-toggle="pill" href="#pills-service" role="tab" aria-controls="pills-service" aria-selected="false">Servicios</a>
                    </li>
                    <li class="nav-item col-md-12">
                        <a class="nav-link btn-block mb-2  p-2 d-flex flex-row justify-content-center  btn btn btn-azuloscuro" id="pills-speciality-tab" data-toggle="pill" href="#pills-speciality" role="tab" aria-controls="pills-speciality" aria-selected="false">Especialidades</a>
                    </li>
                    <li class="nav-item col-md-12">
                        <a class="nav-link btn-block mb-2  p-2 d-flex flex-row justify-content-center btn btn btn-azuloscuro" id="pills-procedure-tab" data-toggle="pill" href="#pills-procedure" role="tab" aria-controls="pills-procedure" aria-selected="false">Procedimientos</a>
                    </li>
                    <li class="nav-item col-md-12">
                        <a class="nav-link btn-block mb-2  p-2 d-flex flex-row justify-content-center btn btn btn-azuloscuro" id="pills-surgery-tab" data-toggle="pill" href="#pills-surgery" role="tab" aria-controls="pills-surgery" aria-selected="false">Cirug??as</a>
                    </li>
                    <li class="nav-item col-md-12">
                        <a class="nav-link btn-block mb-2  p-2 d-flex flex-row justify-content-center btn btn btn-azuloscuro" id="pills-allergy-tab" data-toggle="pill" href="#pills-allergy" role="tab" aria-controls="pills-allergy" aria-selected="false">Alergias</a>
                    </li>
                    <li class="nav-item col-md-12">
                        <a class="nav-link btn-block mb-2  p-2 d-flex flex-row justify-content-center btn btn btn-azuloscuro" id="pills-disease-tab" data-toggle="pill" href="#pills-disease" role="tab" aria-controls="pills-disease" aria-selected="false">Enfermedades</a>
                    </li>
                    <li class="nav-item col-md-12">
                        <a class="nav-link btn-block mb-2 p-2 d-flex flex-row justify-content-center btn btn btn-azuloscuro" id="pills-medicine-tab" data-toggle="pill" href="#pills-medicine" role="tab" aria-controls="pills-medicine" aria-selected="false">Medicinas</a>
                    </li>
                    <li class="nav-item col-md-12">
                        <a class="nav-link btn-block mb-2 p-2 d-flex flex-row justify-content-center btn btn btn-azuloscuro" id="pills-exam-tab" data-toggle="pill" href="#pills-exam" role="tab" aria-controls="pills-exam" aria-selected="false">Ex??menes</a>
                    </li>
                    <li class="nav-item col-md-12">
                        <a class="nav-link btn-block mb-2 p-2 d-flex flex-row justify-content-center btn btn btn-azuloscuro" id="pills-type-tab" data-toggle="pill" href="#pills-type" role="tab" aria-controls="pills-type" aria-selected="false">Tipo de area</a>
                    </li>
                    <li class="nav-item col-md-12">
                        <a class="nav-link btn-block mb-2  p-2 d-flex flex-row justify-content-center btn btn btn-azuloscuro" id="pills-area-tab" data-toggle="pill" href="#pills-area" role="tab" aria-controls="pills-area" aria-selected="false">Area</a>
                    </li>
                    <li class="nav-item col-md-12">
                        <a class="nav-link btn-block mb-2  p-2 d-flex flex-row justify-content-center btn btn btn-azuloscuro" id="pills-claseDoctor-tab" data-toggle="pill" href="#pills-claseDoctor" role="tab" aria-controls="pills-claseDoctor" aria-selected="false">Clase del doctor</a>
                    </li>
                    <li class="nav-item col-md-12">
                        <a class="nav-link btn-block mb-2  p-2 d-flex flex-row justify-content-center btn btn btn-azuloscuro" id="pills-doctor-tab" data-toggle="pill" href="#pills-doctor" role="tab" aria-controls="pills-doctor" aria-selected="false">Precio de Consulta</a>
                    </li>
                    <li class="nav-item col-md-12">
                        <a class="nav-link btn-block mb-2 p-2 d-flex flex-row justify-content-center btn btn btn-azuloscuro" id="pills-payment-tab" data-toggle="pill" href="#pills-payment" role="tab" aria-controls="pills-payment" aria-selected="false">Tipos de pagos</a>
                    </li>
                    <li class="nav-item col-md-12">
                        <a class="nav-link btn-block mb-2  p-2 d-flex flex-row justify-content-center btn btn btn-azuloscuro" id="pills-type-surgery-tab" data-toggle="pill" href="#pills-type-surgery" role="tab" aria-controls="pills-type-surgery" aria-selected="false">Tipo de Cirug??as</a>
                    </li>
                </ul>
            </div>
            <div class="tab-content col-10" id="pills-tabContent">


                <div class="tab-pane fade show active" id="pills-position" role="tabpanel" aria-labelledby="pills-position-tab">
                    <div class="col-lg-12  ">
                         <div class="table-responsive mb-4">
                            <table class="table table-striped  table-bordered js-basic-example dataTable table_custom spacing5">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th style="width: 400px">descripcion</th>
                                        <th class="align-center">Acci??n</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>descripcion</th>
                                        <th class="align-center">Acci??n</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    @foreach ($positions as $position)
                                        <tr>
                                            <td>{{ $position->name }}</td>
                                            <td>{{ $position->description }}</td>
                                            <td class="d-flex justify-content-center" style="display: inline-block ">
                                                @can('eliminar cargo')
                                                <form action="{{ route('cargo.delete', $position) }}" method="POST">
                                                    <button title="Eliminar" class=" btn btn-danger" ><i class="fa fa-eraser"></i></i></button>
                                                    @method('delete')
                                                    @csrf
                                                @can('modificar cargo')
                                                <a href="{{ route('cargo.edit', $position->id) }}" class="btn btn-azuloscuro"><i class="fa fa-edit"></i></a>
                                               @endcan
                                           
                                                </form> 
                                                @endcan
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>


                <div class="tab-pane fade" id="pills-service" role="tabpanel" aria-labelledby="pills-service-tab">
                    <div class="col-lg-12  ">
                        <div class="table-responsive mb-4">
                            <table class="table table-striped  table-bordered js-basic-example dataTable table_custom spacing5">
                                <thead>
                                    <tr>
                                        <th style="width: 150px">Nombre</th>
                                        <th style="width: 250px">Descripcion</th>
                                        <th class="align-center">Acci??n</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Descripcion</th>
                                        <th class="align-center">Acci??n</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    @foreach ($services as $service)
                                        <tr>
                                            <td>{{ $service->name }}</td>
                                            <td >{{ $service->description }}</td>
                                            <td class="d-flex justify-content-center"   style="display: inline-block">
                                                @can('eliminar servicios')
                                                <form action="{{ route('servicio.delete', $service) }}" method="POST">
                                                    <button title="Eliminar" class=" btn btn-danger" ><i class="fa fa-eraser"></i></i></button>
                                                    @method('delete')
                                                    @csrf
                                                    @can('modificar servicios')
                                                    <a href="{{ route('servicio.edit', $service->id) }}" class="btn btn-azuloscuro"><i class="fa fa-edit"></i></a>
                                                    @endcan
                                                </form>
                                                @endcan
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="pills-speciality" role="tabpanel" aria-labelledby="pills-speciality-tab">
                    <div class="col-lg-12">
                        <div class="table-responsive mb-4">
                            <table class="table table-striped  table-bordered js-basic-example dataTable table_custom spacing5">
                                <thead>
                                    <tr  >
                                        <th style="width: 150px">Nombre</th>
                                        <th>Descripci??n</th>
                                        <th>Servicio</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr  >
                                        <th>Nombre</th>
                                        <th>Descripci??n</th>
                                        <th>Servicio</th>
                                        <th>Acciones</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    @foreach ($specialitys as $speciality)
                                        <tr>
                                            <td >{{ $speciality->name }}</td>
                                            <td>{{ $speciality->description }}</td>
                                            <td >{{ $speciality->service->name }}</td>
                                            <td style="display: inline-block">

                                                @can('eliminar especialidad')
                                                <form action="{{ route('especialidad.delete', $speciality) }}" method="POST">
                                                    <button title="Eliminar" class=" btn btn-danger" ><i class="fa fa-eraser"></i></i></button>
                                                    @method('delete')
                                                    @csrf
                                                    @can('modificar especialidad')
                                                    <a href="{{ route('especialidad.edit', $speciality->id) }}" class="btn btn-azuloscuro"><i class="fa fa-edit"></i></a>
                                                    @endcan
                                                </form>
                                                @endcan
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="pills-procedure" role="tabpanel" aria-labelledby="pills-procedure-tab">
                    <div class="col-lg-12">
                        <div class="table-responsive mb-4">
                            <table class="table table-striped  table-bordered js-basic-example dataTable table_custom spacing5">
                                <thead>
                                    <tr>
                                        <th style="width: 150px">Nombre</th>
                                        <th>Descripci??n</th>
                                        <th>Precio</th>
                                        <th>Especialidades</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr  >
                                        <th>Nombre</th>
                                        <th>Descripci??n</th>
                                        <th>Precio</th>
                                        <th>Especialidades</th>
                                        <th>Acciones</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    @foreach ($procedures as $procedure)
                                    <tr>
                                            <td>{{ $procedure->name }}</td>
                                            <td>{{ $procedure->description }}</td>
                                            <td>{{ $procedure->price }}</td>
                                            @foreach ($procedure->speciality as $item)
                                            <td>{{ $item->name }}</td>
                                            @endforeach
                                        @if(empty($procedure->speciality))
                                        <td>{{ $item->name }}</td>
                                        @endif
                                        <td style="display: inline-block">
                                        @can('eliminar procedimiento')
                                            <form action="{{ route('procedimiento.delete', $procedure) }}" method="POST">
                                                <button title="Eliminar" class=" btn btn-danger" ><i class="fa fa-eraser"></i></i></button>
                                                @method('delete')
                                                @csrf
                                               @can('modificar procedimiento')
                                            <a href="{{ route('procedure.edit', $procedure->id) }}" class="btn btn-azuloscuro"><i class="fa fa-edit"></i></a>
                                            @endcan
                                            </form>
                                       @endcan
                                        </td>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="pills-surgery" role="tabpanel" aria-labelledby="pills-surgery-tab">
                    <div class="col-lg-12  ">
                        <div class="table-responsive mb-4">
                            <table class="table table-striped  table-bordered js-basic-example dataTable table_custom spacing5">
                                <thead>
                                    <tr>
                                        <th style="width: 100px">Nombre</th>
                                        <th  >Duraci??n</th>
                                        <th>Precio</th>
                                        <th style="width: 200px">Descripci??n</th>
                                        <th>Clase de cirug??a</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr >
                                        <th>Nombre</th>
                                        <th>Duraci??n</th>
                                        <th>Precio</th>
                                        <th>Descripci??n</th>
                                        <th>Clase de cirug??a</th>
                                        <th>Acciones</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    @foreach ($surgerys as $surgery)
                                        <tr>
                                            <td>{{ $surgery->name }}</td>
                                            <td>{{ $surgery->duration }}</td>
                                            <td>{{ $surgery->cost }}</td>
                                            <td>{{ $surgery->description }}</td>
                                            <td>{{ $surgery->classification->name }}</td>
                                            <td style="display: inline-block">
                                                @can('eliminar cirugias')
                                                <form action="{{ route('cirugia.delete', $surgery) }}" method="POST">
                                                    <button title="Eliminar" class=" btn btn-danger" ><i class="fa fa-eraser"></i></i></button>
                                                    @method('delete')
                                                    @csrf
                                                @can('modificar cirugias')
                                                <a href="{{ route('cirugia.edit', $surgery->id) }}" class="btn btn-azuloscuro"><i class="fa fa-edit"></i></a>
                                               @endcan

                                                </form>
                                                @endcan
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="pills-allergy" role="tabpanel" aria-labelledby="pills-allergy-tab">
                    <div class="col-lg-10  ">
                        <div class="ml-5">
                        <div class="table-responsive mb-4">
                            <table class="table table-striped  table-bordered js-basic-example dataTable table_custom spacing5">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th class="align-center">Acci??nes</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Nombre</th>
                                        <th class="align-center">Acci??nes</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    @foreach ($allergys as $allergy)
                                        <tr>
                                            <td>{{ $allergy->name }}</td>
                                            <td class="d-flex justify-content-center" style="display: inline-block">

                                                @can('eliminar alergias')
                                                <form action="{{ route('alergia.delete', $allergy) }}" method="POST">
                                                    <button title="Eliminar" class=" btn btn-danger" ><i class="fa fa-eraser"></i></i></button>
                                                    @method('delete')
                                                    @csrf
                                                    @can('modificar alergias')
                                                    <a href="{{ route('alergia.edit', $allergy->id) }}" class="btn btn-azuloscuro"><i class="fa fa-edit"></i></a>
                                                    @endcan
                                                </form>
                                                @endcan
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                      </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="pills-disease" role="tabpanel" aria-labelledby="pills-disease-tab">
                    <div class="col-lg-10  ">
                        <div class="ml-5">
                        <div class="table-responsive mb-4">
                            <table class="table table-striped  table-bordered js-basic-example dataTable table_custom spacing5">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Acci??nes</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Acci??nes</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    @foreach ($diseases as $disease)
                                        <tr>
                                            <td>{{ $disease->name }}</td>
                                            <td style="display: inline-block">

                                                @can('eliminar enfermedades')
                                                <form action="{{ route('enfermedad.delete', $disease) }}" method="POST">
                                                    <button title="Eliminar" class=" btn btn-danger" ><i class="fa fa-eraser"></i></i></button>
                                                    @method('delete')
                                                    @csrf
                                                    @can('modificar enfermedades')
                                                <a href="{{ route('enfermedad.edit', $disease->id) }}" class="btn btn-azuloscuro"><i class="fa fa-edit"></i></a>
                                                @endcan
                                                </form>
                                                @endcan
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                      </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="pills-medicine" role="tabpanel" aria-labelledby="pills-medicine-tab">
                    <div class="col-lg-10 ">
                        <div class="ml-5">
                        <div class="table-responsive mb-4">
                            <table class="table table-striped  table-bordered js-basic-example dataTable table_custom spacing5">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th class="align-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Nombre</th>
                                        <th class="align-center">Acci??nes</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    @foreach ($medicines as $medicine)
                                        <tr>
                                            <td>{{ $medicine->name }}</td>
                                            <td  class="d-flex justify-content-center" style="display: inline-block">

                                                @can('eliminar medicina')
                                                <form action="{{ route('medicina.delete', $medicine) }}" method="POST">
                                                    <button title="Eliminar" class=" btn btn-danger" ><i class="fa fa-eraser"></i></i></button>
                                                    @method('delete')
                                                    @csrf
                                                    @can('modificar medicina')
                                                    <a href="{{ route('medicina.edit', $medicine->id) }}" class="btn btn-azuloscuro"><i class="fa fa-edit"></i></a>
                                                    @endcan
                                                </form>
                                                @endcan
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                      </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="pills-exam" role="tabpanel" aria-labelledby="pills-exam-tab">
                    <div class="col-lg-10 ">
                        <div class="ml-5">
                        <div class="table-responsive mb-4">
                            <table class="table table-striped  table-bordered js-basic-example dataTable table_custom spacing5">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th class="align-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Nombre</th>
                                        <th class="align-center">Acci??nes</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    @foreach ($exams as $exam)
                                        <tr>
                                            <td>{{ $exam->name }}</td>
                                            <td   class="d-flex justify-content-center" style="display: inline-block">

                                                @can('eliminar examenes')
                                                <form action="{{ route('examen.delete', $exam) }}" method="POST">
                                                    <button title="Eliminar" class=" btn btn-danger" ><i class="fa fa-eraser"></i></i></button>
                                                    @method('delete')
                                                    @csrf
                                                    @can('modificar examenes')
                                                    <a href="{{ route('examen.edit', $exam->id) }}" class="btn btn-azuloscuro"><i class="fa fa-edit"></i></a>
                                                    @endcan
                                                </form>
                                                @endcan
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                     </div>
                  </div>
                </div>

                <div class="tab-pane fade" id="pills-type" role="tabpanel" aria-labelledby="pills-type-tab">
                    <div class="col-lg-12 ">
                        <div class="table-responsive mb-4">
                            <table class="table table-striped  table-bordered js-basic-example dataTable table_custom spacing5">
                                <thead>
                                    <tr>
                                        <th style="width: 200px">Nombre</th>
                                        <th>Descripci??n</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Descripci??n</th>
                                        <th>Acciones</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    @foreach ($types as $type)
                                        <tr>
                                            <td>{{ $type->name }}</td>
                                            <td>{{ $type->description }}</td>
                                            <td style="display: inline-block">

                                                @can('eliminar tipo de area')
                                                <form action="{{ route('tipo.delete', $type) }}" method="POST">
                                                    <button title="Eliminar" class=" btn btn-danger" ><i class="fa fa-eraser"></i></i></button>
                                                    @method('delete')
                                                    @csrf
                                                    @can('modificar tipo de area')
                                                <a href="{{ route('tipo-area.edit', $type->id) }}" class="btn btn-azuloscuro"><i class="fa fa-edit"></i></a>
                                                @endcan
                                                </form>
                                                @endcan
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="pills-area" role="tabpanel" aria-labelledby="pills-area-tab">
                    <div class="col-lg-12">
                        <div class="table-responsive mb-4">
                            <table class="table table-striped  table-bordered js-basic-example dataTable table_custom spacing5">
                                <thead>
                                    <tr>
                                        <th>Foto</th>
                                        <th>Nombre</th>
                                        <th>status</th>
                                        <th>Tipo de area</th>
                                        <th class="align-center" >Acci??n</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Foto</th>
                                        <th>Nombre</th>
                                        <th>status</th>
                                        <th>Tipo de area</th>
                                        <th class="align-center" >Acci??n</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    @foreach ($areas as $area)
                                        <tr>
                                            <td>
                                                @if (!empty($area->image->path))
                                                    <img class="rounded circle" width="150px" height="auto" src="{{ Storage::url($area->image->path) }}" alt="">
                                                @else
                                                    <img src="" alt="" >
                                                @endif
                                            </td>
                                            <td>{{ $area->name }}</td>
                                            <td>{{ $area->status }}</td>
                                            <td>{{ $area->typearea->name }}</td>
                                            <td   class="d-flex justify-content-center" style="display: inline-block">

                                                @can('eliminar area')
                                                <form action="{{ route('area.delete', $area) }}" method="POST">
                                                    <button title="Eliminar" class=" btn btn-danger" ><i class="fa fa-eraser"></i></i></button>
                                                    @method('delete')
                                                    @csrf
                                                    @can('modificar area')
                                                    <a href="{{ route('area.edit', $area->id) }}" title="Editar" class="btn btn-azuloscuro"><i class="fa fa-edit"></i></a>
                                                    @endcan
                                                </form>
                                                @endcan
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="pills-claseDoctor" role="tabpanel" aria-labelledby="pills-claseDoctor-tab">
                    <div class="col-lg-12 ">
                        <div class="table-responsive mb-4">
                            <table class="table table-striped  table-bordered js-basic-example dataTable table_custom spacing5">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th class="align-center">Comisi??n</th>
                                        <th class="align-center">Acci??n</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Nombre</th>
                                        <th class="align-center">Comisi??n</th>
                                        <th class="align-center">Acci??n</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    @foreach ($clases as $clase)
                                        <tr>
                                            <td>{{ $clase->name }}</td>
                                            <td class=" align-center">{{ $clase->comission }}</td>
                                            <td  class="d-flex justify-content-center" style="display: inline-block">

                                                @can('eliminar clase de doctor')
                                                <form action="{{ route('clase.delete', $clase) }}" method="POST">
                                                    <button title="Eliminar" class=" btn btn-danger" ><i class="fa fa-eraser"></i></i></button>
                                                    @method('delete')
                                                    @csrf
                                                    @can('modificar clase de doctor')
                                                    <a href="{{route('clase.edit', $clase->id)}}" class="btn btn-azuloscuro"><i class="fa fa-edit"></i></a>
                                                    @endcan
                                                </form>
                                                @endcan
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="pills-doctor" role="tabpanel" aria-labelledby="pills-doctor-tab">
                    <div class="col-lg-12">
                        <div class="table-responsive mb-4">
                            <table class="table table-striped  table-bordered js-basic-example dataTable table_custom spacing5">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Clase</th>
                                        <th>Precio</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Clase</th>
                                        <th>Precio</th>
                                        <th>Acciones</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    @foreach ($doctors as $doctor)
                                        <tr>
                                            <td>{{ $doctor->employe->person->name }}</td>
                                            <td>{{ $doctor->typedoctor->name }}</td>
                                            <td>{{ $doctor->price }}</td>
                                            <td style="display: inline-block">

                                                @can('eliminar precio de consulta')
                                                <form action="{{ route('consulta.delete', $doctor) }}" method="POST">
                                                    <button title="Eliminar" class=" btn btn-danger" ><i class="fa fa-eraser"></i></i></button>
                                                    @method('delete')
                                                    @csrf
                                                    @can('modificar precio de consulta')
                                                    <a href="{{ route('precio.edit', $doctor->id) }}" class="btn btn-azuloscuro"><i class="fa fa-edit"></i></a>
                                                    @endcan
                                                </form>
                                                @endcan
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>



                {{-- corre lo sedder --}}

                <div class="tab-pane fade" id="pills-payment" role="tabpanel" aria-labelledby="pills-payment-tab">
                    <div class="col-lg-10  ">
                        <div class="ml-5">
                        <div class="table-responsive mb-4">
                            <table class="table table-striped  table-bordered js-basic-example dataTable table_custom spacing5">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th class="align-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Nombre</th>
                                        <th class="align-center">Acciones</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    @foreach ($payments as $payment)
                                        <tr>
                                            <td>{{ $payment->name }}</td>
                                            <td class="d-flex justify-content-center" style="display: inline-block">

                                                @can('eliminar tipo de pago')
                                                <form action="{{ route('pago.delete', $payment) }}" method="POST">
                                                    <button title="Eliminar" class=" btn btn-danger" ><i class="fa fa-eraser"></i></i></button>
                                                    @method('delete')
                                                    @csrf
                                                    @can('modificar tipo de pago')
                                                    <a href="{{ route('pago.edit', $payment->id) }}" class="btn btn-azuloscuro"><i class="fa fa-edit"></i></a>
                                                    @endcan
                                                </form>
                                                @endcan
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
             </div>

                <div class="tab-pane fade" id="pills-type-surgery" role="tabpanel" aria-labelledby="pills-type-surgery-tab">
                    <div class="col-lg-10 " >
                        <div class="ml-5">
                            <table class="table table-striped  table-bordered js-basic-example dataTable table_custom spacing5">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Descripci??n</th>
                                        <th>Acci??n</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Descripci??n</th>
                                        <th>Acci??n</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    @foreach ($classifications as $classification)
                                        <tr>
                                            <td>{{ $classification->name }}</td>
                                            <td>{{ $classification->description }}</td>
                                            <td style="display: inline-block">

                                                @can('eliminar tipo de cirugias')
                                                <form action="{{ route('clasificacion.delete', $classification) }}" method="POST">
                                                    <button title="Eliminar" class=" btn btn-danger" ><i class="fa fa-eraser"></i></i></button>
                                                    @method('delete')
                                                    @csrf
                                                    @can('modificar tipo de cirugias')
                                                    <a href="{{ route('tipo-cirugia.edit', $classification->id) }}" title="Editar" class="btn btn-azuloscuro"><i class="fa fa-edit"></i></a>
                                                    @endcan
                                                </form>
                                                @endcan
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
@endcan

@endsection

@section('scripts')
<script src="{{ asset('assets\bundles\dataTables.bundle.js') }}"></script>
<script src="{{ asset('assets\js\table\datatable.js') }}"></script>

@endsection
