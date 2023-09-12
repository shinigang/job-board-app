<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index(Request $request)
    {
        return Job::all();
    }

    public function show(Job $job)
    {
        return $job;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'industry' => 'required|string|max:255',
            'available_slots' => 'required|numeric|min:1',
        ]);
        $job = Job::create($validated);

        return response()->json($job, 201);
    }

    public function update(Request $request, Job $job)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'industry' => 'required|string|max:255',
            'available_slots' => 'required|numeric|min:1',
        ]);
        $job->update($validated);

        return response()->json($job, 200);
    }

    public function destroy(Job $job)
    {
        $job->delete();

        return response()->json(null, 204);
    }

    public function apply(Job $job)
    {
        auth()->user()->jobApplications()->attach($job);

        return response()->json(auth()->user()->jobApplications()->get(), 200);
    }
}
