<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobCollection;
use App\Http\Resources\JobResource;
use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $jobs = Job::latest();
        $limit = $request->input('limit') ?? 100;
        $keyword = $request->input('keyword');
        if ($keyword) {
            $jobs = $jobs->where('title', 'like', "%$keyword%")
                ->orWhere('description', 'like', "%$keyword%")
                ->orWhere('industry', 'like', "%$keyword%");
        }
        $jobs = $jobs->paginate($limit);

        return new JobCollection($jobs);
    }

    public function show(Job $job)
    {
        return new JobResource($job);
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
        if (!auth()->user()->jobApplications->contains($job)) {
            auth()->user()->jobApplications()->attach($job);
        }

        return response()->json(auth()->user()->jobApplications()->get(), 200);
    }
}
