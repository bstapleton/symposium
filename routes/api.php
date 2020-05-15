<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', 'API\UserController@register');
Route::post('login', 'API\UserController@authenticate');

Route::group(['middleware' => ['jwt.verify']], function () {
    Route::get('user', 'API\UserController@getAuthenticatedUser');
});

Route::prefix('sections')->group(function() {
    Route::get('/', 'API\SectionController@index');
    Route::post('/', 'API\SectionController@create')->middleware(['auth:api', 'scope:create-sections']); // TODO - remember to disallow only-int titles or we gonna hurt later
    Route::get('{uniqueIdentifier}', 'API\SectionController@get');
    Route::put('{id}', 'API\SectionController@update')->middleware(['auth:api', 'scope:edit-sections']); // TODO
    Route::delete('{id}', 'API\SectionController@delete')->middleware(['auth:api', 'scope:delete-sections']); // TODO - also consider how to handle cascading
    Route::get('{id}/topics', 'API\SectionController@getTopics');
    Route::get('{id}/subsections', 'API\SectionController@subsections');
    Route::get('{id}/parent', 'API\SectionController@parent');
});

Route::prefix('topics')->group(function() {
    Route::get('/', 'API\TopicController@index');
    Route::post('/', 'API\TopicController@create')->middleware(['auth:api', 'scope:create']);
    Route::get('{id}', 'API\TopicController@get');
    Route::put('{id}', 'API\TopicController@update')->middleware(['auth:api', 'scope:edit']); // TODO
    Route::put('{id}/delete', 'API\TopicController@destroy')->middleware(['auth:api', 'scope:delete']);
    Route::get('{id}/posts', 'API\TopicController@getPosts');
    Route::get('{id}/section', 'API\TopicController@section');
});

Route::prefix('posts')->group(function() {
    Route::get('/', 'API\PostController@index');
    Route::post('/', 'API\PostController@create')->middleware(['auth:api', 'scope:create']);
    Route::get('{id}', 'API\PostController@get');
    Route::put('{id}', 'API\PostController@update')->middleware(['auth:api', 'scope:edit']); // TODO
    Route::put('{id}/delete', 'API\PostController@destroy')->middleware(['auth:api', 'scope:delete']);
    Route::put('{id}', 'API\PostController@unpublish')->middleware(['auth:api', 'scope:delete']); // TODO
    Route::get('{id}/replies', 'API\PostController@getReplies');
});

// TODO - group endpoints for non-auth/auth/admin!
