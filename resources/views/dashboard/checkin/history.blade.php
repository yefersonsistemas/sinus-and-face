@extends('dashboard.layouts.app')

@section('cites','active')
@section('all','active')

@section('css')
    <link rel="stylesheet" href="{{ asset('assets\css\style.css') }}">
    <link rel="stylesheet" href="{{ asset('assets\plugins\multi-select\css\multi-select.css') }}">
@endsection

@section('title','Historia Medica')

@section('content')
<div class="container">
    <div class="card p-4 row d-row d-flex justify-content-between">
            <label class="form-label">Datos Personales</label>
        {{-- <h4 class="col-12">Datos Personales</h4> --}}
        <div class="col-md-6 col-lg-6 sm-6">
            
            <p>DNI: {{ $rs->patient->type_dni }} {{ $rs->patient->dni }}</p>
            <p>Nombre: {{ $rs->patient->name }}</p>
            <p>Apellido: {{ $rs->patient->lastname }}</p>
        </div>
        <div class="col-md-3 col-lg-3 sm-3">
            <img src="{{ Storage::url($rs->patient->image->path) }}" alt="">
        </div>
    </div>

    <div class="card p-4">
            <label class="form-label">Datos De la Cita</label>
        {{-- <h4>Datos De la Cita</h4> --}}
        <p>Fecha: {{ $rs->date }}</p>
        <p>Medico Tratante: {{ $rs->patient->history_patient }}</p>
        <p>Razón: {{ $rs->description }}</p>
    </div>
    
    <form action="" class="card p-4">
        <label class="form-label">Información Personal del Paciente</label>
        <div class="col-lg-8">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-5">
                        <div class="form-group">
                            <label class="form-label">Lugar de Nacimiento</label>
                            <input type="text" class="form-control" disabled="" placeholder="Lugar de Nacimiento" value="{{ $rs->historyPatient->place }}">
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-3">
                        <div class="form-group">
                            <label class="form-label">Fecha de Nacimiento</label>
                            <input type="text" class="form-control" placeholder="Fecha de Nacimiento" value="{{ $rs->historyPatient->birthdate }}">
                        </div>
                    </div>
                    
                    <div class="col-sm-6 col-md-6">
                        <div class="form-group">
                            <label class="form-label">Peso</label>
                            <input type="text" class="form-control" placeholder="Peso" value="{{ $rs->historyPatient->weight }}">
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-6">
                        <div class="form-group">
                            <label class="form-label">Edad</label>
                            <input type="text" class="form-control" placeholder="Edad" value="{{ $rs->historyPatient->age }}">
                        </div>
                    </div>
                    <div class="form-group mt-3 ml-2">
                        <label>Radio Button</label>
                        <br>
                        <label class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" name="gender" value="Masculino" {{ ($rs->historyPatient->gender == 'Masculino') ? 'checked' : '' }} required>
                            <span class="custom-control-label">M</span>
                        </label>

                        <label class="custom-control custom-radio custom-control-inline">
                            <input type="radio" class="custom-control-input" name="gender" value="Femenino" {{ ($rs->historyPatient->gender == 'Femenino') ? 'checked' : '' }} required>
                            <span class="custom-control-label">F</span>
                        </label>
                        <p id="error-radio"></p>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="form-label">Direccion</label>
                            <input type="text" name="address" class="form-control" placeholder="Direccion" value="{{ $rs->patient->address }}">
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-4">
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email"  name="email" class="form-control" placeholder="Email" value="{{ $rs->patient->email }}">
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-4">
                        <div class="form-group">
                            <label class="form-label">Teléfono</label>
                            <input type="text"  name="phone" class="form-control" placeholder="Teléfono" value="{{ $rs->patient->phone }}">
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-4">
                        <div class="form-group">
                            <label class="form-label">Teléfono adicional</label>
                            <input type="text"  name="another_phone" class="form-control" placeholder="Teléfono adicional" value="{{ $rs->historyPatient->another_phone }}">
                        </div>
                    </div>

                    <div class="col-sm-6 col-md-4">
                        <div class="form-group">
                            <label class="form-label">Email adicional</label>
                            <input type="email"  name="another_email" class="form-control" placeholder="Email" value="{{ $rs->historyPatient->another_email }}">
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="form-group">
                            <label class="form-label">Profesión</label>
                            <input type="text"  name="profession" class="form-control" placeholder="Profesión" value="{{ $rs->historyPatient->profession }}">
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="form-group">
                            <label class="form-label">Ocupación</label>
                            <input type="text"  name="occupation" class="form-control" placeholder="Ocupación" value="{{ $rs->historyPatient->occupation }}">
                        </div>
                    </div>
                </div>
            </div>
        </div>

