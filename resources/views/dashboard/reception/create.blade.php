@extends('dashboard.layouts.app')

@section('cites','active')    
@section('newCite','active')

@section('title','Crear una nueva cita')

@section('css')
    <link rel="stylesheet" href="{{ asset('assets\plugins\jquery-steps\jquery.steps.css') }}">
    <link rel="stylesheet" href="{{ asset('assets\plugins\dropify\css\dropify.min.css') }}">
@endsection


@section('content')
<style>
.wizard > .steps > ul > li {
    font-size: 12px;
    width: 206px;
}
.wizard a, .tabcontrol a {
    outline: 0;
    margin-top: 28px;
}
.wizard > .content {
    min-height: 39rem;
}

.dropify-wrapper {
    height: 130px;
}

.page .section-body {
    margin-top: 26px;
}

.centrado{
    align-self: center;
}
</style>
<div class="section-body">
    <div class="container-fluid">
        <div class="row clearfix">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <div id="wizard_horizontal">
                            <h2>Buscar Paciente</h2>
                            <section>
                                <div class="row clearfix">                    
                                    <div class="col-lg-12">
                                        <form method="POST" action="" class="card">
                                            @csrf
                                            <div class="card-body">
                                                <h2 class="card-title">Edit Profile</h2>
                                                <div class="row">
                                                    <div class="col-md-3">
                                                        <div class="form-group">
                                                            <label class="form-label">Tipo de documento</label>
                                                            <select class="custom-select" name="type_dni" id="">
                                                                <option value="0">----Seleccione----</option>
                                                                <option value="">V</option>
                                                                <option value="">E</option>
                                                                <option value="">J</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-8 col-md-5">
                                                        <div class="form-group">
                                                            <label class="form-label">Dni</label>
                                                            <input type="text" class="form-control" placeholder="DNI" value="">
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-5 col-md-3">
                                                        <div class="form-group">
                                                            <a href="#" id="search" class="btn btn-primary form-control"><i class="fa fa-search"></i></a>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-3 col-md-2">
                                                        <div class="card">
                                                                <h3 class="card-title">Foto</h3>
                                                            <div class="card-body">
                                                                <input type="file" class="dropify">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6 col-md-4 centrado">
                                                        <div class="form-group">
                                                            <label class="form-label">Nombre</label>
                                                            <input type="text" disabled class="form-control">
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6 col-md-4 centrado">
                                                        <div class="form-group">
                                                            <label class="form-label">Apellido</label>
                                                            <input type="text" disabled class="form-control">
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6 col-md-12">
                                                        <div class="form-group">
                                                            <label class="form-label">Correo Electrónico</label>
                                                            <input type="text" disabled class="form-control">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label class="form-label">Dirección</label>
                                                            <input type="text" disabled class="form-control">
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6 col-md-3">
                                                        <div class="form-group">
                                                            <label class="form-label">Teléfono</label>
                                                            <input type="number" disabled class="form-control">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-footer text-right">
                                                <button type="submit" class="btn btn-success" disabled>Registrar paciente</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </section>
                            <h2>Elegir Especialidad</h2>
                            <section>
                                <p>Donec mi sapien, hendrerit nec egestas a, rutrum vitae dolor. Nullam venenatis diam ac ligula elementum pellentesque. In lobortis sollicitudin felis non eleifend. Morbi tristique tellus est, sed tempor elit.
                                    Morbi varius, nulla quis condimentum dictum, nisi elit condimentum magna, nec venenatis urna quam in nisi. Integer hendrerit sapien a diam adipiscing consectetur. In euismod augue ullamcorper leo dignissim
                                    quis elementum arcu porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum leo velit, blandit ac tempor nec, ultrices id diam. Donec metus lacus, rhoncus sagittis iaculis nec, malesuada
                                    a diam. Donec non pulvinar urna. Aliquam id velit lacus. </p>
                            </section>
                            <h2>Elegir Medico</h2>
                            <section>
                                <p> Morbi ornare tellus at elit ultrices id dignissim lorem elementum. Sed eget nisl at justo condimentum dapibus. Fusce eros justo, pellentesque non euismod ac, rutrum sed quam. Ut non mi tortor. Vestibulum eleifend
                                    varius ullamcorper. Aliquam erat volutpat. Donec diam massa, porta vel dictum sit amet, iaculis ac massa. Sed elementum dui commodo lectus sollicitudin in auctor mauris venenatis. </p>
                            </section>
                            <h2>Motivo De La Consulta</h2>
                            <section>
                                <p> Quisque at sem turpis, id sagittis diam. Suspendisse malesuada eros posuere mauris vehicula vulputate. Aliquam sed sem tortor. Quisque sed felis ut mauris feugiat iaculis nec ac lectus. Sed consequat vestibulum
                                    purus, imperdiet varius est pellentesque vitae. Suspendisse consequat cursus eros, vitae tempus enim euismod non. Nullam ut commodo tortor. </p>
                            </section>
                            <h2>Elegir Fecha</h2>
                            <section>
                                <p> Quisque at sem turpis, id sagittis diam. Suspendisse malesuada eros posuere mauris vehicula vulputate. Aliquam sed sem tortor. Quisque sed felis ut mauris feugiat iaculis nec ac lectus. Sed consequat vestibulum
                                    purus, imperdiet varius est pellentesque vitae. Suspendisse consequat cursus eros, vitae tempus enim euismod non. Nullam ut commodo tortor. </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
    <script src="{{ asset('assets\plugins\jquery-steps\jquery.steps.js') }}"></script>
    <script src="{{ asset('assets\plugins\dropify\js\dropify.min.js') }}"></script>
    <script src="{{ asset('assets\js\form\form-advanced.js') }}"></script>

    <script>
        $('#wizard_horizontal').steps({
            headerTag: 'h2',
            bodyTag: 'section',
            transitionEffect: 'slideLeft',
            onInit: function(event, currentIndex) {
                setButtonWavesEffect(event);
                search();
            },
            onStepChanged: function(event, currentIndex, priorIndex) {
                setButtonWavesEffect(event);
            }
        });

        function setButtonWavesEffect(event) {
            $(event.currentTarget).find('[role="menu"] li a').removeClass('');
            $(event.currentTarget).find('[role="menu"] li:not(.disabled) a').addClass('');
        }

        function search(){
            $("#search").click(function () {
                var type_dni    =   $("type_dni").val();
                var dni         =   $("dni").val();
                console.log('type_dni', type_dni);
                console.log('dni', dni);

            });
        }

    </script>
@endsection