<?php

namespace App;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Topic
 * @package App
 */
class Topic extends Model
{
    /**
     * @var string[] Data that can be filled.
     */
    protected $fillable = ['section_id', 'title', 'content', 'author_id'];

    /**
     * A Topic belongs to one Section.
     *
     * @return Collection
     */
    public function section()
    {
        return $this->belongsTo('App\Section')->get();
    }

    /**
     * A Topic has many Posts
     *
     * @return Collection
     */
    public function posts()
    {
        return $this->hasMany('App\Post', 'topic_id', 'id')->get();
    }

    /**
     * A Topic belongs to one User.
     *
     * @return Model|BelongsTo|object|null
     */
    public function author()
    {
        return $this->belongsTo('App\User')->first();
    }
}
