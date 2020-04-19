<?php

namespace App\Http\Controllers\API;

use App\Topic;
use App\Post;

/**
 * Class TopicController
 * @package App\Http\Controllers
 */
class TopicController extends BaseController
{
    /**
     * Gets all topics.
     *
     * @return string JSON array.
     */
    public function index()
    {
        return Topic::all()->toJson();
    }

    /**
     * Gets one topic by id.
     *
     * @param $id Topic identifier.
     * @return mixed JSON object.
     */
    public function get($id)
    {
        return Topic::where('id', $id)->first()->toJson();
    }

    /**
     * Gets all posts on a topic by topic_id.
     * If you want a full list of all messages associated with a topic, this is the route to use.
     * If you want a set of replies to a specific post, use @see PostController::getReplies().
     *
     * @param $id Topic identifier.
     * @return mixed JSON array.
     */
    public function getPosts($id)
    {
        return Post::where('topic_id', $id)->get()->toJson();
    }
}
