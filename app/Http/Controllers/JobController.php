<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $jobs = Job::latest();
        $keyword = $request->input('keyword');
        if ($keyword) {
            $jobs = $jobs->where('title', 'like', "%$keyword%")
                ->orWhere('description', 'like', "%$keyword%")
                ->orWhere('industry', 'like', "%$keyword%");
        }

        return Inertia::render('Jobs/Index', [
            'jobs' => $jobs->get(),
            'applications' => auth()->user()->jobApplications()->latest()->get(),
            'keyword' => $keyword,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'industry' => 'required|string|max:255',
            'available_slots' => 'required|numeric|min:1',
        ]);
        Job::create($validated);
        return redirect(route('jobs.catalog'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Job $job): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'industry' => 'required|string|max:255',
            'available_slots' => 'required|numeric|min:1',
        ]);
        $job->update($validated);
        return redirect(route('jobs.catalog'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job $job): RedirectResponse
    {
        $job->delete();
        return redirect(route('jobs.catalog'));
    }

    /**
     * User apply to the specified job resource from storage.
     */
    public function apply(Job $job): RedirectResponse
    {
        auth()->user()->jobApplications()->attach($job);
        return redirect(route('jobs.index'));
    }

    /**
     * Display a listing of the resource.
     */
    public function catalog(): Response
    {
        return Inertia::render('Jobs/Catalog', [
            'jobs' => Job::latest()->get(),
        ]);
    }
}
