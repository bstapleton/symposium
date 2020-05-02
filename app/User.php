<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nickname', 'email', 'password', 'bio', 'topic_count', 'post_count', 'role_id', 'rank_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function topics()
    {
        return $this->hasMany('App\Post', 'author_id', 'id')->where('topic_id', '=', null);
    }

    public function replies()
    {
        return $this->hasMany('App\Post', 'author_id', 'id')->where('topic_id', '!=', null);
    }

    public function role()
    {
        return $this->belongsTo('App\Role', 'id', 'role_id');
    }
}
