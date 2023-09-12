<?php

use App\Http\Controllers\Api\JobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
 */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('jobs', [JobController::class, 'index'])->name('api.jobs.index');

Route::get('jobs/{job}', [JobController::class, 'show'])->name('api.jobs.show');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('jobs', [JobController::class, 'store'])->name('api.jobs.store');
    Route::match(['put', 'patch'], 'jobs/{job}', [JobController::class, 'update'])->name('api.jobs.update');
    Route::delete('jobs/{job}', [JobController::class, 'destroy'])->name('api.jobs.destroy');
    Route::post('jobs/{job}/apply', [JobController::class, 'apply'])->name('api.jobs.apply');
});