<<<<<<< HEAD
        <div class="card p-4">
            <label class="form-label">Exámenes</label>
            <div class="form-control">
                <form id="fileupload" action="" method="POST" enctype="multipart/form-data">
                    <div class="row fileupload-buttonbar mt-4 ml-2">
                        <div>
                            <span class="btn btn-success fileinput-button">
                            <input type="file" name="files[]" multiple="">
                        </div>

                        <div class="ml-2">
                            <button type="submit" class="btn btn-primary start">
                                <i class="glyphicon glyphicon-upload"></i>
                                <span>Subir</span>
                            </button>
                        </div>

                        <div class="ml-2">
                            <button type="reset" class="btn btn-warning cancel">
                                <i class="glyphicon glyphicon-ban-circle"></i>
                                <span>Cancelar</span>
                            </button>
                        </div>

                        <div class="ml-2">
                            <button type="button" class="btn btn-danger delete">
                                <i class="glyphicon glyphicon-trash"></i>
                                <span>Eliminar</span>
                            </button>
                        </div>
                    
                        <div class="ml-2 mt-2">
                            <input type="checkbox" class="toggle">
                        </div>
=======
        {{-- <div>
            <input type="text" name="birthdate" value="">
            <input type="text" name="place">
            <input type="text" name="weight">
            <input type="text" name="age">
        </div>
        <div>
            <input type="text" name="address" value="{{ $rs->patient->address }}">
            <input type="text" name="email" value="{{ $rs->patient->email }}">
        </div>
        <div>
            <div>
                <h4>Genero:</h4>
                <input type="radio" name="gender">
                <input type="radio" name="gender">
            </div>
            <div>
                <h4>Telefono:</h4> <input type="text" name="phone" value="{{ $rs->patient->phone }}">
                <h4>Telefono Adicional:</h4> <input type="text" name="another_phone">
                <h4>Email Adicional:</h4> <input type="text" name="another_email">
                <h4>Profesión:</h4> <input type="text" name="profession">
                <h4>Acupación:</h4> <input type="text" name="occupation">
            </div>
        </div>     --}}
    </form>
</div>

{{-- <div class="card  p-4">
    <div class="col-md-5">
        <div class="form-group">
            <label class="form-label">Exámenes</label>
            <input type="file" id=fileupload class="form-control" name="exams[]" multiple="">
        </div>
    </div>
</div> --}}
<div class="card  p-4">
    <form id="fileupload" action="" method="POST" enctype="multipart/form-data">
        <div class="row fileupload-buttonbar">
            <div>
            <span class="btn btn-success fileinput-button">
              <input type="file" name="files[]" multiple="">
            </div>

            <div class="ml-2">
                <button type="submit" class="btn btn-primary start">
                    <i class="glyphicon glyphicon-upload"></i>
                    <span>Subir</span>
                </button>
            </div>

            <div class="ml-2">
                <button type="reset" class="btn btn-warning cancel">
                    <i class="glyphicon glyphicon-ban-circle"></i>
                    <span>Cancelar</span>
                </button>
            </div>

            <div class="ml-2">
                <button type="button" class="btn btn-danger delete">
                    <i class="glyphicon glyphicon-trash"></i>
                    <span>Eliminar</span>
                </button>
            </div>
            
            <div class="ml-2 mt-2">
                <input type="checkbox" class="toggle">
            </div>

            <div class="col-lg-5 fileupload-progress fade">
                <!-- The global progress bar -->
                <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar progress-bar-success" style="width:0%;"></div>
                </div>
                <!-- The extended global progress state -->
            <div class="progress-extended">&nbsp;</div>
        </div>
        
        <!-- The table listing the files available for upload/download -->
        <table role="presentation" class="table table-striped">
            <tbody class="files"></tbody>
        </table>
    </form>
