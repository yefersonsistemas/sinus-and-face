@extends('dashboard.layouts.app')
@section('cites','active')
@section('agendar','active')
@section('title','Agendar Cirugia')
@section('outrol','d-block')
@section('dire','d-none')
@section('css')
<link rel="stylesheet" href="{{ asset('assets\plugins\jquery-steps\jquery.steps.css') }}">
<link rel="stylesheet" href="{{ asset('assets\plugins\dropify\css\dropify.min.css') }}">
{{-- para el calendario de js --}}
<link href='{{asset('assets\fullcalendar\packages\core\main.css')}}' rel='stylesheet' />
<link href='{{asset('assets\fullcalendar\packages\daygrid\main.css')}}' rel='stylesheet' />
<link href='{{asset('assets\fullcalendar\packages\timegrid\main.css')}}' rel='stylesheet' />
<link href='{{asset('assets\fullcalendar\packages\list\main.css')}}' rel='stylesheet' />
<link href='{{asset('assets\fullcalendar\css\style.css')}}' rel='stylesheet' />
{{-- <link rel="stylesheet" href="{{ asset('assets\plugins\fullcalendar\fullcalendar.min.css') }}"> --}}
<link rel="stylesheet" href="{{ asset('assets\css\brandMaster.css') }}">

@endsection @section('content')

