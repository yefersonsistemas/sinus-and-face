@extends('dashboard.layouts.app')

@section('cites','active')
{{-- @section('all','active') --}}
@section('inrol','d-block')
@section('dire','d-none')

@section('title','Actualizar cita')

@section('css')
<link rel="stylesheet" href="{{ asset('assets\plugins\bootstrap-datepicker\css\bootstrap-datepicker3.min.css') }}">
<link rel="stylesheet" href="{{ asset('assets\css\style.css') }}">
    <link rel="stylesheet" href="{{ asset('assets\plugins\multi-select\css\multi-select.css') }}">
    <link rel="stylesheet" href="{{ asset('assets\css\brandAn.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/plugins/dropzone/css/dropzone.css') }}">
    <link rel="stylesheet" href="{{ asset('assets\plugins\datatable\dataTables.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets\plugins\datatable\fixedeader\dataTables.fixedcolumns.bootstrap4.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets\plugins\datatable\fixedeader\dataTables.fixedheader.bootstrap4.min.css') }}">
@endsection

@section('content')
    <div class="section-body py-3">
        <div class="container-fluid">            
            <div class=" p-4">     
                    <form class="card" method="POST" action="{{ route('reservations.update', $reservation) }}" autocomplete="off">
                        @csrf
                        @method('PUT')
                        <div class="card-body">    
                            {{-- <h3 class="card-title"><b>Cita de {{ $reservation->patient->name }}</b></h3> --}}
                            {{-- <div style="margin-bottom:12px">
                                <a class="btn btn-verdePastel" id="EditPatient" href="#">Editar datos paciente <i class="fa fa-vcard"></i></a>
                            </div> --}}
                            <div class="row">



                                <div class=" icon btn-scroll">
                                    <a class="   ml-20 icon-primary fa fa-pencil  " href="#" id="EditPatient" title="Editar Historial"></a>
                                    <div class=" container-description">
                                    <a class="  icon-description" href="#">Editar Historial</a>
                                    </div>
                                </div>


                                
                                <div class="col-sm-6 col-md-1">
                                    <div class="form-group">
                                        <label class="form-label">Tipo DNI</label>
                                        <select name="type_dni" disabled class="form-control" id="type_dni">
                                            <option {{ ($reservation->patient->type_dni == 'N' ? 'selected' :'') }} value="N">N</option>
                                            <option {{ ($reservation->patient->type_dni == 'E' ? 'selected' :'') }} value="E">E</option>
                                            <input type="hidden" name="type_dni" value="{{ $reservation->patient->type_dni }}">
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-md-3">
                                    <div class="form-group">
                                        <label class="form-label">DNI</label>
                                        <input type="hidden" name="habilitado" id="habilitado" value="">
                                        <input type="number" name="dni" id="dni" disabled class="form-control" value="{{ $reservation->patient->dni }}">
                                        <input type="hidden" name="dni" value="{{ $reservation->patient->dni }}">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label">Nombre</label>
                                        <input type="text" class="form-control" name="name"
                                        id="name" disabled="" value="{{ $reservation->patient->name }}">
                                        <input type="hidden" name="name" value="{{ $reservation->patient->name }}">
                                    </div>
                                </div>
                                <div class="col-sm-6 col-md-4">
                                    <div class="form-group">
                                        <label class="form-label">Apellido</label>
                                        <input type="text" disabled class="form-control" id="lastname" name="lastname" placeholder="Username" value="{{ $reservation->patient->lastname }}">
                                        <input type="hidden" name="lastname" value="{{ $reservation->patient->lastname }}">
                                    </div>
                                </div>
                                <div class="col-sm-6 col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Correo Electr??nico</label>
                                        <input type="email" disabled class="form-control" id="email" name="email" placeholder="Email" value="{{ $reservation->patient->email }}">
                                        {{-- <input type="hidden" name="email" value="{{ $reservation->patient->email }}"> --}}
                                    </div>
                                </div>
                                <div class="col-sm-6 col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Tel??fono</label>
                                        <input type="text" disabled id="phone" name="phone" class="form-control"  onkeypress="return num(event)" value="{{ $reservation->patient->phone }}">
                                        {{-- <input type="hidden" name="phone" value="{{ $reservation->patient->phone }}"> --}}
                                    </div>
                                </div>
                                <div class="col-sm-6 col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Direcci??n</label>
                                        <input type="text" disabled id="address" name="address" class="form-control" value="{{ $reservation->patient->address }}">
                                        {{-- <input type="hidden" name="address" value="{{ $reservation->patient->address }}"> --}}
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Doctor <i class="fa fa-user-md"></i></label>
                                    </div>
                                    <div style="margin-bottom:12px">
                                        <a class="btn btn-verdePastel" href="#" id="newMedic">Elegir otro m??dico <i class="fa fa-user-md"></i></a>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label class="form-label">Especialidad</label>
                                        <select class="form-control custom-select" name="speciality" disabled name="speciality" id="speciality">
                                            @foreach ($specialities as $speciality)
                                                <option {{ ($speciality->id == $reservation->specialitie_id ) ? 'selected' : '' }} value="{{ $speciality->id }}">{{ $speciality->name }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-md-4">
                                    <div class="form-group" id="newDoctor">
                                        <label class="form-label">M??dico</label>
                                        <input type="hidden" name="person_id" value="{{ $employe->id  }}">
                                        <select class="form-control custom-select" name="person_id" id="doctor" disabled>
                                             <option value="{{ $employe->id  }}">{{ $reservation->person->name }} {{ $reservation->person->lastname }}</option>
                                             @if($medicos != null)
                                            @foreach ($medicos as $item)
                                                <option value="{{ $item->id }}">{{ $item->person->name }} {{ $item->person->lastname }}</option>
                                            @endforeach
                                            @endif
                                        </select>

                                        {{-- <label class="form-label">M??dico</label> --}}
                                        <input type="hidden" id="editar" value="{{ $employe->id }}">

                                        {{-- <input type="text" class="form-control" name="doctor" value="{{ $reservation->person->name }} {{ $reservation->person->lastname }}" disabled id="doctor"> --}}
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group" id="newDate">
                                        <label>Fecha</label>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <input type="hidden" id="fechanueva" value="{{ $reservation->date }}">
                                                <input id="fechas" name="fecha" data-provide="datepicker" autocomplete="off" data-date-autoclose="true" class="form-control datepicker" >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group mb-0">
                                        <label class="form-label">Motivo de la consulta</label>
                                        <textarea rows="5" class="form-control" placeholder="Here can be your description" name="description" value="Mike">{{ $reservation->description }}</textarea>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group mb-0">
                                        <label class="form-label">Motivo de la reprogramaci??n</label>
                                        <textarea rows="5" name="reason" class="form-control" placeholder="Motivo..."></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer text-right">
                            <button type="submit" class="btn btn-verdePastel">Actualizar cita</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
<script src="{{ asset('assets\bundles\dataTables.bundle.js') }}"></script>
<script src="{{ asset('assets\js\table\datatable.js') }}"></script>
<script src="{{ asset('assets\plugins\jquery-steps\jquery.steps.js') }}"></script>

<script src="{{ asset('assets\plugins\bootstrap-datepicker\js\bootstrap-datepicker.min.js') }}"></script>

{{-- SCRIPT PARA MENSAJE CON BOTON HACIA ATRAS DEL NAVEGADOR --}}
<script>
    var submitted = false;

     $(document).ready(function() {
       $("form").submit(function() {
         submitted = true;
       });

       window.onbeforeunload = function () {
         if (!submitted) {
           return 'Do you really want to leave the page?';
         }
       }
     });
    </script>
    {{--FIN SCRIPT PARA MENSAJE CON BOTON HACIA ATRAS DEL NAVEGADOR --}}

    <script>

        $( document ).ready(function() {
         var doctor = $('#editar').val();
        //  var fecha = $('#fechanueva').val();

         console.log('este es', doctor);

         ajaxMedico(doctor);
        });

        $('#EditPatient').click(function() {
            // $('#type_dni').removeAttr('disabled');
            // $('#dni').removeAttr('disabled');
            // $('#name').removeAttr('disabled');
            // $('#lastname').removeAttr('disabled');
            $('#address').removeAttr('disabled');
            $('#email').removeAttr('disabled');
            $('#phone').removeAttr('disabled');
            $valor="habilitado";
            $('#habilitado').val($valor);
        });

        $('#newMedic').click(function() {
            $('#speciality').removeAttr('disabled');
            $('#doctor').removeAttr('disabled');
            $('#date').removeAttr('disabled');

        });

        // buscando medicos mediante la especialidad
        $("#speciality").click(function() {
            var speciality = $(this).val();
            ajaxSpeciality(speciality);
        });

        function ajaxSpeciality(speciality){
            $.ajax({
                url: "{{ route('search.medic') }}",
                type: "POST",
                data: {
                    _token: "{{ csrf_token() }}",
                    id: speciality,
                }
            })
            .done(function(data) {
                cargarMedicos(data);
            })
            .fail(function(data) {
                console.log(data);
            })
        }

        //cargando medicos
        function cargarMedicos(data) {

            // console.log('ysbe', data)
            $('#newDoctor').empty();
            $('#newDoctor').html('<label class="form-label">M??dico</label><select class="form-control custom-select" name="person_id" id="doctor1"> <option value=""> Seleccione </option> </select>');
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].employe.length; j++) {
                    $('#doctor1').append('<option value="'+data[i].employe[j].id+'">'+ data[i].employe[j].person.name +' '+ data[i].employe[j].person.lastname +'</option>');
                }
            }

            $("#doctor1").change(function() {
                var doctor = $(this).val();
                ajaxMedico(doctor);
            });
        }


        $("#doctor").change(function() {
            var doctor = $(this).val();
            ajaxMedico(doctor);
        });

         //buscando horario del medico
        function ajaxMedico(doctor){
            $.ajax({
                url: "{{ route('search.schedule') }}",
                type: "POST",
                data: {
                    _token: "{{ csrf_token() }}",
                    id: doctor,
                }
            })
            .done(function(data) {
                console.log(data);
                cargarDate(data);
            })
            .fail(function(data) {
                console.log(data);
            })
        }

        //cargando horario
        function cargarDate(data){
            console.log('primero',data.available);
            console.log('segundo',data.diff);
            $('#newDate').empty();
            //cuando se usa.html es para sustituir lo que se tiene arriba
            $('#newDate').html('<label class="form-label">Fecha</label> <div class="form-group"> <div class="input-group"> <input id="fechas" data-provide="datepicker" data-date-autoclose="true" name="fecha" class="form-control datepicker"> </div> </div>');

            $('#fechas').datepicker({
                todayHighlight: true,
                language: 'es',
                startDate: data.start,
                endDate: data.end,
                daysOfWeekHighlighted: [0,6],
                datesDisabled: data.diff,
            });

        $('#fechas').val();
        }


        $('#fechas').datepicker({
            todayHighlight: true,
            language: 'es',
            startDate: data.start,
            endDate: data.end,
            datesDisabled: data.available,

        });

    </script>


<script type="text/javascript"> function num(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla==8)
    return true;
    else
    if (tecla==0||tecla==9)
    return true;
    patron =/[0-9\s]/;// -> solo numeros
    te = String.fromCharCode(tecla);
    return patron.test(te);
}
</script>
@endsection

{{-- + data[i].employe[j].id + --}}

{{-- <div class="form-group">
    <div class="input-group">
        <input data-provide="datepicker" data-date-autoclose="true" class="form-control">
    </div>
</div> --}}
