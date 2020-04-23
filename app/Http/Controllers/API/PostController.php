<?php

namespace App\Http\Controllers\API;

use App\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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
     * Create a post.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'topic_id' => 'required',
            'content' => 'required',
        ]);

        $topic = Post::create([
            'topic_id' => $validatedData['topic_id'],
            'content' => $validatedData['content'],
            'author_id' => 1, // TODO assign actual author
        ]);

        return response()->json();
    }

    /**
     * Soft deletes a post by hiding it from the front-end and API responses.
     *
     * @param $id Post identifier.
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $post = Post::find($id);
        $post->is_hidden = true;
        $post->is_published = false;
        $post->hidden_at = now();
        $post->save();

        return response()->json('Post deleted!');
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