<div class=" py-4">
    <div class="container-fluid">
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12">
            <form id="wizard_horizontal" method="POST" action="{{route('surgerys.store')}}" class="card pl-4 pr-4">
                    @csrf
                    <h2>Buscar Paciente</h2>
                    <section>
                        <div class="row clearfix">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-header">
                                        <h2 class="card-title">Datos del paciente</h2>
                                    </div>
                                    <div class="card-body ">
                                        <div class="col-lg-4  col-md-6">
                                            <div class="form-group d-flex flex-row  align-items-center">
                                                <div class="input-group">
                                                    <div class="input-group-prepend bg-white">
                                                        <span class="input-group-text btn-turquesa"><i
                                                                class="fa fa-id-card"></i></span>
                                                    </div>
                                                    <div class="input-group-prepend">
                                                    <select name="type_dni" id="type_dni" class="custom-select input-group-text bg-white">
                                                        <option>...</option>
                                                        <option>N</option>
                                                        <option>E</option>
                                                    </select>
                                                    </div>
                                                        <input type="text" maxlength="9" class="form-control mr-2" type="text" id="dni" placeholder="Cédula" value="">
                                                    <input type="hidden" name="patient_id" id="patient_id" value="">
                                                    <button type="button" id="search" class="btn btn-azuloscuro text-white" ><i
                                                            class="fa fa-search"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-4 col-md-6 mb-2">
                                                <input id="photo" type="file" class="dropify" disabled name="photo" data-default-file="" value="">
                                            </div>
                                            <div class="col-lg-4 col-md-6 centrado">
                                                <div class="form-group">
                                                    <label class="form-label">Nombre</label>
                                                    <input type="text" id="name" name="name" disabled class="form-control" placeholder="Nombre" value="">
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-6 centrado">
                                                <div class="form-group">
                                                    <label class="form-label">Apellido</label>
                                                    <input type="text" disabled id="lastname" name="lastname" class="form-control" placeholder="Apellido" value="">
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label">Correo Electrónico</label>
                                                    <input type="text" disabled id="email" name="email" class="form-control" placeholder="Correo Electrónico" value="">
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label">Dirección</label>
                                                    <input type="text" disabled id="address" name="address" class="form-control" placeholder="Dirección" value="">
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-6">
                                                <div class="form-group">
                                                    <label class="form-label">Teléfono</label>
                                                    <input type="number" disabled id="phone" name="phone" class="form-control" placeholder="Teléfono" value="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <h2>Elegir Procedimientos</h2>
                    <section>
                        <div class="row justify-content-between">
                            <div class="card">
                                <div class="card-header">
                                    <button type="button" data-toggle="modal" data-target="#proceconsul" class="btn btn-verdePastel"><i class="fa fa-plus"></i>Agregar Procedimiento</button>
                                    <h6 class="text-center" style="font-weight:bold">Procedimientos Realizados</h6>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-hover table-vcenter table-striped"
                                        cellspacing="0" id="addrowExample">
                                            <thead>
                                                <tr>
                                                    <th>Procedimiento Seleccionado</th>
                                                    <th class="text-center">Accion</th>
                                                </tr>
                                            </thead>
                                            <tbody id="procesc">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <h2>Elegir Medico</h2>
                    <section>
                        <div class="row justify-content-between" id="medicos">
                        </div>
                        {{-- <input type="hidden" name="doctor" id="doctor"> --}}
                    </section>
                    <h2>Seleccione Quirofano</h2>
                    <section class="container">
                        <div class="row justify-content-between">
                            @foreach ($quirofano as $quirofano)
                                @if ($quirofano->status == '')
                                    <div class="col-lg-2  m-xl-2 m-lg-3 col-md-4 col-sm-6 col-12 mx-sm-0 mx-md-0 d-flex justify-content-center">
                                        <label class="imagecheck m-0">
                                            <div class="card assigment">
                                                <input type="radio" name="area_id" value="{{ $quirofano->id }}" id="area_id" class="imagecheck-input">
                                                {{-- @if (!empty($quirofano->image->path))
                                                <figure class="imagecheck-figure border-0 text-center" style="max-height: 100px; width:170px; ">
                                                    <img width="100%" height="100%" src="{{ Storage::url($quirofano->image->path) }}" alt="" class="imagecheck-image">
                                                </figure>
                                                @else --}}
                                                <figure class="imagecheck-figure border-0 text-center">
                                                    <img src="{{ asset('assets/images/sm/default.jpg') }}" alt="" class="imagecheck-image">
                                                </figure>
                                                {{-- @endif --}}
                                                <div class="card-body text-center pt-4" style="height:70px; width:170px">
                                                    <h6 class="font-weight-bold" style="font-size:15px">{{ $quirofano->name }}</h6>
                                                    <h6 class="card-subtitle mt-1"><span class="badge badge-light text-white bg-verdePastel pl-3 pr-3 pb-2" style="color:#fff">Desocupado</span></h6>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                @else    
                                @if ( $quirofano->status == 'ocupado')
                                <div class="col-lg-2  m-xl-2 m-lg-3 col-md-4 col-sm-6 col-12 mx-sm-0 mx-md-0 d-flex justify-content-center">
                                    <label class="imagecheck m-0">
                                        <div class="card assigment">
                                            <input type="radio" name="area_id" value="" id="area_id" class="imagecheck-input" disabled>
                                            {{-- @if (!empty($quirofano->image->path))
                                            <figure class="imagecheck-figure border-0 text-center" style="max-height: 100px; width:170px; ">
                                                <img width="100%" height="100%" src="{{ Storage::url($quirofano->image->path) }}" alt="" class="imagecheck-image">
                                            </figure>
                                            @else --}}
                                            <figure class="imagecheck-figure border-0 text-center">
                                                <img src="{{ asset('assets/images/sm/default.jpg') }}" alt="" class="imagecheck-image">
                                            </figure>
                                            {{-- @endif --}}
                                            <div class="card-body text-center pt-4" style="height:70px; width:170px">
                                                <h6 class="font-weight-bold" style="font-size:15px">{{ $quirofano->name }}</h6>
                                                <h6 class="card-subtitle mt-1"><span class="badge badge-light text-danger pl-3 pr-3 pb-1" style="color:red">{{ $quirofano->status }}</span> </h6>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            @endif 
                                @endif
                                
                            @endforeach
                        </div>
                    </section>
                    <h2>Elegir Fecha</h2>
                    <section>
                        <div class="col-md-6 m-auto">
                            <div class="card card-date">
                                <div class="card-header">
                                    <h3 class="card-title">Elegir Fecha</h3>
                                </div>
                                <div class="form-group mx-4">
                                    <div class="input-group">
                                        <input data-provide="datepicker" data-date-autoclose="true" id="picker" name="date" class="form-control datepicker" autocomplete="off">
                                    </div>
                                </div>
                            </div>
                        </div>
                        {{-- <div class="col-lg-12 col-md-12">
                            <div class="card">
                                <div class="card-header bline">
                                    <h3 class="card-title">Calendario</h3>
                                    <div class="card-options">
                                        <a href="#" class="card-options-fullscreen" data-toggle="card-fullscreen"><i class="fe fe-maximize"></i></a>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div id="calendar"></div>
                                </div>
                            </div>
                        </div> --}}
                        {{-- <div id='wrap'>
                        <div id='external-events'>
                            <h4>Draggable Events</h4>
                            <div id='external-events-list'>
                            <div class='fc-event'>My Event 1</div>
                            <div class='fc-event'>My Event 2</div>
                            <div class='fc-event'>My Event 3</div>
                            <div class='fc-event'>My Event 4</div>
                            <div class='fc-event'>My Event 5</div>
                            </div>
                            <p>
                            <input type='checkbox' id='drop-remove' />
                            <label for='drop-remove'>remove after drop</label>
                            </p>
                        </div>
                    
                        <div id='calendar'></div>
                    
                        <div style='clear:both'></div>
                    
                        </div> --}}

                    </section>
                </form>
            </div>
        </div>
    </div>
