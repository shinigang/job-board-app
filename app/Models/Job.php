<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'industry', 'available_slots',
    ];

    public function applicants(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'job_applicants', 'job_id', 'user_id')->withTimestamps();
    }
}
