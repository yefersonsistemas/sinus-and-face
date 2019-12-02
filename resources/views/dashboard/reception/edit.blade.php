@extends('dashboard.layouts.app')

@section('cites','active')
@section('all','active')

@section('title','Actualizar cita')

@section('css')
<link rel="stylesheet" href="{{ asset('assets\plugins\bootstrap-datepicker\css\bootstrap-datepicker3.min.css') }}">
@endsection

@section('content')

<div class="col-lg-12">
    <form class="card" method="POST" action="{{ route('reservations.update', $reservation) }}">
        @csrf
        @method('PUT')
        <div class="card-body">
            <h3 class="card-title"><b>Cita de {{ $reservation->patient->name }}</b></h3>
            <div style="margin-bottom:12px">
                <a class="btn btn-primary" id="EditPatient" href="#">Editar datos paciente <i class="fa fa-vcard"></i></a>
            </div>
            <div class="row">
                <div class="col-sm-6 col-md-1">
                    <div class="form-group">
                        <label class="form-label">Tipo DNI</label>
                        <select name="type_dni" disabled class="form-control" id="type_dni">
                            <option {{ ($reservation->patient->type_dni == 'V' ? 'selected' :'') }} value="V">V</option>
                            <option {{ ($reservation->patient->type_dni == 'E' ? 'selected' :'') }} value="E">E</option>
                            <option {{ ($reservation->patient->type_dni == 'J' ? 'selected' :'') }} value="J">J</option>
                        </select>
                    </div>
                </div>
                <div class="col-sm-6 col-md-3">
                    <div class="form-group">
                        <label class="form-label">DNI</label>
                        <input type="number" name="dni" id="dni" disabled class="form-control" value="{{ $reservation->patient->dni }}">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-label">Nombre</label>
                        <input type="text" class="form-control" name="name"
                        id="name" disabled="" value="{{ $reservation->patient->name }}">
                    </div>
                </div>
                <div class="col-sm-6 col-md-4">
                    <div class="form-group">
                        <label class="form-label">Apellido</label>
                        <input type="text" disabled class="form-control" id="lastname" name="lastname" placeholder="Username" value="{{ $reservation->patient->lastname }}">
                    </div>
                </div>
                <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                        <label class="form-label">Correo Electrónico</label>
                        <input type="email" disabled class="form-control" id="email" name="email" placeholder="Email" value="{{ $reservation->patient->email }}">
                    </div>
                </div>
                <div class="col-sm-6 col-md-6">
                    <div class="form-group">
                        <label class="form-label">Teléfono</label>
                        <input type="text" disabled id="phone" name="phone" class="form-control" value="{{ $reservation->patient->phone }}">
                    </div>
                </div>
                <div class="col-sm-6 col-md-12">
                    <div class="form-group">
                        <label class="form-label">Dirección</label>
                        <input type="text" disabled id="address" name="address" class="form-control" value="{{ $reservation->patient->address }}">
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="form-label">Doctor <i class="fa fa-user-md"></i></label>
                    </div>
                    <div style="margin-bottom:12px">
                        <a class="btn btn-primary" href="#" id="newMedic">Elegir otro médico <i class="fa fa-user-md"></i></a>
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
                        <label class="form-label">Médico</label>
                        <input type="text" class="form-control" name="doctor" value="{{ $reservation->person->name }}" disabled id="doctor">
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group" id="newDate">
                        <label>Fecha</label>
                        <div class="form-group">
                            <div class="input-group">
                                <input id="fecha" name="fecha" data-provide="datepicker" data-date-autoclose="true" class="form-control datepicker" value="{{ $reservation->date }}">
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
                        <label class="form-label">Motivo de la reprogramación</label>
                        <textarea rows="5" name="reason" class="form-control" placeholder="Motivo..."></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer text-right">
            <button type="submit" class="btn btn-primary">Actualizar cita</button>
        </div>
    </form>
</div>

@endsection

@section('scripts')

<script src="{{ asset('assets\plugins\bootstrap-datepicker\js\bootstrap-datepicker.min.js') }}"></script>

    <script>

        $('#EditPatient').click(function() {
            $('#type_dni').removeAttr('disabled');
            $('#dni').removeAttr('disabled');
            $('#name').removeAttr('disabled');
            $('#lastname').removeAttr('disabled');
            $('#address').removeAttr('disabled');
            $('#email').removeAttr('disabled');
            $('#phone').removeAttr('disabled');
        });

        $('#newMedic').click(function() {
            $('#speciality').removeAttr('disabled');
            $('#doctor').removeAttr('disabled');
            $('#date').removeAttr('disabled');
        });

        $("#speciality").change(function() {
            var speciality = $(this).val();
            ajaxSpeciality(speciality);
        });

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

        function cargarMedicos(data) {
            $('#newDoctor').empty();
            $('#newDoctor').html('<label class="form-label">Médico</label><select class="form-control custom-select" name="person_id" id="doctor1"> <option value=""> Seleccione </option> </select>');
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].employe.length; j++) {
                    $('#doctor1').append('<option value="'+data[i].employe[j].person.id+'">'+ data[i].employe[j].person.name +'</option>');
                }
            }

            $("#doctor1").change(function() {
                var doctor = $(this).val();
                ajaxMedico(doctor);
            });
        }

        function cargarDate(data){
            console.log(data.available);
            $('#newDate').empty();
            $('#newDate').html('<label class="form-label">Fecha</label> <div class="form-group"> <div class="input-group"> <input id="datepicker" data-provide="datepicker" data-date-autoclose="true" name="fecha" class="form-control datepicker"> </div> </div>');
            fecha = new Date(2019, 10, 29);
            fecha2 = new Date(2019, 10, 30);
            console.log(fecha);
            $('#datepicker').datepicker({
                todayHighlight: true,
                language: 'es',
                startDate: new Date(2019,10,25),
            });
        }

        $('#fecha').datepicker({
            todayHighlight: true,
            language: 'es',
            startDate: new Date(2019,10,25),
        });

    </script>
@endsection

{{-- + data[i].employe[j].id + --}}

{{-- <div class="form-group">
    <div class="input-group">
        <input data-provide="datepicker" data-date-autoclose="true" class="form-control">
    </div>
</div> --}}