</div>

@endsection 
@section('scripts')
<script src="{{ asset('assets\plugins\jquery-steps\jquery.steps.js') }}"></script>
<script src="{{ asset('assets\plugins\dropify\js\dropify.min.js') }}"></script>
<script src="{{ asset('assets\bundles\fullcalendar.bundle.js') }}"></script>
<script src="{{ asset('assets\js\form\form-advanced.js') }}"></script>
{{-- para el calendario js --}}
<script src='{{asset('assets\fullcalendar\packages\core\main.js')}}'></script>
<script src='{{asset('assets\fullcalendar\packages\interaction\main.js')}}'></script>
<script src='{{asset('assets\fullcalendar\packages\daygrid\main.js')}}'></script>
<script src='{{asset('assets\fullcalendar\packages\timegrid\main.js')}}'></script>
<script src='{{asset('assets\fullcalendar\packages\list\main.js')}}'></script>
<script src='{{asset('assets\fullcalendar\js\calendar.js')}}'></script>
<script src='{{asset('assets\fullcalendar\packages\core\locales-all.js')}}'></script>
{{-- <script src="{{ asset('assets\js\page\calendar.js') }}"></script> --}}
{{--
<script src="{{ asset('js\dashboard\createCite.js') }}"></script> --}}


<script>
    function stopDefAction(evt) {
        evt.preventDefault();
    }
    var form = $('#wizard_horizontal').show();
    form.steps({
        headerTag: 'h2',
        bodyTag: 'section',
        transitionEffect: 'slideLeft',
        labels: {
            cancel: "Cancelar",
            current: "Paso actual:",
            pagination: "Paginación",
            finish: "Finalizar",
            next: "Siguiente",
            previous: "Anterior",
            loading: "Cargando ..."},
        onInit: function(event, currentIndex) {
            setButtonWavesEffect(event);
            search();
        },
        onStepChanged: function(event, currentIndex, priorIndex) {
            setButtonWavesEffect(event);
            if (currentIndex === 1) {
                surgery();
            }

            if (currentIndex === 2) {
                doctor();
            }

            if (currentIndex === 3) {
                quirofano();
            }
        },
        onFinished: function(event, currentIndex) {
            var form = $(this);
            form.submit();
        }
    });

    function setButtonWavesEffect(event) {
        $(event.currentTarget).find('[role="menu"] li a').removeClass('');
        $(event.currentTarget).find('[role="menu"] li:not(.disabled) a').addClass('');
    }

    function search() {
        $("#search").click(function() {
            var type_dni = $("#type_dni").val();
            var dni = $("#dni").val();

            $('#name').val('');
            $('#lastname').val('');
            $('#email').val('');
            $('#address').val('');
            $('#phone').val('');

            if(type_dni == '' || dni ==  '' || dni.length < 7){

                Swal.fire({
                    title: 'Datos incompletos.!',
                    text: 'Por favor introduzca el documento de identidad completo.',
                    allowOutsideClick:false,
                });
            }else{
                ajax(type_dni, dni);

            }
        });
    }

    function ajax(type_dni, dni) {
        $.ajax({
                url: "{{ route('search.patients') }}",
                type: "POST",
                data: {
                    _token: "{{ csrf_token() }}",
                    type_dni: type_dni,
                    dni: dni
                }
            })
            .done(function(data) {
                console.log('ee', data);
               
                if (data[0] == 202) {
                    Swal.fire({
                        title: data.message,
                        text: 'Datos Incorrectos o la Persona No es Paciente',
                        type: 'error',
                        allowOutsideClick:false,
                    })
                }
                if (data[0] == 201) {
                    Swal.fire({
                        title: 'Excelente!',
                        text: 'Paciente encontrado',
                        type: 'success',
                        allowOutsideClick:false,
                    })
                    disabled(data);
                }
            })
            .fail(function(data) {
                console.log(data);
            })
    }

    function disabled(data) {
        $('#name').val(data.patient.person.name);
        $('#lastname').val(data.patient.person.lastname);
        $('#email').val(data.patient.person.email);
        $('#address').val(data.patient.person.address);
        $('#phone').val(data.patient.person.phone);
        $('#patient_id').val(data.patient.id);

        $("#photo").attr('disabled', true);
        $(".dropify-wrapper").addClass('disabled');
        $('#name').attr('disabled', true);
        $('#lastname').attr('disabled', true);
        $('#email').attr('disabled', true);
        $('#address').attr('disabled', true);
        $('#phone').attr('disabled', true);
        $('#submit').attr('disabled', true);
        // $("#photo").val(data.person.photo);
        // $('.dropify-render')
    }

    function surgery() {
        $("input[name='type_surgery_id']").click(function() {
            
            var surgery = $(this).val();
            console.log("hh", surgery);
            
            $.ajax({
                    url: "{{ route('search.doctor') }}",
                    type: "POST",
                    data: {
                        _token: "{{ csrf_token() }}",
                        id: surgery,
                    }
                })
                .done(function(data) {
                    console.log("d",data.surgery.employe_surgery);
                    Swal.fire({
                        title: 'Cirugia Seleccionada!',
                        text: 'Click en OK para continuar',
                        type: 'success',
                        allowOutsideClick:false,
                    });
                    // $('#surgery').val(data[0].id);
                    cargarMedicos(data);
                })
                .fail(function(data) {
                    console.log(data);
                })
        });
    }

    function cargarMedicos(data) {
        console.log('dataaaa',data.surgery.employe_surgery.length);
        $('#medicos').empty();
            for (let j = 0; j < data.surgery.employe_surgery.length; j++) {
                $('#medicos').append(`<div class="col-lg-2  m-xl-2 m-lg-3 col-md-4 col-sm-6 col-12 mx-sm-0 mx-md-0 d-flex justify-content-center">
                                        <label class="imagecheck m-0">
                                        <div class="card assigment">
                                                <input type="radio" name="employe_id" value="${data.surgery.employe_surgery[j].id }" id="employe_id" class="imagecheck-input">
                                                <figure class="imagecheck-figure border-0 text-center" style="max-height: 100px; width:170px;">
                                                    <img width="100%" height="100%" src="/storage/${data.surgery.employe_surgery[j].image.path}" alt="" class="imagecheck-image m-auto">
                                                </figure>
                                                <div class="card-body text-center bg-grisinus pt-4" style="height:70px; width:170px">
                                                    <h6 class="font-weight-bold" style="font-size:15px">${data.surgery.employe_surgery[j].person.name} ${data.surgery.employe_surgery[j].person.lastname}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                </div>`);
        }
    }

    function doctor() {
        $("input[name='employe_id']").click(function() {
            var doctor = $(this).val();
            console.log('hola');
            console.log(doctor);

            Swal.fire({
                title: 'Médico seleccionado!',
                text: 'Click en OK para continuar',
                type: 'success',
                allowOutsideClick:false,
            });
        });
    }

    function quirofano() {
        $("input[name='area_id']").click(function() {
            var quirofano = $(this).val();
            console.log(quirofano);

            Swal.fire({
                title: 'Quirofano seleccionado!',
                text: 'Click en OK para continuar',
                type: 'success',
                allowOutsideClick:false,
            });
        });
    }
    
</script>

@endsection