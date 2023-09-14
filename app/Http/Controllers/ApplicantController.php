<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class ApplicantController extends Controller
{
    /**
     * Display a job applications listing of the resource.
     */
    public function applications(): Response
    {
        return Inertia::render('JobApplications/Index', [
            'applications' => auth()->user()->jobApplications()->latest()->paginate(10),
        ]);
    }
}