</div>
>>>>>>> 98857ae129add4cb4658bf8b640b34de6adba3ff

                        <div class="col-lg-5 fileupload-progress fade">
                            <!-- The global progress bar -->
                            <div class="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                                <div class="progress-bar progress-bar-success" style="width:0%;"></div>
                            </div>
                            <!-- The extended global progress state -->
                            <div class="progress-extended">&nbsp;</div>
                        </div>
                    </div>
                
                    <!-- The table listing the files available for upload/download -->
                    <table role="presentation" class="table table-striped">
                        <tbody class="files"></tbody>
                    </table>
                </form>
            </div>
        </div>

        <div class="card p-4 d-flex justify-content-between">
            <div class="row">
                <div class="col-lg-6 col-md-3" id="framework_form">
                    <label class="form-label">Enfermedades</label>
                    <div class="form-group multiselect_div">
                        <select id="multiselect4-filter" name="multiselect4[]" class="multiselect multiselect-custom" multiple="multiple">
                            @foreach ($disease as $item)
                                <option value= {{ $item->name }}>{{ $item->name }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="col-lg-6 col-md-3" id="framework_form2">
                    <label class="form-label">Medicamentos</label>
                    <div class="form-group multiselect_div">
                        <select id="multiselect4-filter2" name="multiselect4[]" class="multiselect multiselect-custom " multiple="multiple" >
                            @foreach ($medicine as $item)
                                <option value= {{ $item->name }}>{{ $item->name }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
    
                <div class="col-lg-6 col-md-3" id="framework_form3">
                    <label class="form-label">Alergias</label>
                    <div class="form-group multiselect_div">
                        <select id="multiselect4-filter3" name="multiselect4[]" class="multiselect multiselect-custom" multiple="multiple" >
                            @foreach ($medicine as $item)
                                <option value= {{ $item->name }}>{{ $item->name }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="col-md-5 col-md-3">
                    <div class="form-group">
                        <label class="form-label">Cirugias previas</label>
                        <input id="previous_surgery" type="text" class="form-control" placeholder="Cirugias anteriores" value="{{ $rs->patient->historyPatient->previous_surgery  }}" name="previous_surgery" disabled>
                        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal">Agregar</button>
                    </div>

                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div class="modal-body">
                                  <textarea id="" cols="30" rows="10"></textarea>
                                </div>
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-dismiss="modal">cerrar</button>
                                  <button type="button" id="guardar" class="btn btn-primary">Guardar</button>
                                </div>
                              </div>
                            </div>
                          </div>

                </div>
<<<<<<< HEAD
=======
            </div>
        <div class="col-md-8 mt-2">
            <div class="form-group">
                <label class="form-label">Cirugias previas</label>
                <input type="text" class="form-control" placeholder="Cirugias anteriores" value="">
>>>>>>> 98857ae129add4cb4658bf8b640b34de6adba3ff
            </div>
        </div>
    
        <div class="card p-4 row d-flex d-row justify-content-between">
            <label class="form-label">Citas anteriores</label>
            @foreach ($cites as $reservation)
                <div class="card col-4 text-justify p-4 form-control mt-2">
                <div>
                    <label class="remarcado">Doctor:</label>
                    {{ $reservation->employe->person->name }} {{ $reservation->employe->person->lastname }}
                </div>
                <div>
                    <label class="remarcado">Especilaidad:</label>
                    {{ $reservation->speciality->name }}
                </div>
                <div>
                    <label class="remarcado">Fecha de la reservacion:</label>
                    {{ $reservation->date }} 
                </div>
                <div>
                    <label class="remarcado">Razon de la cita:</label>
                    {{ $reservation->description }}
                </div>
                </div> 
            @endforeach
        </div>

<<<<<<< HEAD
            {{-- <a href="" class="btn btn-primary">Guardar</a> --}}
        <button type="submit" class="btn btn-primary start"> Guardar</button>
    </form>
=======
<div class="card  p-4 row">
    <h4>Citas anteriores</h4>
    {{-- @foreach ($cites as $cite) --}}
        <div class="card col-4">
            {{ $cites->employe->person->name }} {{ $cites->employe->person->lastname }} 
            {{-- {{ $cites->person->reservationPatient }} --}}
            {{-- {{$cites->person->reservationPatient->date}} --}}
          
        </div> 
    {{-- @endforeach --}}
>>>>>>> 98857ae129add4cb4658bf8b640b34de6adba3ff
</div>
@endsection

<<<<<<< HEAD
@section('scripts')
    <script src="{{ asset('assets\plugins\bootstrap-multiselect\bootstrap-multiselect.js') }}"></script>
    <script src="{{ asset('assets\plugins\multi-select\js\jquery.multi-select.js') }}"></script>
<script>
    $('#multiselect4-filter').multiselect({
        enableFiltering: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 200
    });
</script>
<script>
    $('#multiselect4-filter2').multiselect({
        enableFiltering: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 200
    });
</script>
<script>
    $('#multiselect4-filter3').multiselect({
        enableFiltering: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 200
    });
</script>
@endsection
=======
<a href="" class="btn btn-primary">Guardar</a>

@endsection

<script src="node_modules/blueimp-file-upload/js/jquery.fileupload.js"></script>
<script>
    $('#fileupload').fileupload();
</script>
{{-- <script src="js/jquery.fileupload.js" type="text/javascript"></script> --}}
>>>>>>> 98857ae129add4cb4658bf8b640b34de6adba3ff