<?php

namespace App\Http\Controllers\API;

use App\Section;
use App\Topic;
use Illuminate\Support\Collection;

/**
 * Class SectionController
 * @package App\Http\Controllers
 */
class SectionController extends BaseController
{
    /**
     * Gets all sections.
     *
     * @return string JSON array with nested subsections.
     */
    public function index()
    {
        $sectionList = Section::all();
        $sectionHierarchy = new Collection();

        foreach($sectionList as $section) {
            $section->children = $section->subsections();

            if ($section->parent_id == null) {
                $sectionHierarchy->push($section);
            }
        }

        return $sectionHierarchy->toJson();
    }

    /**
     * Gets one section by id.
     *
     * @param $id Section identifier.
     * @return mixed JSON object
     */
    public function get($id)
    {
        return Section::where('id', $id)->first()->toJson();
    }

    /**
     * Gets all topics associated to a section_id.
     *
     * @param $id Section identifier.
     * @return mixed JSON array.
     */
    public function getTopics($id)
    {
        return Topic::where('section_id', $id)->get()->toJson();
    }
}
