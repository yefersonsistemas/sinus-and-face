<!doctype html>
<html lang="en">

@include('dashboard.layouts.header')

<body class="font-opensans">
    <!-- Page Loader -->
    <div class="page-loader-wrapper">
        <div class="loader">
        </div>
    </div>
    @include('dashboard.layouts.left-sidebar');
    @include('dashboard.layouts.navbar');

    <div id="main_content">
        <div class="page">

            @include('dashboard.layouts.page')

            @yield('content')

            @include('sweetalert::alert')

            @include('dashboard.layouts.footer')

        </div>
    </div>


<script src={{ asset("assets\bundles\lib.vendor.bundle.js") }}></script>
<script src={{ asset("assets\bundles\counterup.bundle.js") }}></script>
<script src={{ asset("assets\bundles\apexcharts.bundle.js") }}></script>
<script src={{ asset("assets\bundles\jvectormap2.bundle.js") }}></script>
<script src={{ asset("vendor\sweetalert\sweetalert.all.js") }}></script>
<script src={{ asset("assets\js\core.js") }}></script>
<script src={{ asset("assets\js\page\index.js") }}></script>
<script src="{{ asset('assets\plugins\bootstrap-datepicker\js\bootstrap-datepicker.min.js') }}"></script>

<script>
    $('.datepicker-reception').datepicker({
        todayHighlight: true
    });
</script>

@yield('scripts')
</body>
</html>
