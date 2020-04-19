<?php

namespace App\Http\Controllers\API;

use App\Post;

/**
 * Class PostController
 * @package App\Http\Controllers
 */
class PostController extends BaseController
{
    /**
     * Gets all posts.
     *
     * @return string JSON array.
     */
    public function index()
    {
        return Post::all()->toJson();
    }

    /**
     * Gets one post by id.
     *
     * @param $id Post identifier.
     * @return mixed JSON object.
     */
    public function get($id)
    {
        return Post::where('id', $id)->first()->toJson();
    }

    /**
     * Gets all replies to a specific post.
     * If you only want a list of all children to a specific post use this route.
     * If you want a list of all messages on a topic use @see TopicController::getPosts().
     *
     * @param $id Post identifier.
     * @return mixed JSON array.
     */
    public function getReplies($id)
    {
        return Post::where('parent_id', $id)->get()->toJson();
    }
}
