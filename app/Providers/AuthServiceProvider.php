<?php

namespace App\Providers;

use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
         'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();
        Passport::tokensCan([
            'create' => 'can create new topics and posts',
            'edit' => 'can edit topics and posts they created',
            'delete' => 'Delete topics and posts',
            'create-sections' => 'can create new sections',
            'edit-sections' => 'can edit existing sections',
            'delete-sections' => 'can delete sections',
        ]);
        Passport::routes();
    }
}
