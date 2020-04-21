<?php

namespace App\Http\Controllers\API;

use App\Section;
use Illuminate\Support\Collection;

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
