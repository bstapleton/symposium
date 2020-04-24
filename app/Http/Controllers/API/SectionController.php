<?php

namespace App\Http\Controllers\API;

use App\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Cocur\Slugify\Slugify;
use phpDocumentor\Reflection\Types\Integer;

/**
 * Class SectionController
 * @package App\Http\Controllers
 */
class SectionController extends BaseController
{
    /**
     * Gets all sections, and each section's 'children' through manipulation of the Collection. This makes it appear as
     * if the collection has subsections, but since a subsection IS a section, this is a work-around to avoid business
     * logic on the front-end.
     * @see Collection
     *
     * @return string JSON array with nested subsections.
     */
    public function index()
    {
        $sectionList = Section::where('parent_section_id', null)->get();
        $sectionHierarchy = new Collection();

        foreach ($sectionList as $section)
        {
            $section->children = $section->subsections();

            if ($section->parent_id == null)
            {
                $sectionHierarchy->push($section);
            }
        }

        return $sectionHierarchy->toJson();
    }

    /**
     * Gets one section by a unique identifier.
     *
     * @param $uniqueIdentifier Section identifier, either id or slug.
     * @return mixed JSON object
     */
    public function get($uniqueIdentifier)
    {
        if (ctype_digit(strval($uniqueIdentifier))) {
            return Section::where('id', $uniqueIdentifier)->first()->toJson();
        } else {
            return Section::where('slug', $uniqueIdentifier)->first()->toJson();
        }
    }

    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required',
        ]);

        $slugify = new Slugify();

        $section = Section::create([
            'title' => $validatedData['title'],
            'slug' => $slugify->slugify($validatedData['title']),
            'description' => $request['description'],
            'parent_section_id' => intval($request['parent_section_id']),
            'icon_url' => $request['icon_url'] !== '' ? '/images/icons/' . $request['icon_url'] . '.svg' : null,
        ]);

        return response()->json($section->slug);
    }

    /**
     * Gets all children (subsections) of a section by id.
     *
     * @param $id Section identifier.
     * @return mixed
     */
    public function subsections($id)
    {
        $section = Section::where('id', $id)->first();

        return $section ? $section->subsections()->toJson() : null;
    }

    /**
     * Gets parent section of a child (subsection) by id.
     *
     * @param $id Section identifier.
     * @return mixed
     */
    public function parent($id)
    {
        $section = Section::where('id', $id)->first();

        return $section->parent()->toJson();
    }

    /**
     * Gets all topics belonging to a given section by id.
     *
     * @param $id Section identifier.
     * @return mixed
     */
    public function getTopics($id)
    {
        $section = Section::where('id', $id)->first();

        return $section->topics()->toJson();
    }
}
