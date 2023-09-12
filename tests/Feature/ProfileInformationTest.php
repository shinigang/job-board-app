<?php

use App\Models\User;

test('profile information can be updated', function () {
    $this->actingAs($user = User::factory()->create());

    $response = $this->put('/user/profile-information', [
        'name' => 'Test Name',
        'username' => 'TestName',
        'email' => 'test@example.com',
    ]);

    expect($user->fresh())
        ->name->toEqual('Test Name')
        ->username->toEqual('TestName')
        ->email->toEqual('test@example.com');
});
