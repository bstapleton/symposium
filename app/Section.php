<?php

namespace App;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    /**
     * A Section has many Topics.
     *
     * @return Collection
     */
    public function topics()
    {
        return $this->hasMany('App\Topic', 'section_id', 'id')
            ->where([['is_hidden', false], ['is_published', true]])
            ->get();
    }

    /**
     * A Section has many Sections.
     * This is the case in larger message boards/forums where there may be a need to further compartmentalise groupings
     * into sub-sections/sub-groups. This allows for nesting.
     *
     * @return Collection
     */
    public function subsections()
    {
        return $this->hasMany('App\Section', 'parent_section_id', 'id')->get();
    }

    /**
     * A Section has one Section.
     * This is for sub-sections to reference the parent section within the hierarchy.
     *
     * @return Collection
     */
    public function parent()
    {
        return $this->hasOne('App\Section', 'id', 'parent_section_id')->get();
    }
}
