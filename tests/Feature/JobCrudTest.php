<?php

use App\Models\Job;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

test('user can get list of jobs', function () {
    $job = Job::factory()->create();

    $response = $this->get('/api/jobs')
        ->assertStatus(200)
        ->assertJson([
            'data' => [
                [
                    'id' => $job->id,
                    'title' => $job->title,
                    'description' => $job->description,
                    'industry' => $job->industry,
                    'available_slots' => $job->available_slots,
                ],
            ],
        ]);
});

test('user can get a job', function () {
    $job = Job::factory()->create();

    $this->getJson("/api/jobs/{$job->id}")
        ->assertStatus(200)
        ->assertJson([
            'data' => [
                'id' => $job->id,
                'title' => $job->title,
                'description' => $job->description,
                'industry' => $job->industry,
                'available_slots' => $job->available_slots,
            ],
        ]);
});

test('guest user cannot create a new job', function () {
    $data = Job::factory()->raw();

    $this->postJson("/api/jobs", $data)
        ->assertStatus(401);

    $this->assertDatabaseCount('jobs', 0);
});

test('authenticated user can create a new job', function () {
    $user = User::factory()->create();
    Sanctum::actingAs($user);

    $data = Job::factory()->raw();

    $this->postJson("/api/jobs", $data)
        ->assertStatus(201);

    $this->assertDatabaseCount('jobs', 1);
    $this->assertDatabaseHas('jobs', $data);
});

test('guest user cannot update a job', function () {
    $job = Job::factory()->create();

    $data = Job::factory()->raw();

    $this->putJson("/api/jobs/{$job->id}", $data)
        ->assertStatus(401);

    // assert the result should be the same
    $this->assertDatabaseHas('jobs', [
        'id' => $job->id,
        'title' => $job->title,
        'description' => $job->description,
        'industry' => $job->industry,
        'available_slots' => $job->available_slots,
    ]);
});

test('authenticated user can update a job', function () {
    $user = User::factory()->create();
    Sanctum::actingAs($user);

    $job = Job::factory()->create();

    $data = Job::factory()->raw();

    $this->putJson("/api/jobs/{$job->id}", $data)
        ->assertStatus(200);

    // assert the result
    $this->assertDatabaseHas('jobs', [
        'id' => $job->id,
        'title' => $data['title'],
        'description' => $data['description'],
        'industry' => $data['industry'],
        'available_slots' => $data['available_slots'],
    ]);
});

test('guest user cannot delete a job', function () {
    $job = Job::factory()->create();

    $this->deleteJson("/api/jobs/{$job->id}")
        ->assertStatus(401);

    // assert the result, job should still exist!
    $this->assertDatabaseCount('jobs', 1);
});

test('authenticated user can delete a job', function () {
    $user = User::factory()->create();
    Sanctum::actingAs($user);

    $job = Job::factory()->create();

    $this->deleteJson("/api/jobs/{$job->id}")
        ->assertStatus(204);

    // assert the result
    $this->assertDatabaseCount('jobs', 0);
});

test('guest user cannot apply for a job', function () {
    $job = Job::factory()->create();

    $this->postJson("/api/jobs/{$job->id}/apply")
        ->assertStatus(401);

    // assert the result, job applicants should still be zero.
    $this->assertDatabaseCount('job_applicants', 0);
});

test('authenticated user can apply for a job', function () {
    $user = User::factory()->create();
    Sanctum::actingAs($user);

    $job = Job::factory()->create();

    $this->postJson("/api/jobs/{$job->id}/apply")
        ->assertStatus(200);

    // assert the result
    $this->assertDatabaseCount('job_applicants', 1);
});
