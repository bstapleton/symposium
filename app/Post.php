<?php

namespace App;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * Class Post
 * @package App
 */
class Post extends Model
{
    /**
     * @var string[] Data that can be filled.
     */
    protected $fillable = ['topic_id', 'content', 'author_id', 'is_reported', 'is_hidden'];

    /**
     * A Post has many replies.
     *
     * @return Collection
     */
    public function replies()
    {
        return $this->hasMany('App\Post', 'parent_post_id', 'id')->get();
    }

    /**
     * A Post has one Topic.
     *
     * @return Model|HasOne|object|null
     */
    public function topic()
    {
        return $this->hasOne('App\Topic', 'id', 'topic_id')->first();
    }

    /**
     * A Post has one Parent.
     * This is used in the instance of replies, that need to be directly associated with another post on the same topic.
     *
     * @return Model|HasOne|object|null
     */
    public function parent()
    {
        return $this->hasOne('App\Post', 'id', 'parent_id')->first();
    }

    /**
     * A Post has one User.
     *
     * @return Model|BelongsTo|object|null
     */
    public function author()
    {
        return $this->belongsTo('App\User')->first();
    }
}
