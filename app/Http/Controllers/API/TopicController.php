<?php

namespace App\Http\Controllers\API;

use App\Topic;
use App\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

/**
 * Class TopicController
 * @package App\Http\Controllers
 */
class TopicController extends BaseController
{
    /**
     * Gets all topics.
     *
     * @param null $sectionId if provided gets all topics associated to the given section.
     * @return string JSON array.
     */
    public function index($sectionId = null)
    {
        return $sectionId ? Topic::where('section_id', $sectionId)->toJson() : Topic::all()->toJson();
    }

    /**
     * Create a topic.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'section_id' => 'required',
            'title' => 'required',
            'content' => 'required',
        ]);

        $topic = Topic::create([
            'section_id' => $validatedData['section_id'],
            'title' => $validatedData['title'],
            'content' => $validatedData['content'],
            'author_id' => 1, // TODO assign actual author
        ]);

        return response()->json($topic->id);
    }

    /**
     * Gets one topic by id.
     *
     * @param $id Topic identifier.
     * @return mixed JSON object.
     */
    public function get($id)
    {
        return Topic::find($id)->toJson();
    }

    public function destroy($id)
    {
        $topic = Topic::find($id);
        $topic->is_hidden = true;
        $topic->is_published = false;
        $topic->hidden_at = now();
        $topic->save();

        return response()->json('Topic deleted!');
    }

    /**
     * Gets the section to which the topic belongs.
     *
     * @param $id Topic identifier.
     * @return mixed
     */
    public function section($id)
    {
        $topic = Topic::where('id', $id)->first();

        return $topic ? $topic->section()->toJson() : null;
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
        $posts = Post::where([['topic_id', $id], ['parent_post_id', null]])->get();

        $postHierarchy = new Collection();

        foreach ($posts as $post)
        {
            $post->children = $post->replies();

            if ($post->parent_post_id == null)
            {
                $postHierarchy->push($post);
            }
        }

        return $postHierarchy->toJson();
    }
}
