<?php

use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\JobController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::resource('jobs', JobController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::post('/jobs/{job}/apply', [JobController::class, 'apply'])->name('jobs.apply');
    Route::get('/catalog', [JobController::class, 'catalog'])->name('jobs.catalog');
    Route::get('/applications', [ApplicantController::class, 'applications'])->name('job.applications');
});
