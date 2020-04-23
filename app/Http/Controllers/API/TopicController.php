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
        $topic = Topic::find($id);

        if ($topic->is_hidden || !$topic->is_published) {
            $modifiedTopic = new Topic([
                'is_hidden' => $topic->is_hidden,
                'is_published' => $topic->is_published,
                'title' => $topic->title,
                'section_id' => $topic->section_id
            ]);
            $modifiedTopic->id = $id;

            return $modifiedTopic->toJson();
        } else {
            return Topic::find($id)->toJson();
        }
    }

    /**
     * Soft deletes a topic, hiding it from the front-end and API responses.
     *
     * @param $id Topic identifier.
     * @return JsonResponse
     */
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
            if ($post->is_hidden || !$post->is_published) {
                $modifiedPost = new Post([
                    'is_hidden' => $post->is_hidden,
                    'is_published' => $post->is_published
                ]);
                $modifiedPost->id = $post->id;
                $this->getPostChildren($modifiedPost);
                $postHierarchy->push($modifiedPost);
            } else {
                $this->getPostChildren($post);
                $postHierarchy->push($post);
            }
        }

        return $postHierarchy->toJson();
    }

    /**
     * Takes a post and returns its replies in one of two ways:
     * 1. the child has been 'deleted' so only show basic info.
     * 2. the child is published and not 'deleted' so show full details.
     *
     * @param Post $post
     * @return Post
     */
    private function getPostChildren(Post $post)
    {
        $children = $post->replies();
        $childrenCollection = new Collection();

        foreach ($children as $child)
        {
            if ($child->is_hidden || !$child->is_published) {
                $modifiedChild = new Post([
                    'is_hidden' => $child->is_hidden,
                    'is_published' => $child->is_published
                ]);
                $modifiedChild->id = $child->id;
                $childrenCollection->push($modifiedChild);
            } else {
                $childrenCollection->push($child);
            }
        }

        $post->children = $childrenCollection;

        return $post;
    }
}
